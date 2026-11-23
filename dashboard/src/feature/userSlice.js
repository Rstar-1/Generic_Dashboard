import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersApi,
  getUserByIdApi,
  updateUserApi,
  deleteUserApi,
} from "../api/userApi.js";

export const normalizeUser = (u) => {
  if (!u || typeof u !== "object") return u;
  const roleName = u.roleId?.rolename || u.role || "customer";
  const id = u.id || (u._id?.$oid ? u._id.$oid : u._id) || "";
  const name = u.fullname || u.name || "User";

  return {
    ...u,
    _id: u._id || id,
    id,
    fullname: name,
    name,
    email: u.email || "",
    mobile: u.mobile || "",
    role: String(roleName).toLowerCase(),
    rolename: roleName,
    roleId: u.roleId?._id || u.roleId || null,
    roleObj: typeof u.roleId === "object" ? u.roleId : null,
    image: u.image || u.avatar || "",
    avatar: u.avatar || u.image || "",
    address: Array.isArray(u.address) ? u.address : [],
    loginAttempts: u.loginAttempts !== undefined && u.loginAttempts !== null ? Number(u.loginAttempts) : 0,
    isOtpVerified: Boolean(u.isOtpVerified),
    isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
    status: u.isActive ? "Active" : "Inactive",
    isDeleted: Boolean(u.isDeleted),
    lastLogin: u.lastLogin || null,
    lastActive: u.lastLogin
      ? new Date(u.lastLogin).toLocaleDateString()
      : "Just now",
    createdAt: u.createdAt || new Date().toISOString(),
    updatedAt: u.updatedAt || new Date().toISOString(),
  };
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getUsersApi(params);
      const payload = res?.data !== undefined ? res.data : res;

      let list = [];
      let total = 0;
      let page = Number(params.page) || 1;
      let limit = Number(params.limit) || 20;
      let totalPages = 1;

      if (Array.isArray(payload)) {
        list = payload;
        total = payload.length;
        totalPages = Math.ceil(total / limit) || 1;
      } else if (payload && typeof payload === "object") {
        list = Array.isArray(payload.users) ? payload.users : [];
        total = Number(payload.pagination?.total ?? payload.total ?? list.length);
        page = Number(payload.pagination?.page ?? payload.page ?? page);
        limit = Number(payload.pagination?.limit ?? payload.limit ?? limit);
        totalPages = Number(
          payload.pagination?.totalPages ??
          payload.totalPages ??
          (Math.ceil(total / limit) || 1)
        );
      }

      return {
        users: list.map(normalizeUser),
        total,
        page,
        limit,
        totalPages,
        pagination: { total, page, limit, totalPages },
      };
    } catch (err) {
      if (err?.isCanceled || err?.name === "CanceledError") {
        return rejectWithValue({ isCanceled: true });
      }
      return rejectWithValue(err.message || "Failed to fetch users");
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getUserByIdApi(id);
      return normalizeUser(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(id, data);
      return normalizeUser(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUserApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete user");
    }
  }
);

const initialState = {
  users: [],
  currentUser: null,
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    setCurrentUserItem: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.users = action.payload.users;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.users.findIndex(
          (u) => u.id === updated.id || u._id === updated._id
        );
        if (idx !== -1) state.users[idx] = updated;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload;
        const idx = state.users.findIndex((u) => u.id === id || u._id === id);
        if (idx !== -1) {
          if (state.users[idx].isDeleted) {
            state.users.splice(idx, 1);
          } else {
            state.users[idx].isDeleted = true;
          }
        }
      });
  },
});

export const { clearUserError, setCurrentUserItem } = userSlice.actions;

// Selectors
export const selectUsers = (state) => state.users?.users || [];
export const selectUsersLoading = (state) => Boolean(state.users?.loading);
export const selectUsersTotal = (state) => state.users?.total || 0;
export const selectUsersPagination = (state) => state.users?.pagination || null;

// Unified useUsers Hook
export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector((state) => state.users?.error);
  const total = useSelector(selectUsersTotal);
  const pagination = useSelector(selectUsersPagination);

  return {
    users,
    total,
    loading,
    error,
    pagination,
    getUsers: React.useCallback((params) => dispatch(fetchUsers(params)), [dispatch]),
    getUserById: React.useCallback((id) => dispatch(fetchUserById(id)), [dispatch]),
    editUser: React.useCallback((id, data) => dispatch(updateUser({ id, data })), [dispatch]),
    removeUser: React.useCallback((id) => dispatch(deleteUser(id)), [dispatch]),
    dispatch,
  };
};

export default userSlice.reducer;

