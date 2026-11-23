import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLeadsApi,
  getLeadByIdApi,
  createLeadApi,
  updateLeadApi,
  updateLeadSeverityApi,
  deleteLeadApi,
  bulkDeleteLeadsApi,
} from "../api/leadApi.js";

export const normalizeLead = (l) => {
  if (!l || typeof l !== "object") return l;
  const id = l.id || (l._id?.$oid ? l._id.$oid : l._id) || "";
  const name = l.name || "";
  const createdByObj =
    typeof l.createdBy === "object" && l.createdBy !== null ? l.createdBy : {};
  const creatorName =
    createdByObj.fullname ||
    createdByObj.name ||
    (typeof l.createdby === "string" ? l.createdby : "") ||
    (typeof l.createdBy === "string" && !l.createdBy.match(/^[0-9a-fA-F]{24}$/)
      ? l.createdBy
      : "") ||
    "Sales Rep";

  const creatorMobile =
    createdByObj.mobile ||
    createdByObj.phone ||
    createdByObj.email ||
    "";
  const creatorAvatar = createdByObj.image || createdByObj.avatar || "";

  const createdbyData = {
    fullname: creatorName,
    name: creatorName,
    mobile: creatorMobile || createdByObj.email || "—",
    phone: creatorMobile || createdByObj.email || "—",
    email: createdByObj.email || "",
    avatar: creatorAvatar,
    image: creatorAvatar,
    toString() {
      return creatorName;
    },
    valueOf() {
      return creatorName;
    },
  };

  const severity = (l.severity || "pending").toLowerCase();
  const severityLabel =
    severity === "approved"
      ? "Approved"
      : severity === "rejected"
      ? "Rejected"
      : severity === "processing"
      ? "Processing"
      : "Pending";

  return {
    ...l,
    _id: l._id || id,
    id,
    orderId: id,
    transactionId: id,
    customer: {
      name,
      fullname: name,
      mobile: l.mobile || "",
      email: l.email || "",
      avatar: l.avatar || "",
    },
    name,
    mobile: l.mobile || "",
    email: l.email || "",
    contact: l.mobile
      ? `${l.mobile}${l.email ? ` • ${l.email}` : ""}`
      : l.email || "—",
    location: l.location || "",
    company: l.location || l.company || "Direct Prospect",
    description: l.description || "",
    severity,
    severityLabel,
    source: l.source || severityLabel,
    value:
      l.value ||
      (severity === "approved"
        ? "Qualified"
        : severity === "rejected"
        ? "Lost"
        : "Pending"),
    assignedTo: l.assignedTo || creatorName,
    createdBy: createdByObj._id ? createdByObj : l.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    avatar: l.avatar || "",
    isActive: l.isActive !== undefined ? Boolean(l.isActive) : true,
    status: l.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(l.isDeleted),
    createdAt: l.createdAt?.$date || l.createdAt || new Date().toISOString(),
    updatedAt: l.updatedAt?.$date || l.updatedAt || new Date().toISOString(),
  };
};

// Async Thunks
export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getLeadsApi(params);
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
        list = Array.isArray(payload.leads) ? payload.leads : [];
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
        leads: list.map(normalizeLead),
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
      return rejectWithValue(err.message || "Failed to fetch leads");
    }
  }
);

export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getLeadByIdApi(id);
      return normalizeLead(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch lead");
    }
  }
);

export const createLead = createAsyncThunk(
  "leads/createLead",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createLeadApi(data);
      return normalizeLead(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create lead");
    }
  }
);

export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateLeadApi(id, data);
      return normalizeLead(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update lead");
    }
  }
);

export const changeLeadSeverity = createAsyncThunk(
  "leads/changeLeadSeverity",
  async ({ id, severity }, { rejectWithValue }) => {
    try {
      const res = await updateLeadSeverityApi(id, severity);
      return normalizeLead(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update severity");
    }
  }
);

export const deleteLead = createAsyncThunk(
  "leads/deleteLead",
  async ({ id, permanent = false }, { rejectWithValue }) => {
    try {
      await deleteLeadApi(id, permanent);
      return { id, permanent };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete lead");
    }
  }
);

export const bulkDeleteLeads = createAsyncThunk(
  "leads/bulkDeleteLeads",
  async ({ ids, permanent = false }, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteLeadsApi({ ids, permanent });
      return { ids, permanent, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete leads");
    }
  }
);

const initialState = {
  leads: [],
  currentLead: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    clearLeadError: (state) => {
      state.error = null;
    },
    setCurrentLead: (state, action) => {
      state.currentLead = action.payload;
    },
    setLeadsDirectly: (state, action) => {
      state.leads = Array.isArray(action.payload)
        ? action.payload.map(normalizeLead)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchLeads.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.leads = action.payload.leads;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLead.fulfilled, (state, action) => {
        state.loading = false;
        const newLead = action.payload;
        const idx = state.leads.findIndex(
          (l) => l.id === newLead.id || (newLead._id && l._id === newLead._id)
        );
        if (idx !== -1) {
          state.leads[idx] = newLead;
        } else {
          state.leads.unshift(newLead);
          state.total += 1;
        }
      })
      .addCase(createLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateLead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.leads.findIndex(
          (l) => l.id === updated.id || (updated._id && l._id === updated._id)
        );
        if (idx !== -1) state.leads[idx] = updated;
        if (
          state.currentLead &&
          (state.currentLead.id === updated.id || state.currentLead._id === updated._id)
        ) {
          state.currentLead = updated;
        }
      })
      .addCase(updateLead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Severity
      .addCase(changeLeadSeverity.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.leads.findIndex(
          (l) => l.id === updated.id || (updated._id && l._id === updated._id)
        );
        if (idx !== -1) state.leads[idx] = updated;
      })

      // Delete
      .addCase(deleteLead.fulfilled, (state, action) => {
        const { id, permanent } = action.payload;
        const idx = state.leads.findIndex((l) => l.id === id || l._id === id);
        if (idx !== -1) {
          if (permanent || state.leads[idx].isDeleted) {
            state.leads.splice(idx, 1);
            state.total = Math.max(0, state.total - 1);
          } else {
            state.leads[idx].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteLeads.fulfilled, (state, action) => {
        const { ids, permanent } = action.payload;
        const idSet = new Set(ids.map(String));
        if (permanent) {
          state.leads = state.leads.filter(
            (l) => !idSet.has(String(l.id)) && !idSet.has(String(l._id))
          );
        } else {
          state.leads = state.leads.map((l) =>
            idSet.has(String(l.id)) || idSet.has(String(l._id))
              ? { ...l, isDeleted: true }
              : l
          );
        }
      });
  },
});

export const { clearLeadError, setCurrentLead, setLeadsDirectly } = leadSlice.actions;

// Selectors
export const selectLeads = (state) => state.leads?.leads || [];
export const selectLeadsLoading = (state) => Boolean(state.leads?.loading);
export const selectLeadsError = (state) => state.leads?.error || null;
export const selectLeadsTotal = (state) => state.leads?.total || 0;
export const selectLeadsPage = (state) => state.leads?.page || 1;
export const selectLeadsLimit = (state) => state.leads?.limit || 10;
export const selectLeadsTotalPages = (state) => state.leads?.totalPages || 1;
export const selectLeadsPagination = (state) => state.leads?.pagination || null;

// Unified useLeads Hook
export const useLeads = () => {
  const dispatch = useDispatch();
  const leads = useSelector(selectLeads);
  const loading = useSelector(selectLeadsLoading);
  const error = useSelector(selectLeadsError);
  const total = useSelector(selectLeadsTotal);
  const page = useSelector(selectLeadsPage);
  const limit = useSelector(selectLeadsLimit);
  const totalPages = useSelector(selectLeadsTotalPages);
  const pagination = useSelector(selectLeadsPagination);

  return {
    leads,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getLeads: React.useCallback(
      (params) => dispatch(fetchLeads(params)),
      [dispatch]
    ),
    fetchLeads: React.useCallback(
      (params) => dispatch(fetchLeads(params)),
      [dispatch]
    ),
    addLead: React.useCallback(
      (data) => dispatch(createLead(data)),
      [dispatch]
    ),
    createLead: React.useCallback(
      (data) => dispatch(createLead(data)),
      [dispatch]
    ),
    editLead: React.useCallback(
      (id, data) => dispatch(updateLead({ id, data })),
      [dispatch]
    ),
    updateLead: React.useCallback(
      (id, data) => dispatch(updateLead({ id, data })),
      [dispatch]
    ),
    setLeadSeverity: React.useCallback(
      (id, severity) => dispatch(changeLeadSeverity({ id, severity })),
      [dispatch]
    ),
    removeLead: React.useCallback(
      (id, permanent = false) => dispatch(deleteLead({ id, permanent })),
      [dispatch]
    ),
    deleteLead: React.useCallback(
      (id, permanent = false) => dispatch(deleteLead({ id, permanent })),
      [dispatch]
    ),
    bulkRemoveLeads: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteLeads({ ids, permanent })),
      [dispatch]
    ),
    bulkDeleteLeads: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteLeads({ ids, permanent })),
      [dispatch]
    ),
    dispatch,
  };
};

export default leadSlice.reducer;

