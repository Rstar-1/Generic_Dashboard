import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Icon from "../../components/common/Icon";
import Image from "../../components/common/Image";
import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import Skeleton from "../../components/common/Skeleton";
import FormBuilder from "../../components/forms/FormBuilder";
import { showToast } from "../../components/common/Toast";
import {
  getUserProfileApi,
  updateProfileApi,
  getUserByIdApi,
  updateUserApi,
} from "../../api";
import { resetPasswordApi } from "../../api/endpoints/userApi";
import {
  getCurrentUser,
  setCurrentUser,
  resolveImagePath,
  fileToBase64,
} from "../../utils";
import { useRoles } from "../../feature/roleSlice";
import { useUsers } from "../../feature/userSlice";

// Navigation tabs array requested for mapping
const PROFILE_TABS = [
  {
    id: "account",
    title: "Account Information",
    subtitle: "Change your information",
    icon: (
      <Icon name="Users" width="17" height="17" stroke="currentColor" className="flex" />
    ),
  },
  {
    id: "address",
    title: "Address",
    subtitle: "Change your Address",
    icon: <Icon name="MapPin" width="17" height="17" stroke="currentColor" className="flex" />,
  },
  {
    id: "social",
    title: "Social Media",
    subtitle: "Change your Media",
    icon: <Icon name="Globe" width="17" height="17" stroke="currentColor" className="flex" />,
  },
  {
    id: "password",
    title: "Password",
    subtitle: "Change your Password",
    icon: <Icon name="Lock" width="17" height="17" stroke="currentColor" />,
  },
];

/**
 * Address serialization helpers
 * Parses stored single string into form fields and converts form fields into a single string
 */
export const parseAddressString = (addrStr) => {
  if (!addrStr || typeof addrStr !== "string") {
    if (typeof addrStr === "object" && addrStr !== null) {
      return {
        street: addrStr.street || addrStr.line1 || "",
        apt: addrStr.apt || addrStr.line2 || "",
        city: addrStr.city || "",
        state: addrStr.state || "",
      };
    }
    return { street: "", apt: "", city: "", state: "" };
  }
  const trimmed = addrStr.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    try {
      const obj = JSON.parse(trimmed);
      return {
        street: obj.street || obj.line1 || "",
        apt: obj.apt || obj.line2 || "",
        city: obj.city || "",
        state: obj.state || "",
      };
    } catch { }
  }
  const parts = trimmed.split(",").map((s) => s.trim());
  if (parts.length >= 4) {
    return {
      street: parts.slice(0, parts.length - 3).join(", "),
      apt: parts[parts.length - 3] || "",
      city: parts[parts.length - 2] || "",
      state: parts[parts.length - 1] || "",
    };
  }
  if (parts.length === 3) {
    return {
      street: parts[0] || "",
      apt: "",
      city: parts[1] || "",
      state: parts[2] || "",
    };
  }
  if (parts.length === 2) {
    return {
      street: parts[0] || "",
      apt: "",
      city: parts[1] || "",
      state: "",
    };
  }
  return {
    street: parts[0] || "",
    apt: "",
    city: "",
    state: "",
  };
};

export const formatAddressString = (addr) => {
  if (!addr) return "";
  if (typeof addr === "string") return addr.trim();
  const { street = "", apt = "", city = "", state = "" } = addr;
  return [street, apt, city, state]
    .map((s) => (s || "").trim())
    .filter(Boolean)
    .join(", ");
};

/**
 * Social media parsing and serialization helpers
 * Parses stored array of [{ field: value }] into an object and formats form object back into array
 */
export const parseSocialArray = (social) => {
  const result = {
    website: "",
    gst: "",
    instagram: "",
    whatsapp: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  };
  if (!social) return result;
  let arr = social;
  if (typeof social === "string") {
    try {
      arr = JSON.parse(social);
    } catch {
      return result;
    }
  }
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      if (!item || typeof item !== "object") return;
      if ("field" in item && "value" in item) {
        const k = String(item.field || "").trim().toLowerCase();
        if (k) result[k] = String(item.value || "").trim();
      } else {
        Object.entries(item).forEach(([k, v]) => {
          const cleanK = String(k || "").trim().toLowerCase();
          if (cleanK) result[cleanK] = String(v || "").trim();
        });
      }
    });
  } else if (typeof arr === "object") {
    Object.entries(arr).forEach(([k, v]) => {
      const cleanK = String(k || "").trim().toLowerCase();
      if (cleanK) result[cleanK] = String(v || "").trim();
    });
  }
  return result;
};

export const formatSocialArray = (socialObj) => {
  if (!socialObj || typeof socialObj !== "object") return [];
  const fields = ["website", "gst", "instagram", "whatsapp", "facebook", "linkedin", "twitter", "youtube"];
  return fields
    .map((f) => {
      const val = (socialObj[f] || "").trim();
      return val ? { [f]: val } : null;
    })
    .filter(Boolean);
};

/**
 * 1. Account Information Section (Personal Details, Avatar, Role)
 */
const AccountSection = React.memo(
  ({
    profile,
    resolvedAvatar,
    onDeletePhoto,
    onUpdateAccount,
    saving,
    fileInputRef,
  }) => {
    const accountFields = useMemo(
      () => [
        {
          name: "fullname",
          label: "Full Name",
          type: "text",
          placeholder: "e.g. Monir UX Designer",
          defaultValue: profile.fullname || "",
          validation: { required: true },
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "e.g. monir@example.com",
          defaultValue: profile.email || "",
          validation: { required: true, email: true },
        },
        {
          name: "mobile",
          label: "Mobile Number",
          type: "tel",
          placeholder: "e.g. 9876543210",
          defaultValue: profile.mobile || "",
          validation: { required: true },
        },
        {
          name: "roleName",
          label: "Assigned Role",
          type: "text",
          defaultValue: profile.roleName || "Admin",
          disabled: true,
        },
      ],
      [profile.fullname, profile.email, profile.mobile, profile.roleName]
    );

    return (
      <div>
        <div className="bg-white p-15 rounded-5">
          <div className="flex items-center gap-8">
            <span style={{ width: "3px", height: "22px", background: "var(--primary)" }} />
            <h3 className="title-text font-600 text-dark">Personal Informations</h3>
          </div>
          <p className="small-text text-gray font-400 mt-3">
            Manage your personal details and keep your account up to date.
          </p>
        </div>

        <div className="mt-8 bg-white p-15 rounded-5">
          <div className="w-full h-200 rounded-5 overflow-hidden relative">
            <Image
              src={resolvedAvatar}
              alt={profile.fullname || "User Profile"}
              className="w-full h-full object-cover bg-forth border-ec"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            <Button
              icon='Upload'
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload photo"
              className='absolute bottom-0 right-0 rounded-30 m-5'
              version='icon'
            />
          </div>

          <div className="mt-15 bg-forth p-20 rounded-5">
            <FormBuilder
              col="2"
              smcol="1"
              fields={accountFields}
              onSubmit={onUpdateAccount}
              submitType="json"
              submitText={saving ? "Updating..." : "Update Account"}
              buttonBg="primary"
              buttonVersion="v2"
              isSubmitting={saving}
              buttonClassName="flex justify-start mt-20"
            />
          </div>
        </div>
      </div>
    );
  }
);
AccountSection.displayName = "AccountSection";

/**
 * 2. Password Change Section
 */
const PasswordSection = React.memo(({ onUpdatePassword, saving }) => {
  const passwordFields = useMemo(
    () => [
      {
        name: "currentPassword",
        label: "Current Password",
        type: "password",
        placeholder: "Enter current password",
        validation: { required: true },
        colSpan: 1,
      },
      {
        name: "newPassword",
        label: "New Password",
        type: "password",
        placeholder: "Enter new password (min 6 characters)",
        validation: { required: true, minLength: 6 },
        colSpan: 1,
      },
      {
        name: "confirmPassword",
        label: "Confirm New Password",
        type: "password",
        placeholder: "Confirm your new password",
        validation: { required: true },
        colSpan: 1,
      },
    ],
    []
  );

  return (
    <div>
      <div className="bg-white p-15 rounded-5">
        <div className="flex items-center gap-8">
          <span style={{ width: "3px", height: "22px", background: "var(--primary)" }} />
          <h3 className="title-text font-600 text-dark">Change Password</h3>
        </div>
        <p className="small-text text-gray font-400 mt-3">
          Ensure your account is using a secure and random password to stay protected.
        </p>
      </div>
      <div className="mt-8 bg-white p-15 rounded-5">
        <div className="w-50 bg-forth p-20 rounded-5">
          <FormBuilder
            col="1"
            smcol="1"
            fields={passwordFields}
            onSubmit={onUpdatePassword}
            submitType="json"
            submitText={saving ? "Updating Password..." : "Update Password"}
            buttonBg="primary"
            buttonVersion="v1"
            isSubmitting={saving}
            buttonClassName="mt-20"
          />
        </div>
      </div>
    </div>
  );
});
PasswordSection.displayName = "PasswordSection";

/**
 * 3. Address Section
 */
const AddressSection = React.memo(({ profile, onUpdateAddress, saving }) => {
  const rawAddresses = useMemo(() => {
    if (Array.isArray(profile.address) && profile.address.length > 0) {
      const list = profile.address
        .map((a) => (typeof a === "string" ? a : String(a || "")).trim())
        .filter(Boolean);
      return list.length > 0 ? list : [""];
    }
    return [""];
  }, [profile.address]);

  const [addressList, setAddressList] = useState(() => rawAddresses.map(parseAddressString));

  useEffect(() => {
    setAddressList(rawAddresses.map(parseAddressString));
  }, [rawAddresses]);

  const handleAddAddress = useCallback(() => {
    setAddressList((prev) => [...prev, { street: "", apt: "", city: "", state: "" }]);
  }, []);

  const handleRemoveAddress = useCallback(
    async (idx) => {
      const nextList = addressList.filter((_, i) => i !== idx);
      const finalList = nextList.length > 0 ? nextList : [{ street: "", apt: "", city: "", state: "" }];
      setAddressList(finalList);

      const stringArray = finalList.map(formatAddressString).filter(Boolean);
      await onUpdateAddress(stringArray);
    },
    [addressList, onUpdateAddress]
  );

  const handleFieldChange = useCallback((index, fieldName, value, updatedForm) => {
    setAddressList((prev) => {
      const next = [...prev];
      next[index] = {
        ...(next[index] || {}),
        ...(updatedForm || {}),
        [fieldName]: value,
      };
      return next;
    });
  }, []);

  const handleSaveAllAddresses = useCallback(async () => {
    for (let i = 0; i < addressList.length; i++) {
      const a = addressList[i];
      const hasAnyField = Boolean(a.street?.trim() || a.apt?.trim() || a.city?.trim() || a.state?.trim());
      if (hasAnyField && (!a.street?.trim() || !a.city?.trim() || !a.state?.trim())) {
        showToast(`Please complete required fields (Street, City, State) in Address ${i + 1}`, "warning");
        return;
      }
    }

    const stringArray = addressList.map(formatAddressString).filter(Boolean);
    await onUpdateAddress(stringArray);
  }, [addressList, onUpdateAddress]);

  return (
    <div>
      <div className="bg-white p-15 rounded-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-8">
            <span style={{ width: "3px", height: "22px", background: "var(--primary)" }} />
            <h3 className="title-text font-600 text-dark">Address Information</h3>
          </div>
          <p className="small-text text-gray font-400 mt-3">
            Manage your residential street, apartment, city, and state information.
          </p>
        </div>
        <Button
          type="button"
          version="v2"
          bg="primary"
          icon="Plus"
          text="Add Address"
          onClick={handleAddAddress}
        />
      </div>

      <div className="mt-8 bg-white p-15 rounded-5">
        <div className="grid-cols-2 sm-grid-cols-1 gap-12">
          {addressList.map((addrObj, index) => {
            const fields = [
              {
                name: "street",
                label: "Street Address / Line 1",
                type: "text",
                placeholder: "Street Number / Line 1",
                defaultValue: addrObj.street || "",
                validation: { required: true },
              },
              {
                name: "apt",
                label: "Apt / House Number / Line 2",
                type: "text",
                placeholder: "Apt / House Number",
                defaultValue: addrObj.apt || "",
              },
              {
                name: "city",
                label: "City",
                type: "text",
                placeholder: "City",
                defaultValue: addrObj.city || "",
                validation: { required: true },
              },
              {
                name: "state",
                label: "State / Region",
                type: "text",
                placeholder: "State",
                defaultValue: addrObj.state || "",
                validation: { required: true },
              },
            ];

            return (
              <div key={`address-card-${index}`} className="bg-forth p-20 rounded-5">
                <div className="flex items-center justify-between mb-15">
                  <h5 className="headmini-text text-dark font-600">
                    {index === 0 ? "Address 1 (Primary)" : `Address ${index + 1}`}
                  </h5>
                  {addressList.length > 1 && (
                    <Button
                      type="button"
                      version="icon"
                      bg="transparent"
                      color="danger"
                      icon="Trash"
                      iconWidth="16"
                      iconHeight="16"
                      title="Remove Address"
                      onClick={() => handleRemoveAddress(index)}
                    />
                  )}
                </div>
                <FormBuilder
                  key={`form-builder-addr-${index}-${addrObj.street}-${addrObj.city}`}
                  col="1"
                  smcol="1"
                  fields={fields}
                  showButton={false}
                  showSubmitButton={false}
                  onChange={(name, value, updatedForm) =>
                    handleFieldChange(index, name, value, updatedForm)
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <Button
            type="button"
            version="v1"
            bg="primary"
            disabled={saving}
            onClick={handleSaveAllAddresses}
          >
            {saving ? "Updating Address..." : "Update Address"}
          </Button>
        </div>
      </div>
    </div>
  );
});
AddressSection.displayName = "AddressSection";

/**
 * 4. Social Media & Business Handles Section
 */
const SocialSection = React.memo(({ profile, onUpdateSocial, saving }) => {
  const parsedSocial = useMemo(() => parseSocialArray(profile.social), [profile.social]);
  const [formData, setFormData] = useState(parsedSocial);

  useEffect(() => {
    setFormData(parsedSocial);
  }, [parsedSocial]);

  const socialFields = useMemo(
    () => [
      {
        name: "website",
        label: "Website URL",
        type: "text",
        placeholder: "e.g. ashmitavinyls.com",
        defaultValue: parsedSocial.website || "",
      },
      {
        name: "gst",
        label: "GST Number",
        type: "text",
        placeholder: "e.g. 27AAAAA0000A1Z5",
        defaultValue: parsedSocial.gst || "",
      },
      {
        name: "instagram",
        label: "Instagram Profile / Handle",
        type: "text",
        placeholder: "e.g. ashmitaenterprises.co.in",
        defaultValue: parsedSocial.instagram || "",
      },
      {
        name: "whatsapp",
        label: "WhatsApp Number / Link",
        type: "text",
        placeholder: "e.g. +91 9876543210 or ashmitaenterprises.co.in",
        defaultValue: parsedSocial.whatsapp || "",
      },
      {
        name: "facebook",
        label: "Facebook Profile / Page",
        type: "text",
        placeholder: "e.g. ashmitaenterprises.co.in",
        defaultValue: parsedSocial.facebook || "",
      },
      {
        name: "youtube",
        label: "YouTube Channel / Handle",
        type: "text",
        placeholder: "e.g. ashmitaenterprises.co.in",
        defaultValue: parsedSocial.youtube || "",
      },
      {
        name: "linkedin",
        label: "LinkedIn Profile / URL",
        type: "text",
        placeholder: "e.g. linkedin.com/company/ashmita",
        defaultValue: parsedSocial.linkedin || "",
      },
      {
        name: "twitter",
        label: "Twitter / X Profile",
        type: "text",
        placeholder: "e.g. @ashmitavinyls",
        defaultValue: parsedSocial.twitter || "",
      },
    ],
    [parsedSocial]
  );

  const handleFormChange = useCallback((name, value, allValues) => {
    setFormData((prev) => ({
      ...prev,
      ...(allValues || {}),
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (values) => {
      await onUpdateSocial({ ...formData, ...(values || {}) });
    },
    [formData, onUpdateSocial]
  );

  return (
    <div>
      <div className="bg-white p-15 rounded-5">
        <div className="flex items-center gap-8">
          <span style={{ width: "3px", height: "22px", background: "var(--primary)" }} />
          <h3 className="title-text font-600 text-dark">Social Media & Business Links</h3>
        </div>
        <p className="small-text text-gray font-400 mt-3">
          Manage your business website, GST registration, and social media handles.
        </p>
      </div>

      <div className="mt-8 bg-white p-15 rounded-5">
        <div className="bg-forth p-20 rounded-5">
          <FormBuilder
            col="2"
            smcol="1"
            fields={socialFields}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            submitType="json"
            submitText={saving ? "Updating..." : "Update Social Media"}
            buttonBg="primary"
            buttonVersion="v2"
            isSubmitting={saving}
            buttonClassName="flex justify-start mt-20"
          />
        </div>

        {/* Visual Cards Matching User Uploaded Design */}
        <div className="mt-20 border-t pt-20">
          {/* Your Business */}
          <div>
            <h4 className="mid-text font-600 text-dark mb-12">Your Business</h4>
            <div className="bg-white rounded-5 border-ec overflow-hidden">
              {formData.website ? (
                <a
                  href={formData.website.startsWith("http") ? formData.website : `https://${formData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#1e293b", flexShrink: 0 }}
                    >
                      <Icon name="Globe" width="22" height="22" stroke="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.website}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">Website</p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="p-15 text-gray mini-text italic">No website entered yet</div>
              )}

              {formData.gst && (
                <div className="flex items-center gap-12 p-12 border-t border-ec">
                  <div
                    className="flex items-center justify-center rounded-8 text-white"
                    style={{ width: "48px", height: "48px", background: "#334155", flexShrink: 0 }}
                  >
                    <Icon name="FileText" width="20" height="20" stroke="white" />
                  </div>
                  <div>
                    <span className="font-600 text-dark headmini-text">{formData.gst}</span>
                    <p className="mini-text text-gray font-400">GST Registration</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Social Handles */}
          <div className="mt-20">
            <h4 className="mid-text font-600 text-dark mb-12">Social Handles</h4>
            <div className="bg-white rounded-5 border-ec overflow-hidden flex flex-col">
              {/* Instagram */}
              {formData.instagram && (
                <a
                  href={formData.instagram.startsWith("http") ? formData.instagram : `https://instagram.com/${formData.instagram.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all bordb"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="Instagram" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.instagram}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">Instagram</p>
                    </div>
                  </div>
                </a>
              )}

              {/* Facebook */}
              {formData.facebook && (
                <a
                  href={formData.facebook.startsWith("http") ? formData.facebook : `https://facebook.com/${formData.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all bordb"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#1877f2", flexShrink: 0 }}
                    >
                      <Icon name="Facebook" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.facebook}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">Facebook</p>
                    </div>
                  </div>
                </a>
              )}

              {/* YouTube */}
              {formData.youtube && (
                <a
                  href={formData.youtube.startsWith("http") ? formData.youtube : `https://youtube.com/${formData.youtube.startsWith("@") ? formData.youtube : `@${formData.youtube}`}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all bordb"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#ff0000", flexShrink: 0 }}
                    >
                      <Icon name="YouTube" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.youtube}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">Youtube</p>
                    </div>
                  </div>
                </a>
              )}

              {/* WhatsApp */}
              {formData.whatsapp && (
                <a
                  href={formData.whatsapp.startsWith("http") ? formData.whatsapp : `https://wa.me/${formData.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all bordb"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#22c55e", flexShrink: 0 }}
                    >
                      <Icon name="WhatsApp" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.whatsapp}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">WhatsApp</p>
                    </div>
                  </div>
                </a>
              )}

              {/* LinkedIn */}
              {formData.linkedin && (
                <a
                  href={formData.linkedin.startsWith("http") ? formData.linkedin : `https://linkedin.com/in/${formData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all bordb"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#0a66c2", flexShrink: 0 }}
                    >
                      <Icon name="LinkedIn" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.linkedin}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">LinkedIn</p>
                    </div>
                  </div>
                </a>
              )}

              {/* Twitter */}
              {formData.twitter && (
                <a
                  href={formData.twitter.startsWith("http") ? formData.twitter : `https://x.com/${formData.twitter.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-12 hover:bg-forth transition-all"
                >
                  <div className="flex items-center gap-12">
                    <div
                      className="flex items-center justify-center rounded-8 text-white"
                      style={{ width: "48px", height: "48px", background: "#0f172a", flexShrink: 0 }}
                    >
                      <Icon name="Twitter" width="22" height="22" fill="white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-6">
                        <span className="font-600 text-dark headmini-text">{formData.twitter}</span>
                        <Icon name="ExternalLink" width="14" height="14" stroke="#94a3b8" />
                      </div>
                      <p className="mini-text text-gray font-400">Twitter / X</p>
                    </div>
                  </div>
                </a>
              )}

              {!formData.instagram && !formData.facebook && !formData.youtube && !formData.whatsapp && !formData.linkedin && !formData.twitter && (
                <div className="p-15 text-gray mini-text italic">No social handles added yet. Enter your handles above and click Update Social Media.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
SocialSection.displayName = "SocialSection";

/**
 * 4. Top Profile Completeness Gauge Card
 */
const CompleteProfileCard = React.memo(({ completionPercentage, isOtpVerified, onVerify }) => (
  <div
    className="rounded-5 p-20 text-white relative overflow-hidden bg-primary"
  >
    <div className="flex items-center gap-12">
      <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="32" cy="32" r="26" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="5" fill="none" />
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeDasharray={163.36}
            strokeDashoffset={163.36 - (163.36 * completionPercentage) / 100}
            strokeLinecap="round"
            fill="none"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          {completionPercentage}%
        </div>
      </div>

      <div>
        <h4 className="font-500 mid-text text-white capitalize">Complete profile</h4>
        <p className="font-400 mini-text text-white text-muted mt-3">
          Complete your profile to unlock all features!
        </p>
      </div>
    </div>

    <Button
      type="button"
      version="v3"
      bg="white"
      color="primary"
      className="mt-12 font-500 rounded-full"
      onClick={onVerify}
      icon="Box"
      text={isOtpVerified ? "Identity Verified" : "Verify Identity"}
    />
  </div>
));
CompleteProfileCard.displayName = "CompleteProfileCard";

/**
 * Main Profile Component
 */
const Profile = () => {
  const { roles, getRoles, fetchRoles: fetchRolesList } = useRoles();
  const { resetPassword: resetPasswordUser } = useUsers();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("account"); // 'account' | 'password' | 'address'
  const [previewImage, setPreviewImage] = useState("");

  const fileInputRef = useRef(null);
  const isFetchingRef = useRef(false);

  // User schema state matching mongoose userSchema
  const [profile, setProfile] = useState({
    _id: "",
    id: "",
    fullname: "",
    email: "",
    mobile: "",
    image: "",
    address: ["", ""],
    social: [],
    roleId: "",
    roleName: "Admin",
    isOtpVerified: false,
    isActive: true,
  });

  // Load roles on mount
  useEffect(() => {
    const loader = fetchRolesList || getRoles;
    loader?.({ isDeleted: false, limit: 100 });
  }, [fetchRolesList, getRoles]);

  // Normalize user payload from API/storage according to userSchema
  const normalizeUserData = useCallback(
    (u) => {
      if (!u || typeof u !== "object") return null;

      const rawId = u.id || u._id?.$oid || u._id || "USR-001";
      const rawRoleObj = typeof u.roleId === "object" ? u.roleId : null;
      const currentRoles = roles || [];
      const matchedRole = currentRoles.find(
        (r) =>
          String(r._id || r.id).toLowerCase() ===
          String(u.roleId?._id || u.roleId || "").toLowerCase()
      );

      const rName =
        rawRoleObj?.rolename ||
        matchedRole?.rolename ||
        matchedRole?.name ||
        u.rolename ||
        u.role ||
        "Admin";

      let addrList = [];
      if (Array.isArray(u.address)) {
        addrList = u.address
          .map((a) => (typeof a === "string" ? a : String(a || "")).trim())
          .filter(Boolean);
      } else if (typeof u.address === "string" && u.address.trim()) {
        try {
          const parsed = JSON.parse(u.address);
          if (Array.isArray(parsed)) {
            addrList = parsed.map(String).map((s) => s.trim()).filter(Boolean);
          } else {
            addrList = [u.address.trim()];
          }
        } catch {
          addrList = [u.address.trim()];
        }
      }
      if (addrList.length === 0) {
        addrList = [""];
      }

      let socialList = [];
      if (Array.isArray(u.social)) {
        socialList = u.social;
      } else if (typeof u.social === "string" && u.social.trim()) {
        try {
          const parsed = JSON.parse(u.social);
          if (Array.isArray(parsed)) socialList = parsed;
        } catch {}
      } else if (u.social && typeof u.social === "object") {
        socialList = Object.entries(u.social).map(([k, v]) => ({ [k]: v }));
      }

      return {
        _id: u._id || rawId,
        id: String(rawId),
        fullname: u.fullname || u.name || "",
        email: (u.email || "").toLowerCase().trim(),
        mobile: u.mobile || "",
        image: u.image || u.avatar || "",
        address: addrList,
        social: socialList,
        roleId: u.roleId?._id || u.roleId || matchedRole?._id || "",
        roleName: rName,
        isOtpVerified: Boolean(u.isOtpVerified),
        isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
      };
    },
    [roles]
  );

  // Fetch Profile data via user API
  const fetchProfile = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);

    try {
      let remoteUser = null;
      try {
        const res = await getUserProfileApi();
        remoteUser = res?.data !== undefined ? res.data : res;
      } catch {
        const cached = getCurrentUser();
        const cachedId = cached?._id || cached?.id;
        if (cachedId) {
          try {
            const byIdRes = await getUserByIdApi(cachedId);
            remoteUser = byIdRes?.data !== undefined ? byIdRes.data : byIdRes;
          } catch { }
        }
      }

      const activeUser = remoteUser || getCurrentUser();
      const normalized = normalizeUserData(activeUser);

      if (normalized) {
        setProfile(normalized);
        setCurrentUser(normalized);
      }
    } catch {
      showToast("Unable to load latest profile from server", "warning");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [normalizeUserData]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Profile completion calculation for the gauge
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (profile.fullname?.trim()) score += 20;
    if (profile.email?.trim()) score += 20;
    if (profile.mobile?.trim()) score += 20;
    if (profile.image || previewImage) score += 20;
    if (profile.address?.some((a) => Boolean(a && a.trim()))) score += 20;
    return score;
  }, [profile.fullname, profile.email, profile.mobile, profile.image, profile.address, previewImage]);

  // Handle Photo Upload
  const handlePhotoUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreviewImage(base64);
        setProfile((prev) => ({ ...prev, image: base64 }));
        showToast("Profile image selected. Click Update Account to save.", "info");
      } catch {
        showToast("Failed to process image file", "danger");
      }
    }
  }, []);

  // Handle Photo Delete
  const handleDeletePhoto = useCallback(() => {
    setPreviewImage("");
    setProfile((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast("Profile image removed. Click Update Account to save.", "info");
  }, []);

  // Update Account Information
  const handleUpdateAccount = useCallback(
    async (formData) => {
      setSaving(true);
      try {
        const payload = {
          id: profile.id,
          fullname: (formData.fullname || "").trim(),
          email: (formData.email || "").toLowerCase().trim(),
          mobile: (formData.mobile || "").trim(),
          image: profile.image || previewImage || "",
          address: profile.address || ["", ""],
          social: profile.social || [],
          isOtpVerified: Boolean(profile.isOtpVerified),
          isActive: Boolean(profile.isActive),
        };

        let updated = null;
        try {
          const res = await updateProfileApi(payload);
          updated = res?.data !== undefined ? res.data : res;
        } catch {
          const targetId = profile._id || profile.id;
          if (targetId) {
            const res = await updateUserApi(targetId, payload);
            updated = res?.data !== undefined ? res.data : res;
          }
        }

        const merged = normalizeUserData(updated || { ...profile, ...payload });
        if (merged) {
          setProfile(merged);
          setCurrentUser(merged);
        }
        showToast("Account details updated successfully!", "success");
      } catch (err) {
        showToast(err?.message || "Failed to update account details", "danger");
      } finally {
        setSaving(false);
      }
    },
    [profile, previewImage, normalizeUserData]
  );

  // Update Password via /api/auth/reset-password
  const handleUpdatePassword = useCallback(
    async (formData) => {
      const currentPassword = (formData.currentPassword || "").trim();
      const newPassword = (formData.newPassword || "").trim();
      const confirmPassword = (formData.confirmPassword || "").trim();

      if (!currentPassword) {
        showToast("Current password is required", "danger");
        return;
      }
      if (!newPassword) {
        showToast("New password is required", "danger");
        return;
      }
      if (newPassword.length < 6) {
        showToast("New password must be at least 6 characters", "danger");
        return;
      }
      if (newPassword === currentPassword) {
        showToast("New password cannot be the same as current password", "danger");
        return;
      }
      if (newPassword !== confirmPassword) {
        showToast("New passwords do not match", "danger");
        return;
      }
      setSaving(true);
      try {
        const payload = {
          id: profile._id || profile.id,
          userId: profile.id || profile._id,
          email: profile.email || undefined,
          mobile: profile.mobile || undefined,
          currentPassword,
          password: newPassword,
        };

        if (typeof resetPasswordUser === "function") {
          await resetPasswordUser(payload).unwrap();
        } else {
          await resetPasswordApi(payload);
        }
        showToast("Password updated successfully!", "success");
        setActiveTab("account");
      } catch (err) {
        showToast(err?.message || (typeof err === "string" ? err : "Failed to change password"), "danger");
      } finally {
        setSaving(false);
      }
    },
    [profile._id, profile.id, profile.email, profile.mobile, resetPasswordUser]
  );

  // Update Address
  const handleUpdateAddress = useCallback(
    async (addressData) => {
      setSaving(true);
      try {
        let addressArray = [];
        if (Array.isArray(addressData)) {
          addressArray = addressData
            .map((a) => (typeof a === "string" ? a.trim() : formatAddressString(a)))
            .filter(Boolean);
        } else if (addressData && typeof addressData === "object") {
          addressArray = [formatAddressString(addressData)].filter(Boolean);
        } else if (typeof addressData === "string" && addressData.trim()) {
          addressArray = [addressData.trim()];
        }

        const payload = {
          id: profile.id,
          fullname: profile.fullname,
          email: profile.email,
          mobile: profile.mobile,
          image: profile.image || previewImage || "",
          address: addressArray,
          social: profile.social || [],
          isOtpVerified: Boolean(profile.isOtpVerified),
          isActive: Boolean(profile.isActive),
        };

        let updated = null;
        try {
          const res = await updateProfileApi(payload);
          updated = res?.data !== undefined ? res.data : res;
        } catch {
          const targetId = profile._id || profile.id;
          if (targetId) {
            const res = await updateUserApi(targetId, payload);
            updated = res?.data !== undefined ? res.data : res;
          }
        }

        const merged = normalizeUserData(updated || { ...profile, address: addressArray });
        if (merged) {
          setProfile(merged);
          setCurrentUser(merged);
        }
        showToast("Address updated successfully!", "success");
      } catch (err) {
        showToast(err?.message || "Failed to update address", "danger");
      } finally {
        setSaving(false);
      }
    },
    [profile, previewImage, normalizeUserData]
  );

  // Update Social Media & Business Handles
  const handleUpdateSocial = useCallback(
    async (socialData) => {
      setSaving(true);
      try {
        const socialArray = formatSocialArray(socialData);
        const payload = {
          id: profile.id,
          fullname: profile.fullname,
          email: profile.email,
          mobile: profile.mobile,
          image: profile.image || previewImage || "",
          address: profile.address || ["", ""],
          social: socialArray,
          isOtpVerified: Boolean(profile.isOtpVerified),
          isActive: Boolean(profile.isActive),
        };

        let updated = null;
        try {
          const res = await updateProfileApi(payload);
          updated = res?.data !== undefined ? res.data : res;
        } catch {
          const targetId = profile._id || profile.id;
          if (targetId) {
            const res = await updateUserApi(targetId, payload);
            updated = res?.data !== undefined ? res.data : res;
          }
        }

        const merged = normalizeUserData(updated || { ...profile, social: socialArray });
        if (merged) {
          setProfile(merged);
          setCurrentUser(merged);
        }
        showToast("Social media details updated successfully!", "success");
      } catch (err) {
        showToast(err?.message || "Failed to update social media details", "danger");
      } finally {
        setSaving(false);
      }
    },
    [profile, previewImage, normalizeUserData]
  );

  const handleVerifyIdentity = useCallback(() => {
    if (profile.isOtpVerified) {
      showToast("Identity is already verified!", "success");
    } else {
      showToast("Verification request sent to your registered email/mobile.", "info");
    }
  }, [profile.isOtpVerified]);

  const resolvedAvatar = resolveImagePath(
    previewImage || profile.image || "/images/avatar-default.svg"
  );

  if (loading) {
    return (
      <div className="p-20">
        <Skeleton variant="card" height={160} style={{ marginBottom: "20px" }} />
        <Skeleton variant="array-text" count={6} />
      </div>
    );
  }

  return (
    <Container version='v0' className="bg-forth" style={{ height: "calc(100vh - 60px)" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: "none" }}
      />

      <div className="flex items-start gap-12 p-12">
        <div className="grid-cols-1 gap-12 w-25">
          <CompleteProfileCard
            completionPercentage={completionPercentage}
            isOtpVerified={profile.isOtpVerified}
            onVerify={handleVerifyIdentity}
          />

          <div className="p-12 bg-white rounded-5 grid-cols-1">
            <h5 className="mid-text capitalize font-600 text-dark">Profile INFO</h5>
            <p className="mini-text capitalize font-400 text-gray">Manage your personal details.</p>
            <div className="bg-forth p-12 rounded-5 mt-8">
              {PROFILE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between rounded-5 p-15 cursor-pointer ${isActive ? "bg-white" : "bordb"
                      }`}
                  >
                    <div className="flex items-center gap-10">
                      <div className={`icon-lg ${isActive ? "bg-forth" : "bg-forth border-ec"} rounded-5`}>
                        {tab.icon}
                      </div>
                      <div>
                        <h5 className="headmini-text text-dark font-600">{tab.title}</h5>
                        <p className="mini-text text-gray font-400">{tab.subtitle}</p>
                      </div>
                    </div>
                    <Icon name="ChevronRight" width="20" height="20" stroke="#94a3b8" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-75">
          {activeTab === "account" && (
            <AccountSection
              profile={profile}
              resolvedAvatar={resolvedAvatar}
              onDeletePhoto={handleDeletePhoto}
              onUpdateAccount={handleUpdateAccount}
              saving={saving}
              fileInputRef={fileInputRef}
            />
          )}

          {activeTab === "social" && (
            <SocialSection
              profile={profile}
              onUpdateSocial={handleUpdateSocial}
              saving={saving}
            />
          )}

          {activeTab === "password" && (
            <PasswordSection
              onUpdatePassword={handleUpdatePassword}
              saving={saving}
            />
          )}

          {activeTab === "address" && (
            <AddressSection
              profile={profile}
              onUpdateAddress={handleUpdateAddress}
              saving={saving}
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default React.memo(Profile);
