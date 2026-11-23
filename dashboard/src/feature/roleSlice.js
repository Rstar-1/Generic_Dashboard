import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRolesApi,
  getRoleByIdApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
  bulkDeleteRolesApi,
} from "../api/roleApi.js";

export const normalizeRole = (r) => {
  if (!r || typeof r !== "object") return r;
  const rolename = r.rolename || r.name || r.role || "";
  const id = r.id || (r._id?.$oid ? r._id.$oid : r._id) || "";
  return {
    ...r,
    _id: r._id || id,
    id,
    rolename,
    name: rolename,
    role: rolename.toLowerCase(),
    permissions: Array.isArray(r.permissions) ? r.permissions : [],
    pages: Array.isArray(r.pages) ? r.pages : [],
    count: r.count ?? 0,
    usersassigned: r.count ?? r.usersassigned ?? r.usersCount ?? 0,
    isActive: r.isActive !== undefined ? Boolean(r.isActive) : true,
    isDeleted: Boolean(r.isDeleted),
    createdAt: r.createdAt?.$date || r.createdAt || new Date().toISOString(),
    updatedAt: r.updatedAt?.$date || r.updatedAt || new Date().toISOString(),
  };
};

// Async Thunks
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getRolesApi(params);
      const payload = res?.data !== undefined ? res.data : res;

      let list = [];
      let total = 0;
      let page = Number(params.page) || 1;
      let limit = Number(params.limit) || 10;
      let totalPages = 1;

      if (Array.isArray(payload)) {
        list = payload;
        total = payload.length;
        totalPages = Math.ceil(total / limit) || 1;
      } else if (payload && typeof payload === "object") {
        list = Array.isArray(payload.roles) ? payload.roles : [];
        total = Number(payload.total ?? payload.pagination?.total ?? list.length);
        page = Number(payload.page ?? payload.pagination?.page ?? page);
        limit = Number(payload.limit ?? payload.pagination?.limit ?? limit);
        totalPages = Number(
          payload.totalPages ??
          payload.pagination?.totalPages ??
          (Math.ceil(total / limit) || 1)
        );
      }

      return {
        roles: list.map(normalizeRole),
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
      return rejectWithValue(err.message || "Failed to fetch roles");
    }
  }
);

export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getRoleByIdApi(id);
      return normalizeRole(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch role");
    }
  }
);

export const createRole = createAsyncThunk(
  "roles/createRole",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createRoleApi(data);
      return normalizeRole(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create role");
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateRoleApi(id, data);
      return normalizeRole(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update role");
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoleApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete role");
    }
  }
);

export const bulkDeleteRoles = createAsyncThunk(
  "roles/bulkDeleteRoles",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteRolesApi(data);
      const ids = Array.isArray(data)
        ? data
        : Array.isArray(data?.ids)
        ? data.ids
        : data?.roleIds || [];
      return { ids, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete roles");
    }
  }
);

const initialState = {
  roles: [],
  currentRole: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearRoleError: (state) => {
      state.error = null;
    },
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    setRolesDirectly: (state, action) => {
      state.roles = Array.isArray(action.payload)
        ? action.payload.map(normalizeRole)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRoles.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.roles = action.payload.roles;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("cachedRoles", JSON.stringify(action.payload.roles));
            } catch {}
          }
        }
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        const newRole = action.payload;
        const idx = state.roles.findIndex(
          (r) => r.id === newRole.id || (newRole._id && r._id === newRole._id)
        );
        if (idx !== -1) {
          state.roles[idx] = newRole;
        } else {
          state.roles.unshift(newRole);
        }
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.roles.findIndex(
          (r) => r.id === updated.id || (updated._id && r._id === updated._id)
        );
        if (idx !== -1) state.roles[idx] = updated;
        if (state.currentRole && (state.currentRole.id === updated.id || state.currentRole._id === updated._id)) {
          state.currentRole = updated;
        }
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete (Soft or Permanent)
      .addCase(deleteRole.fulfilled, (state, action) => {
        const id = action.payload;
        const idx = state.roles.findIndex((r) => r.id === id || r._id === id);
        if (idx !== -1) {
          if (state.roles[idx].isDeleted) {
            state.roles.splice(idx, 1);
          } else {
            state.roles[idx].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteRoles.fulfilled, (state, action) => {
        const idSet = new Set(action.payload.ids.map(String));
        state.roles = state.roles
          .filter((r) => !(r.isDeleted && (idSet.has(String(r.id)) || idSet.has(String(r._id)))))
          .map((r) =>
            idSet.has(String(r.id)) || idSet.has(String(r._id))
              ? { ...r, isDeleted: true }
              : r
          );
      });
  },
});

export const { clearRoleError, setCurrentRole, setRolesDirectly } = roleSlice.actions;

// Selectors
export const selectRoles = (state) => state.roles?.roles || [];
export const selectRolesLoading = (state) => Boolean(state.roles?.loading);
export const selectRolesError = (state) => state.roles?.error || null;
export const selectRolesTotal = (state) => state.roles?.total || 0;
export const selectRolesPage = (state) => state.roles?.page || 1;
export const selectRolesLimit = (state) => state.roles?.limit || 10;
export const selectRolesTotalPages = (state) => state.roles?.totalPages || 1;
export const selectRolesPagination = (state) => state.roles?.pagination || null;

// Unified useRoles Hook
export const useRoles = () => {
  const dispatch = useDispatch();
  const roles = useSelector(selectRoles);
  const loading = useSelector(selectRolesLoading);
  const error = useSelector(selectRolesError);
  const total = useSelector(selectRolesTotal);
  const page = useSelector(selectRolesPage);
  const limit = useSelector(selectRolesLimit);
  const totalPages = useSelector(selectRolesTotalPages);
  const pagination = useSelector(selectRolesPagination);

  return {
    roles,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getRoles: React.useCallback((params) => dispatch(fetchRoles(params)), [dispatch]),
    fetchRoles: React.useCallback((params) => dispatch(fetchRoles(params)), [dispatch]),
    addRole: React.useCallback((data) => dispatch(createRole(data)), [dispatch]),
    editRole: React.useCallback((id, data) => dispatch(updateRole({ id, data })), [dispatch]),
    removeRole: React.useCallback((id) => dispatch(deleteRole(id)), [dispatch]),
    bulkRemoveRoles: React.useCallback((data) => dispatch(bulkDeleteRoles(data)), [dispatch]),
    dispatch,
  };
};

export default roleSlice.reducer;
