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
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyForgotOtpMutation,
  useResetPasswordMutation,
} from "../api/endpoints/authApi.js";
import { getCurrentUser, setCurrentUser } from "../utils/utils.js";

export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyForgotOtpMutation,
  useResetPasswordMutation,
};

const normalizeAuthUser = (user, token) => {
  if (!user || typeof user !== "object") return null;

  let tokenRole = "";
  let tokenPerms = [];
  try {
    const rawToken = token || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    if (rawToken && typeof rawToken === "string" && rawToken.includes(".")) {
      const parts = rawToken.split(".");
      if (parts.length >= 2) {
        const parsed = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
        tokenRole = parsed.role || parsed.rolename || "";
        if (Array.isArray(parsed.permissions)) tokenPerms = parsed.permissions;
      }
    }
  } catch {}

  const roleName = user.roleId?.rolename || user.rolename || user.role || tokenRole || "customer";
  const permissions = user.permissions?.length ? user.permissions : tokenPerms;
  const pages = user.pages?.length ? user.pages : [];

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

const makeThunk = (type, fn, fallback) =>
  createAsyncThunk(type, async (arg, { rejectWithValue }) => {
    try {
      const res = await fn(arg);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || fallback);
    }
  });

export const login = createAsyncThunk("auth/login", async (creds, { rejectWithValue }) => {
  try {
    const res = await loginApi(creds);
    const payload = res?.data !== undefined ? res.data : res;
    const { user, token } = payload || {};
    if (token && typeof window !== "undefined") localStorage.setItem("token", token);
    const normalized = normalizeAuthUser(user, token);
    if (normalized) setCurrentUser(normalized);
    return { user: normalized, token };
  } catch (err) {
    return rejectWithValue(err.message || "Login failed");
  }
});

export const register = makeThunk("auth/register", registerApi, "Registration failed");
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async (data, { rejectWithValue }) => {
  try {
    const res = await verifyOtpApi(data);
    const payload = res?.data !== undefined ? res.data : res;
    const { user, token } = payload || {};
    const normalized = user ? normalizeAuthUser(user, token) : null;
    if (normalized) setCurrentUser(normalized);
    return { message: payload?.message || "Verified successfully", user: normalized };
  } catch (err) {
    return rejectWithValue(err.message || "OTP verification failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await logoutApi();
  } catch {}
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("appState");
    window.dispatchEvent(new Event("auth-user-changed"));
  }
  return true;
});

export const forgotPassword = makeThunk("auth/forgotPassword", forgotPasswordApi, "Failed to send OTP");
export const verifyForgotOtp = makeThunk("auth/verifyForgotOtp", verifyForgotOtpApi, "Invalid OTP code");
export const resetPassword = makeThunk("auth/resetPassword", resetPasswordApi, "Failed to reset password");

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
    [login, register, verifyOtp].forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          if (thunk === login) state.isAuthenticated = false;
        });
    });

    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.user) state.user = action.payload.user;
      })
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
  return {
    user: useSelector(selectAuthUser),
    isAuthenticated: useSelector(selectIsAuthenticated),
    loading: useSelector(selectAuthLoading),
    error: useSelector(selectAuthError),
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
