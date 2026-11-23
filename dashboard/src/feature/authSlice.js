import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerApi,
  verifyOtpApi,
  loginApi,
  logoutApi,
  forgotPasswordApi,
  verifyForgotOtpApi,
  resetPasswordApi,
} from "../api/authApi.js";
import { getCurrentUser, setCurrentUser } from "../utils/utils.js";

const normalizeAuthUser = (user, token) => {
  if (!user || typeof user !== "object") return null;

  // 1. Try decoding token if role is not directly on user
  let tokenRole = "";
  let tokenPerms = [];
  try {
    const rawToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (rawToken && typeof rawToken === "string" && rawToken.includes(".")) {
      const parts = rawToken.split(".");
      if (parts.length >= 2) {
        const payloadStr = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
        const parsed = JSON.parse(payloadStr);
        tokenRole = parsed.role || parsed.rolename || "";
        if (Array.isArray(parsed.permissions)) tokenPerms = parsed.permissions;
      }
    }
  } catch {}

  // 2. Try looking in cached roles from localStorage
  let cachedRole = null;
  try {
    const rawRoles = typeof window !== "undefined" ? localStorage.getItem("cachedRoles") : null;
    if (rawRoles) {
      const list = JSON.parse(rawRoles);
      const rId = String(user.roleId?._id || user.roleId || "").toLowerCase();
      cachedRole = list.find((r) => String(r._id).toLowerCase() === rId || String(r.id).toLowerCase() === rId);
    }
  } catch {}

  const roleName =
    user.roleId?.rolename ||
    user.rolename ||
    user.role ||
    tokenRole ||
    cachedRole?.rolename ||
    cachedRole?.role ||
    "customer";

  const permissions =
    user.permissions && user.permissions.length > 0
      ? user.permissions
      : Array.isArray(user.roleId?.permissions) && user.roleId.permissions.length > 0
      ? user.roleId.permissions
      : tokenPerms.length > 0
      ? tokenPerms
      : cachedRole?.permissions || [];

  const pages =
    user.pages && user.pages.length > 0
      ? user.pages
      : Array.isArray(user.roleId?.pages) && user.roleId.pages.length > 0
      ? user.roleId.pages
      : cachedRole?.pages || [];

  return {
    ...user,
    id: user.id || (user._id?.$oid ? user._id.$oid : user._id) || "",
    _id: user._id || user.id,
    fullname: user.fullname || user.name || "User",
    name: user.fullname || user.name || "User",
    email: user.email || "",
    mobile: user.mobile || "",
    role: String(roleName).toLowerCase(),
    rolename: roleName,
    roleId: user.roleId?._id || user.roleId || null,
    permissions,
    pages,
    image: user.image || "",
    isActive: Boolean(user.isActive),
    isOtpVerified: Boolean(user.isOtpVerified),
  };
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await loginApi(credentials);
      const payload = res?.data !== undefined ? res.data : res;
      const { user, token } = payload || {};

      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      const normalized = normalizeAuthUser(user, token);
      if (normalized) {
        setCurrentUser(normalized);
      }

      return { user: normalized, token };
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await registerApi(formData);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyOtpApi(data);
      const payload = res?.data !== undefined ? res.data : res;
      const { user, token } = payload || {};
      const normalized = user ? normalizeAuthUser(user, token) : null;
      if (user) {
        setCurrentUser(user);
      }
      return { message: payload?.message || "Verified successfully", user };
    } catch (err) {
      return rejectWithValue(err.message || "OTP verification failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch {
      // Ignore network logout errors, always clear local state
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("appState");
        window.dispatchEvent(new Event("auth-user-changed"));
      }
    }
    return true;
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordApi(data);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to send OTP");
    }
  }
);

export const verifyForgotOtp = createAsyncThunk(
  "auth/verifyForgotOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await verifyForgotOtpApi(data);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || "Invalid OTP code");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi(data);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to reset password");
    }
  }
);

const initialState = {
  user: typeof window !== "undefined" ? getCurrentUser() : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isAuthenticated: Boolean(typeof window !== "undefined" && localStorage.getItem("token")),
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    setAuthUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload && state.token);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError, setAuthUser } = authSlice.actions;

export const selectAuthUser = (state) => state.auth?.user || null;
export const selectIsAuthenticated = (state) => Boolean(state.auth?.isAuthenticated);
export const selectAuthLoading = (state) => Boolean(state.auth?.loading);
export const selectAuthError = (state) => state.auth?.error || null;

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: React.useCallback((creds) => dispatch(login(creds)), [dispatch]),
    register: React.useCallback((data) => dispatch(register(data)), [dispatch]),
    verifyOtp: React.useCallback((data) => dispatch(verifyOtp(data)), [dispatch]),
    logout: React.useCallback(() => dispatch(logout()), [dispatch]),
    forgotPassword: React.useCallback((data) => dispatch(forgotPassword(data)), [dispatch]),
    verifyForgotOtp: React.useCallback((data) => dispatch(verifyForgotOtp(data)), [dispatch]),
    resetPassword: React.useCallback((data) => dispatch(resetPassword(data)), [dispatch]),
    dispatch,
  };
};

export default authSlice.reducer;

