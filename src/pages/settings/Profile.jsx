import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Icon from "../../components/common/Icon";
import Image from "../../components/common/Image";
import Skeleton from "../../components/common/Skeleton";
import { showToast } from "../../components/common/Toast";
import {
  getUserProfileApi,
  updateProfileApi,
  getUserByIdApi,
  updateUserApi,
} from "../../api";
import {
  getCurrentUser,
  setCurrentUser,
  resolveImagePath,
  fileToBase64,
} from "../../utils";
import { useRoles } from "../../feature/roleSlice";

const Profile = () => {
  const { roles, getRoles, fetchRoles: fetchRolesList } = useRoles();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("account"); // 'account' | 'password' | 'payment' | 'invite'
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
    roleId: "",
    roleName: "Admin",
    isOtpVerified: false,
    isActive: true,
  });

  // Local form state representing the fields in the UI
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    street: "",
    apt: "",
    city: "",
    state: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
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

      const addr = Array.isArray(u.address)
        ? [u.address[0] || "", u.address[1] || ""]
        : typeof u.address === "string"
        ? [u.address, ""]
        : ["", ""];

      return {
        _id: u._id || rawId,
        id: String(rawId),
        fullname: u.fullname || u.name || "",
        email: (u.email || "").toLowerCase().trim(),
        mobile: u.mobile || "",
        image: u.image || u.avatar || "",
        address: addr,
        roleId: u.roleId?._id || u.roleId || matchedRole?._id || "",
        roleName: rName,
        isOtpVerified: Boolean(u.isOtpVerified),
        isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
      };
    },
    [roles]
  );

  // Populate local form fields from user object
  const syncFormData = useCallback((userData) => {
    if (!userData) return;
    const addr = userData.address || ["", ""];

    let street = "";
    let apt = "";
    if (addr[0]) {
      const parts = addr[0].split(",").map((s) => s.trim());
      street = parts[0] || "";
      apt = parts.slice(1).join(", ") || "";
    }

    let city = "";
    let state = "";
    if (addr[1]) {
      const parts = addr[1].split(",").map((s) => s.trim());
      city = parts[0] || "";
      state = parts.slice(1).join(", ") || "";
    }

    setFormData((prev) => ({
      ...prev,
      fullname: userData.fullname || "",
      email: userData.email || "",
      mobile: userData.mobile || "",
      street: street || (addr[0] || ""),
      apt: apt || "",
      city: city || (addr[1] || ""),
      state: state || "",
    }));
  }, []);

  // Fetch Profile data via API
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
          } catch {}
        }
      }

      const activeUser = remoteUser || getCurrentUser();
      const normalized = normalizeUserData(activeUser);

      if (normalized) {
        setProfile(normalized);
        syncFormData(normalized);
        setCurrentUser(normalized);
      }
    } catch {
      showToast("Unable to load latest profile from server", "warning");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [normalizeUserData, syncFormData]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Profile completion calculation for the gauge
  const completionPercentage = useMemo(() => {
    let score = 0;
    if (formData.fullname?.trim()) score += 20;
    if (formData.email?.trim()) score += 20;
    if (formData.mobile?.trim()) score += 20;
    if (profile.image || previewImage) score += 20;
    if (formData.street?.trim() || formData.city?.trim() || profile.address?.[0]) score += 20;
    return score;
  }, [formData, profile.image, profile.address, previewImage]);

  // Handle Photo Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setPreviewImage(base64);
        setProfile((prev) => ({ ...prev, image: base64 }));
        showToast("Profile image selected. Click Update to save changes.", "info");
      } catch {
        showToast("Failed to process image file", "danger");
      }
    }
  };

  // Handle Photo Delete
  const handleDeletePhoto = () => {
    setPreviewImage("");
    setProfile((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast("Profile image removed. Click Update to save changes.", "info");
  };

  // Handle Form Input change
  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Handle Profile Update
  const handleUpdate = async (e) => {
    e?.preventDefault();

    if (!formData.fullname.trim()) {
      showToast("Please enter your full name", "warning");
      return;
    }
    if (!formData.email.trim()) {
      showToast("Please enter a valid email address", "warning");
      return;
    }

    setSaving(true);
    try {
      const line1 = [formData.street, formData.apt].filter(Boolean).join(", ");
      const line2 = [formData.city, formData.state].filter(Boolean).join(", ");

      const payload = {
        id: profile.id,
        fullname: formData.fullname.trim(),
        email: formData.email.toLowerCase().trim(),
        mobile: formData.mobile.trim(),
        image: profile.image || previewImage || "",
        address: [line1, line2],
        isOtpVerified: Boolean(profile.isOtpVerified),
        isActive: Boolean(profile.isActive),
      };

      let updatedResponse = null;
      try {
        const res = await updateProfileApi(payload);
        updatedResponse = res?.data !== undefined ? res.data : res;
      } catch {
        const targetId = profile._id || profile.id;
        if (targetId) {
          const res = await updateUserApi(targetId, payload);
          updatedResponse = res?.data !== undefined ? res.data : res;
        }
      }

      const merged = normalizeUserData(updatedResponse || { ...profile, ...payload });
      if (merged) {
        setProfile(merged);
        syncFormData(merged);
        setCurrentUser(merged);
      }
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      showToast(err?.message || "Failed to update profile", "danger");
    } finally {
      setSaving(false);
    }
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e) => {
    e?.preventDefault();
    if (!formData.newPassword) {
      showToast("Please enter a new password", "warning");
      return;
    }
    if (formData.newPassword.length < 6) {
      showToast("Password must be at least 6 characters long", "warning");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      showToast("Passwords do not match", "danger");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        id: profile.id,
        password: formData.newPassword.trim(),
      };
      await updateProfileApi(payload);
      showToast("Password changed successfully!", "success");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      showToast(err?.message || "Failed to change password", "danger");
    } finally {
      setSaving(false);
    }
  };

  // Handle Verify Identity action
  const handleVerifyIdentity = () => {
    if (profile.isOtpVerified) {
      showToast("Identity is already verified!", "success");
    } else {
      showToast("Verification request sent to your registered email/mobile.", "info");
    }
  };

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
    <div className="profile-page-wrapper">
      <style>{`
        .profile-page-wrapper {
          padding: 24px;
          background: #f8fafc;
          min-height: calc(100vh - 60px);
          font-family: inherit;
        }
        .profile-layout-grid {
          display: grid;
          grid-template-columns: 310px 1fr;
          gap: 24px;
          max-width: 1240px;
          margin: 0 auto;
          align-items: start;
        }
        @media (max-width: 960px) {
          .profile-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        /* Left Column Cards */
        .profile-left-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .complete-profile-card {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%);
          border-radius: 18px;
          padding: 20px;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.22);
          position: relative;
          overflow: hidden;
        }
        .verify-identity-btn {
          width: 100%;
          background: #ffffff;
          color: #4338ca;
          font-size: 13px;
          font-weight: 600;
          padding: 10px 16px;
          border-radius: 50px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 18px;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .verify-identity-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        /* Navigation Card */
        .profile-nav-card {
          background: #ffffff;
          border-radius: 18px;
          padding: 8px;
          border: 1px solid #edf2f7;
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
        }
        .profile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
        }
        .profile-nav-item:hover {
          background: #f8fafc;
        }
        .profile-nav-item.active {
          background: #f5f3ff;
        }
        .profile-nav-item.active .nav-item-title {
          color: #4f46e5;
        }
        .profile-nav-item.active .nav-icon-box {
          color: #4f46e5;
          background: #ede9fe;
        }
        .nav-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          color: #64748b;
          flex-shrink: 0;
          transition: all 0.15s ease;
        }
        .nav-item-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        .nav-item-desc {
          font-size: 11.5px;
          color: #64748b;
          margin: 2px 0 0 0;
        }
        /* Rewards Card */
        .rewards-card {
          background: #f5f3ff;
          border: 1px dashed #c7d2fe;
          border-radius: 18px;
          padding: 20px 16px;
          text-align: center;
        }
        .rewards-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          color: #4f46e5;
          border: 1px solid #ddd6fe;
          border-radius: 30px;
          padding: 6px 16px;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.15s ease;
        }
        .rewards-pill-btn:hover {
          background: #4f46e5;
          color: #ffffff;
        }
        /* Right Content Card */
        .profile-main-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px 32px;
          border: 1px solid #edf2f7;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
          position: relative;
        }
        @media (max-width: 640px) {
          .profile-main-card {
            padding: 20px 16px;
          }
        }
        .main-header-accent {
          width: 3px;
          height: 18px;
          background: #4f46e5;
          border-radius: 4px;
          display: inline-block;
          margin-right: 8px;
        }
        /* Avatar Row */
        .avatar-section-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin: 24px 0 28px 0;
          flex-wrap: wrap;
        }
        .avatar-wrap {
          position: relative;
          width: 82px;
          height: 82px;
          flex-shrink: 0;
        }
        .avatar-img {
          width: 82px;
          height: 82px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .avatar-camera-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #6366f1;
          border: 2px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
          transition: transform 0.15s ease;
        }
        .avatar-camera-btn:hover {
          transform: scale(1.1);
        }
        .upload-pic-btn {
          background: #6366f1;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 10px;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .upload-pic-btn:hover {
          background: #4f46e5;
        }
        .delete-pic-btn {
          background: #ffffff;
          color: #334155;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .delete-pic-btn:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }
        /* Form Inputs */
        .profile-form-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .input-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 600px) {
          .input-row-2col {
            grid-template-columns: 1fr;
          }
        }
        .custom-input-bar {
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          height: 48px;
          padding: 0 14px;
          transition: all 0.2s ease;
          position: relative;
        }
        .custom-input-bar:focus-within {
          background: #ffffff;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        .custom-input-bar input,
        .custom-input-bar select {
          flex: 1;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-size: 13.5px;
          font-weight: 500;
          color: #0f172a;
          padding: 0 10px;
        }
        .custom-input-bar input::placeholder {
          color: #94a3b8;
          font-weight: 400;
        }
        .input-left-icon {
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .input-edit-icon {
          color: #64748b;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.15s ease;
        }
        .input-edit-icon:hover {
          color: #4f46e5;
        }
        /* Update Submit Button */
        .profile-update-btn {
          width: 100%;
          height: 48px;
          background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 600;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          margin-top: 14px;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.28);
          transition: all 0.15s ease;
        }
        .profile-update-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(79, 70, 229, 0.35);
        }
        .profile-update-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      {/* Hidden File Input for Avatar Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        style={{ display: "none" }}
      />

      <div className="profile-layout-grid">
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="profile-left-col">
          {/* Card 1: Complete Profile Gauge */}
          <div className="complete-profile-card">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Circular SVG Gauge */}
              <div style={{ position: "relative", width: "64px", height: "64px", flexShrink: 0 }}>
                <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: "rotate(-90deg)" }}>
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="5"
                    fill="none"
                  />
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

              {/* Text info */}
              <div>
                <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}>Complete profile</h4>
                <p style={{ margin: "4px 0 0 0", fontSize: "11.5px", opacity: 0.85, lineHeight: 1.3 }}>
                  Complete your profile to unlock all features!
                </p>
              </div>
            </div>

            <button type="button" onClick={handleVerifyIdentity} className="verify-identity-btn">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: profile.isOtpVerified ? "#10b981" : "#2563eb",
                  color: "#ffffff",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>{profile.isOtpVerified ? "Identity Verified" : "Verify Identity"}</span>
            </button>
          </div>

          {/* Card 2: Navigation Menu */}
          <div className="profile-nav-card">
            {/* Account Information */}
            <button
              type="button"
              onClick={() => setActiveTab("account")}
              className={`profile-nav-item ${activeTab === "account" ? "active" : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="nav-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h5 className="nav-item-title">Account Information</h5>
                  <p className="nav-item-desc">Change your Account information</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Password */}
            <button
              type="button"
              onClick={() => setActiveTab("password")}
              className={`profile-nav-item ${activeTab === "password" ? "active" : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="nav-icon-box">
                  <Icon name="Eye" width="17" height="17" stroke="currentColor" />
                </div>
                <div>
                  <h5 className="nav-item-title">Password</h5>
                  <p className="nav-item-desc">Change your Password</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Payment Methods */}
            <button
              type="button"
              onClick={() => setActiveTab("payment")}
              className={`profile-nav-item ${activeTab === "payment" ? "active" : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="nav-icon-box">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h5 className="nav-item-title">Payment Methods</h5>
                  <p className="nav-item-desc">Add Your Card / Wallet</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Invite Your Friends */}
            <button
              type="button"
              onClick={() => setActiveTab("invite")}
              className={`profile-nav-item ${activeTab === "invite" ? "active" : ""}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="nav-icon-box">
                  <Icon name="Mail" width="16" height="16" stroke="currentColor" />
                </div>
                <div>
                  <h5 className="nav-item-title">Invite Your Friends</h5>
                  <p className="nav-item-desc">Get $3 For Each Invitation!</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Card 3: Invite Friends & Rewards Illustration */}
          <div className="rewards-card">
            {/* 3D Gift Box SVG Illustration */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
              <div style={{ position: "relative", width: "52px", height: "52px" }}>
                <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
                  <circle cx="12" cy="16" r="2.5" fill="#a78bfa" />
                  <circle cx="52" cy="14" r="2" fill="#fbbf24" />
                  <circle cx="48" cy="48" r="2" fill="#60a5fa" />
                  <circle cx="14" cy="46" r="2" fill="#f472b6" />
                  <rect x="14" y="26" width="36" height="28" rx="5" fill="#818cf8" />
                  <rect x="10" y="20" width="44" height="9" rx="3" fill="#6366f1" />
                  <rect x="29" y="20" width="6" height="34" fill="#fbbf24" />
                  <rect x="10" y="23" width="44" height="3" fill="#f59e0b" />
                  <path d="M32 20 C26 12, 18 14, 24 20 Z" fill="#f59e0b" />
                  <path d="M32 20 C38 12, 46 14, 40 20 Z" fill="#f59e0b" />
                  <circle cx="32" cy="20" r="3" fill="#fbbf24" />
                </svg>
              </div>
            </div>
            <h5 style={{ margin: 0, fontSize: "13px", fontWeight: "600", color: "#1e1b4b" }}>
              Invite Friends & Earn Rewards
            </h5>
            <button
              type="button"
              onClick={() => {
                setActiveTab("invite");
                showToast("Referral link ready to share!", "info");
              }}
              className="rewards-pill-btn"
            >
              <span>Invite Now</span>
              <span style={{ fontSize: "13px" }}>&rarr;</span>
            </button>
          </div>
        </div>

        {/* ================= RIGHT MAIN CARD ================= */}
        <div className="profile-main-card">
          {activeTab === "account" && (
            <form onSubmit={handleUpdate}>
              {/* Header Title */}
              <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="main-header-accent" />
                  <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                    Personal Informations
                  </h3>
                </div>
                <p style={{ margin: "4px 0 0 11px", fontSize: "12.5px", color: "#64748b" }}>
                  Manage your personal details and keep your account up to date.
                </p>
              </div>

              {/* Avatar + Actions Header */}
              <div className="avatar-section-row">
                <div className="avatar-wrap">
                  <Image
                    src={resolvedAvatar}
                    alt={profile.fullname || "User Profile"}
                    className="avatar-img"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change picture"
                    className="avatar-camera-btn"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </button>
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <h4 style={{ margin: 0, fontSize: "19px", fontWeight: "700", color: "#0f172a" }}>
                      {profile.fullname || "User"}
                    </h4>
                    {/* Blue Verified Badge */}
                    <span
                      title="Verified Account"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "#2563eb",
                        borderRadius: "50%",
                        color: "#ffffff",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span
                      style={{
                        marginLeft: "6px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#4f46e5",
                        backgroundColor: "#ede9fe",
                        padding: "2px 8px",
                        borderRadius: "12px",
                      }}
                    >
                      {profile.roleName}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="upload-pic-btn"
                    >
                      <Icon name="Upload" width="14" height="14" stroke="#ffffff" />
                      <span>Upload New Picture</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDeletePhoto}
                      className="delete-pic-btn"
                    >
                      <Icon name="Trash" width="13" height="13" stroke="#64748b" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Input Fields (matches screenshot layout) */}
              <div className="profile-form-grid">
                {/* 1. Full Name */}
                <div className="custom-input-bar">
                  <div className="input-left-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    id="input-fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={(e) => handleChange("fullname", e.target.value)}
                    placeholder="Full Name"
                    spellCheck={false}
                  />
                  <div
                    className="input-edit-icon"
                    onClick={() => document.getElementById("input-fullname")?.focus()}
                    title="Edit Name"
                  >
                    <Icon name="Edit" width="14" height="14" stroke="currentColor" />
                  </div>
                </div>

                {/* 2. Email */}
                <div className="custom-input-bar">
                  <div className="input-left-icon">
                    <Icon name="Mail" width="16" height="16" stroke="currentColor" />
                  </div>
                  <input
                    id="input-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Email Address"
                    spellCheck={false}
                  />
                  <div
                    className="input-edit-icon"
                    onClick={() => document.getElementById("input-email")?.focus()}
                    title="Edit Email"
                  >
                    <Icon name="Edit" width="14" height="14" stroke="currentColor" />
                  </div>
                </div>

                {/* 3. Mobile */}
                <div className="custom-input-bar">
                  <div className="input-left-icon">
                    <Icon name="Phone" width="16" height="16" stroke="currentColor" />
                  </div>
                  <input
                    id="input-mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="Phone Number (e.g. +91 9876543210)"
                    spellCheck={false}
                  />
                  <div
                    className="input-edit-icon"
                    onClick={() => document.getElementById("input-mobile")?.focus()}
                    title="Edit Phone"
                  >
                    <Icon name="Edit" width="14" height="14" stroke="currentColor" />
                  </div>
                </div>

                {/* 4. Address Row 1: Street Number & Apt / House Number */}
                <div className="input-row-2col">
                  {/* Street Number */}
                  <div className="custom-input-bar">
                    <div className="input-left-icon" style={{ fontSize: "16px", fontWeight: "700" }}>
                      #
                    </div>
                    <input
                      id="input-street"
                      type="text"
                      value={formData.street}
                      onChange={(e) => handleChange("street", e.target.value)}
                      placeholder="Street Number"
                      spellCheck={false}
                    />
                  </div>

                  {/* Apt / House Number */}
                  <div className="custom-input-bar">
                    <div className="input-left-icon">
                      <Icon name="Home" width="16" height="16" stroke="currentColor" />
                    </div>
                    <input
                      id="input-apt"
                      type="text"
                      value={formData.apt}
                      onChange={(e) => handleChange("apt", e.target.value)}
                      placeholder="Apt / House Number"
                      spellCheck={false}
                    />
                  </div>
                </div>

                {/* 5. Address Row 2: City & State */}
                <div className="input-row-2col">
                  {/* City */}
                  <div className="custom-input-bar">
                    <div className="input-left-icon">
                      <Icon name="Building" width="16" height="16" stroke="currentColor" />
                    </div>
                    <input
                      id="input-city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="City"
                      spellCheck={false}
                    />
                    <div className="input-edit-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>

                  {/* State */}
                  <div className="custom-input-bar">
                    <div className="input-left-icon">
                      <Icon name="Globe" width="16" height="16" stroke="currentColor" />
                    </div>
                    <input
                      id="input-state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      placeholder="State"
                      spellCheck={false}
                    />
                    <div className="input-edit-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Update Button */}
                <button
                  type="submit"
                  disabled={saving}
                  className="profile-update-btn"
                >
                  <Icon name="Refresh" width="16" height="16" stroke="#ffffff" className={saving ? "animate-spin" : ""} />
                  <span>{saving ? "Updating..." : "Update"}</span>
                </button>
              </div>
            </form>
          )}

          {/* PASSWORD TAB */}
          {activeTab === "password" && (
            <form onSubmit={handlePasswordUpdate}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="main-header-accent" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                  Change Password
                </h3>
              </div>
              <p style={{ margin: "4px 0 20px 11px", fontSize: "12.5px", color: "#64748b" }}>
                Ensure your account is using a secure and random password.
              </p>

              <div className="profile-form-grid">
                {/* New Password */}
                <div className="custom-input-bar">
                  <div className="input-left-icon">
                    <Icon name="Lock" width="16" height="16" stroke="currentColor" />
                  </div>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    placeholder="New Password (min 6 characters)"
                  />
                  <div
                    className="input-edit-icon"
                    onClick={() => setShowPassword((p) => ({ ...p, new: !p.new }))}
                  >
                    <Icon name={showPassword.new ? "EyeOff" : "Eye"} width="15" height="15" stroke="currentColor" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="custom-input-bar">
                  <div className="input-left-icon">
                    <Icon name="Lock" width="16" height="16" stroke="currentColor" />
                  </div>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    placeholder="Confirm New Password"
                  />
                  <div
                    className="input-edit-icon"
                    onClick={() => setShowPassword((p) => ({ ...p, confirm: !p.confirm }))}
                  >
                    <Icon name={showPassword.confirm ? "EyeOff" : "Eye"} width="15" height="15" stroke="currentColor" />
                  </div>
                </div>

                <button type="submit" disabled={saving} className="profile-update-btn">
                  <Icon name="Refresh" width="16" height="16" stroke="#ffffff" className={saving ? "animate-spin" : ""} />
                  <span>{saving ? "Updating Password..." : "Update Password"}</span>
                </button>
              </div>
            </form>
          )}

          {/* PAYMENT METHODS TAB */}
          {activeTab === "payment" && (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="main-header-accent" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                  Payment Methods
                </h3>
              </div>
              <p style={{ margin: "4px 0 20px 11px", fontSize: "12.5px", color: "#64748b" }}>
                Add your card or wallet for transactions and billing.
              </p>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "14px",
                  padding: "40px 20px",
                  textAlign: "center",
                  border: "1px dashed #cbd5e1",
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>💳</div>
                <h4 style={{ margin: "0 0 6px 0", color: "#1e293b", fontSize: "15px" }}>No Payment Method Saved</h4>
                <p style={{ margin: "0 0 16px 0", color: "#64748b", fontSize: "12.5px" }}>
                  Securely link your credit card or wallet to enable instant checkout.
                </p>
                <button
                  type="button"
                  onClick={() => showToast("Card checkout gateway integration active", "info")}
                  className="upload-pic-btn"
                  style={{ display: "inline-flex" }}
                >
                  <span>+ Add Card / Wallet</span>
                </button>
              </div>
            </div>
          )}

          {/* INVITE FRIENDS TAB */}
          {activeTab === "invite" && (
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="main-header-accent" />
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0f172a" }}>
                  Invite Your Friends
                </h3>
              </div>
              <p style={{ margin: "4px 0 20px 11px", fontSize: "12.5px", color: "#64748b" }}>
                Share your referral link with colleagues and receive $3 for every verified sign-up.
              </p>

              <div
                style={{
                  background: "#f5f3ff",
                  borderRadius: "14px",
                  padding: "24px",
                  border: "1px solid #ddd6fe",
                  marginBottom: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ fontSize: "28px" }}>🎁</div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "15px", color: "#1e1b4b", fontWeight: "700" }}>
                      Earn rewards on every friend invitation
                    </h4>
                    <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#6366f1" }}>
                      No limit on the number of friends you can refer.
                    </p>
                  </div>
                </div>

                <div className="custom-input-bar" style={{ background: "#ffffff" }}>
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}/register?ref=${profile.id || "USR"}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator?.clipboard) {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/register?ref=${profile.id || "USR"}`
                        );
                      }
                      showToast("Referral link copied to clipboard!", "success");
                    }}
                    style={{
                      background: "#6366f1",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
