import React from "react";
import FormBuilder from "../../components/forms/FormBuilder";
import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import Badge from "../../components/common/Badge";
import Image from "../../components/common/Image";
import Skeleton from "../../components/common/Skeleton";
import { showToast } from "../../components/common/Toast";
import {
  getUserProfileApi,
  updateProfileApi,
  getUserByIdApi,
  updateUserApi,
} from "../../api/userApi";
import {
  getCurrentUser,
  setCurrentUser,
  formatDate,
  resolveImagePath,
} from "../../utils";
import { useRoles } from "../../feature/roleSlice";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    if (!file || !(file instanceof File || file instanceof Blob)) {
      return resolve(typeof file === "string" ? file : "");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Profile = () => {
  const { roles, getRoles, fetchRoles: fetchRolesList } = useRoles();

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  // User schema state matching mongoose userSchema
  const [profile, setProfile] = React.useState({
    _id: "",
    id: "",
    fullname: "",
    email: "",
    mobile: "",
    image: "",
    address: ["", ""],
    documents: null,
    roleId: "",
    roleName: "Admin",
    isOtpVerified: false,
    isActive: true,
    isDeleted: false,
    lastLogin: null,
    createdAt: "",
    updatedAt: "",
  });

  const rolesRef = React.useRef(roles);
  rolesRef.current = roles;

  const isFetchingRef = React.useRef(false);
  const hasLoadedRef = React.useRef(false);

  // Load roles on mount
  React.useEffect(() => {
    const loader = fetchRolesList || getRoles;
    loader?.({ isDeleted: false, limit: 100 });
  }, [fetchRolesList, getRoles]);

  // Normalize user payload from API/storage according to userSchema
  const normalizeUserData = React.useCallback((u) => {
    if (!u || typeof u !== "object") return null;

    const rawId = u.id || u._id?.$oid || u._id || "USR-001";
    const rawRoleObj = typeof u.roleId === "object" ? u.roleId : null;
    const currentRoles = rolesRef.current || [];
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

    const addr = Array.isArray(u.address)
      ? [u.address[0] || "", u.address[1] || ""]
      : typeof u.address === "string"
      ? [u.address, ""]
      : ["", ""];

    return {
      _id: u._id || rawId,
      id: String(rawId),
      fullname: u.fullname || u.name || "User",
      email: (u.email || "").toLowerCase().trim(),
      mobile: u.mobile || "",
      image: u.image || u.avatar || "",
      address: addr,
      documents: u.documents || null,
      roleId: u.roleId?._id || u.roleId || matchedRole?._id || "",
      roleName: rName,
      roleObj: rawRoleObj || matchedRole || null,
      isOtpVerified: Boolean(u.isOtpVerified),
      isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
      isDeleted: Boolean(u.isDeleted),
      lastLogin: u.lastLogin || null,
      createdAt: u.createdAt || "",
      updatedAt: u.updatedAt || "",
    };
  }, []);

  // Fetch Profile data via userApi once on mount
  const fetchProfile = React.useCallback(
    async (force = false) => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;
      if (!hasLoadedRef.current || force) {
        setLoading(true);
      }

      try {
        let remoteUser = null;

        // 1. Try /api/users/profile
        try {
          const res = await getUserProfileApi();
          remoteUser = res?.data !== undefined ? res.data : res;
        } catch {
          // Fallback to getUserByIdApi if id exists in localStorage
          const cached = getCurrentUser();
          const cachedId = cached?._id || cached?.id;
          if (cachedId) {
            try {
              const byIdRes = await getUserByIdApi(cachedId);
              remoteUser = byIdRes?.data !== undefined ? byIdRes.data : byIdRes;
            } catch {}
          }
        }

        const activeUser = remoteUser || getCurrentUser();
        const normalized = normalizeUserData(activeUser);

        if (normalized) {
          setProfile(normalized);
        }
        hasLoadedRef.current = true;
      } catch {
        showToast("Unable to load latest profile from server", "warning");
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [normalizeUserData]
  );

  React.useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // FormBuilder fields definition adhering to Mongoose userSchema
  const formFields = React.useMemo(() => {
    return [
      {
        name: "fullname",
        label: "Full Name",
        type: "text",
        defaultValue: profile.fullname || "",
        placeholder: "e.g. Raj Shetye",
        validation: { required: true },
      },
      {
        name: "id",
        label: "System User ID",
        type: "text",
        defaultValue: profile.id || "",
        disabled: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        defaultValue: profile.email || "",
        placeholder: "e.g. raj@example.com",
        validation: { required: true, email: true },
      },
      {
        name: "mobile",
        label: "Mobile Number",
        type: "tel",
        defaultValue: profile.mobile || "",
        placeholder: "e.g. 9876543210",
        validation: { required: true, mobile: true },
      },
      {
        name: "role",
        label: "Assigned Role",
        type: "text",
        defaultValue: profile.roleName || profile.role || "Admin",
        disabled: true,
      },
      {
        name: "password",
        label: "New Password (Optional)",
        type: "password",
        placeholder: "Leave empty to keep existing password",
      },
      {
        name: "addressLine1",
        label: "Address Line 1 (Flat, Building, Street)",
        type: "text",
        defaultValue: profile.address?.[0] || "",
        placeholder: "e.g. Flat 402, Sunshine Heights, M.G. Road",
      },
      {
        name: "addressLine2",
        label: "Address Line 2 (City, State, Pincode)",
        type: "text",
        defaultValue: profile.address?.[1] || "",
        placeholder: "e.g. Andheri West, Mumbai, Maharashtra - 400058",
      },
      {
        name: "image",
        label: "Profile Picture",
        type: "dragfile",
        accept: "image/*",
        multiple: false,
        defaultValue: profile.image || "",
      },
      {
        name: "documents",
        label: "KYC / Identity Document",
        type: "dragfile",
        accept: ".pdf,image/*",
        multiple: false,
        defaultValue: profile.documents ? [profile.documents] : [],
      },
      {
        name: "isActive",
        label: "Published Status",
        type: "switch",
        defaultValue: profile.isActive !== undefined ? Boolean(profile.isActive) : true,
      },
    ];
  }, [profile]);

  // Handle FormBuilder submission
  const handleSubmit = React.useCallback(
    async (formData) => {
      setSaving(true);
      try {
        let finalImage = profile.image || "";
        if (formData.image) {
          if (Array.isArray(formData.image) && formData.image.length > 0) {
            const item = formData.image[0];
            if (item instanceof File) {
              finalImage = await fileToBase64(item);
            } else if (typeof item === "string") {
              finalImage = item;
            } else if (item?.url) {
              finalImage = item.url;
            }
          } else if (typeof formData.image === "string") {
            finalImage = formData.image.trim();
          }
        }

        let finalDoc = profile.documents || null;
        if (formData.documents) {
          if (Array.isArray(formData.documents) && formData.documents.length > 0) {
            const docItem = formData.documents[0];
            if (docItem instanceof File) {
              const base64 = await fileToBase64(docItem);
              finalDoc = {
                name: docItem.name,
                type: docItem.type || "application/octet-stream",
                size: `${(docItem.size / 1024).toFixed(1)} KB`,
                uploadedAt: new Date().toISOString(),
                url: base64,
              };
            } else if (docItem && typeof docItem === "object") {
              finalDoc = docItem;
            }
          } else if (typeof formData.documents === "string" && formData.documents.trim()) {
            finalDoc = {
              name: "Document",
              url: formData.documents.trim(),
              uploadedAt: new Date().toISOString(),
            };
          }
        }

        const payload = {
          id: profile.id,
          fullname: (formData.fullname || "").trim(),
          email: (formData.email || "").toLowerCase().trim(),
          mobile: (formData.mobile || "").trim(),
          image: finalImage,
          address: [
            (formData.addressLine1 || "").trim(),
            (formData.addressLine2 || "").trim(),
          ],
          documents: finalDoc,
          isOtpVerified: Boolean(profile.isOtpVerified),
          isActive: Boolean(formData.isActive),
        };

        if (formData.password && typeof formData.password === "string" && formData.password.trim()) {
          payload.password = formData.password.trim();
        }

        let updatedResponse = null;

        // 1. Try updateProfileApi
        try {
          const res = await updateProfileApi(payload);
          updatedResponse = res?.data !== undefined ? res.data : res;
        } catch {
          // Fallback to updateUserApi by target ID
          const targetId = profile._id || profile.id;
          if (targetId) {
            const res = await updateUserApi(targetId, payload);
            updatedResponse = res?.data !== undefined ? res.data : res;
          }
        }

        const merged = normalizeUserData(updatedResponse || { ...profile, ...payload });

        if (merged) {
          setProfile(merged);
          setCurrentUser(merged);
        }

        showToast("Profile details updated successfully", "success");
      } catch (err) {
        showToast(err?.message || "Failed to update profile", "danger");
      } finally {
        setSaving(false);
      }
    },
    [profile, normalizeUserData]
  );

  const resolvedAvatar = resolveImagePath(
    profile.image || "/images/avatar-default.svg"
  );

  if (loading) {
    return (
      <div className="p-20">
        <Skeleton variant="card" height={140} style={{ marginBottom: "20px" }} />
        <Skeleton variant="array-text" count={6} />
      </div>
    );
  }

  return (
    <div className="w-full pb-30">
      {/* Top Header Card */}
      <div className="bg-white rounded-10 border-ec p-20 mb-16 shadow-xs flex items-center justify-between flex-wrap gap-12">
        <div className="flex items-center gap-12">
          <div className="icon-lg bg-forth rounded-8 flex items-center justify-center p-8">
            <Icon name="Users" width="22" height="22" stroke="var(--primary)" />
          </div>
          <div>
            <h3 className="mid-text font-600 text-dark">User Account & Profile</h3>
            <p className="mini-text text-gray font-400">
              Manage personal credentials, residential address, KYC verification, and system settings
            </p>
          </div>
        </div>

        <Button
          version="v2"
          bg="forth"
          color="dark"
          icon="Refresh"
          text="Reload"
          className="rounded-5 font-500"
          onClick={() => fetchProfile(true)}
          disabled={saving}
        />
      </div>

      {/* Hero Profile Banner */}
      <div className="bg-white rounded-10 border-ec p-20 mb-16 shadow-xs relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "4px",
            background: "linear-gradient(90deg, var(--primary) 0%, #06b6d4 100%)",
          }}
        />

        <div className="flex items-center justify-between flex-wrap gap-16 pt-6">
          <div className="flex items-center gap-16">
            <Image
              src={resolvedAvatar}
              alt={profile.fullname}
              className="rounded-full object-cover border-ec shadow-sm"
              style={{ width: "70px", height: "70px" }}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />

            <div>
              <div className="flex items-center gap-8 flex-wrap">
                <h4 className="headmini-text font-600 text-dark">{profile.fullname}</h4>
                <code className="mini-text font-600 bg-forth text-primary px-8 py-2 rounded-4 font-mono">
                  {profile.id}
                </code>
              </div>

              <div className="flex items-center gap-12 mt-4 text-gray mini-text flex-wrap">
                <span className="flex items-center gap-4">
                  <Icon name="Mail" width="13" height="13" stroke="var(--gray)" />
                  {profile.email}
                </span>
                <span className="flex items-center gap-4">
                  <Icon name="Phone" width="13" height="13" stroke="var(--gray)" />
                  {profile.mobile || "No Mobile Added"}
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-8 mt-8 flex-wrap">
                <Badge
                  text={profile.roleName}
                  version="v2"
                  variant="subtle"
                  bg="var(--forth)"
                  color="var(--primary)"
                  className="font-600"
                />

                <Badge
                  text={profile.isActive ? "Published / Active" : "Unpublished / Inactive"}
                  version="v2"
                  variant={profile.isActive ? "success" : "danger"}
                  className="font-500"
                />

                {profile.lastLogin && (
                  <span className="mini-text text-gray flex items-center gap-4 ml-6">
                    <Icon name="Clock" width="12" height="12" stroke="var(--gray)" />
                    Last Active: {formatDate(profile.lastLogin)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified FormBuilder Card */}
      <div className="bg-white rounded-10 border-ec p-20 shadow-xs">
        <div className="bordb pb-12 mb-20">
          <h4 className="font-600 text-dark">Profile Details & Account Configuration</h4>
          <p className="mini-text text-gray">
            Update your identity credentials, residential address, KYC verification documents, and password
          </p>
        </div>

        <FormBuilder
          col="2"
          smcol="1"
          fields={formFields}
          onSubmit={handleSubmit}
          submitType="json"
          submitText={saving ? "Saving Changes..." : "Save Profile Changes"}
          isSubmitting={saving}
          buttonVersion="v2"
          buttonBg="primary"
          buttonClassName="flex justify-end gap-10 mt-20"
        />
      </div>
    </div>
  );
};

export default React.memo(Profile);
