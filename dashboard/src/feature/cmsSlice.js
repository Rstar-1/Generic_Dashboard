import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCmsListApi,
  getCmsByIdApi,
  getCmsBySectionNameApi,
  createCmsApi,
  updateCmsApi,
  addOrUpdateCmsItemApi,
  deleteCmsItemApi,
  deleteCmsApi,
  bulkDeleteCmsApi,
} from "../api/cmsApi.js";

/* ================= NORMALIZE CMS SECTION ================= */
export const normalizeCms = (c) => {
  if (!c || typeof c !== "object") return c;
  const id = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const sectionName = c.sectionName || c.title || "";
  const createdByObj =
    typeof c.createdBy === "object" && c.createdBy !== null ? c.createdBy : {};
  const creatorName =
    createdByObj.fullname ||
    createdByObj.name ||
    (typeof c.createdby === "string" ? c.createdby : "") ||
    (typeof c.createdBy === "string" && !c.createdBy.match(/^[0-9a-fA-F]{24}$/)
      ? c.createdBy
      : "") ||
    "Admin";

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

  const cmsData = Array.isArray(c.cmsData) ? c.cmsData : [];
  const itemsCount = cmsData.length;
  const itemsCountLabel = `${itemsCount} item${itemsCount === 1 ? "" : "s"}`;

  // Find first available image in cmsData if any
  const firstImageItem = cmsData.find(
    (item) => item.type === "image" && item.image?.url
  );
  const bannerImage = firstImageItem ? firstImageItem.image.url : c.image || "";

  return {
    ...c,
    _id: c._id || id,
    id,
    sectionName,
    title: sectionName,
    name: sectionName,
    slug:
      c.slug ||
      sectionName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
      id.toLowerCase(),
    sectionArea: c.sectionArea || sectionName || "General",
    cmsData,
    itemsCount,
    itemsCountLabel,
    image: bannerImage,
    avatar: bannerImage,
    createdBy: createdByObj._id ? createdByObj : c.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    author: creatorName,
    revision:
      c.revision ||
      (c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "v1.0"),
    isActive: c.isActive !== undefined ? Boolean(c.isActive) : true,
    status: c.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(c.isDeleted),
    createdAt: c.createdAt?.$date || c.createdAt || new Date().toISOString(),
    updatedAt: c.updatedAt?.$date || c.updatedAt || new Date().toISOString(),
  };
};

/* ================= ASYNC THUNKS ================= */
export const fetchCmsList = createAsyncThunk(
  "cms/fetchCmsList",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getCmsListApi(params);
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
        list = Array.isArray(payload.sections) ? payload.sections : [];
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
        sections: list.map(normalizeCms),
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
      return rejectWithValue(err.message || "Failed to fetch CMS sections");
    }
  }
);

export const fetchCmsById = createAsyncThunk(
  "cms/fetchCmsById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCmsByIdApi(id);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch CMS section");
    }
  }
);

export const fetchCmsBySection = createAsyncThunk(
  "cms/fetchCmsBySection",
  async (sectionName, { rejectWithValue }) => {
    try {
      const res = await getCmsBySectionNameApi(sectionName);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch CMS section");
    }
  }
);

export const createCms = createAsyncThunk(
  "cms/createCms",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCmsApi(data);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create CMS section");
    }
  }
);

export const updateCms = createAsyncThunk(
  "cms/updateCms",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCmsApi(id, data);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update CMS section");
    }
  }
);

export const addOrUpdateCmsItem = createAsyncThunk(
  "cms/addOrUpdateCmsItem",
  async ({ id, itemData }, { rejectWithValue }) => {
    try {
      const res = await addOrUpdateCmsItemApi(id, itemData);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update CMS item");
    }
  }
);

export const deleteCmsItem = createAsyncThunk(
  "cms/deleteCmsItem",
  async ({ id, cmsId }, { rejectWithValue }) => {
    try {
      const res = await deleteCmsItemApi(id, cmsId);
      return normalizeCms(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete CMS item");
    }
  }
);

export const deleteCms = createAsyncThunk(
  "cms/deleteCms",
  async ({ id, permanent = false }, { rejectWithValue }) => {
    try {
      await deleteCmsApi(id, permanent);
      return { id, permanent };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete CMS section");
    }
  }
);

export const bulkDeleteCms = createAsyncThunk(
  "cms/bulkDeleteCms",
  async ({ ids, permanent = false }, { rejectWithValue }) => {
    try {
      await bulkDeleteCmsApi({ ids, permanent });
      return { ids, permanent };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete CMS sections");
    }
  }
);

/* ================= INITIAL STATE ================= */
const initialState = {
  sections: [],
  selectedSection: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
  loading: false,
  error: null,
  currentRequestId: undefined,
};

/* ================= SLICE ================= */
const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    clearCmsError: (state) => {
      state.error = null;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    resetCmsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch List
      .addCase(fetchCmsList.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchCmsList.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.sections = action.payload.sections;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchCmsList.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Fetch by ID
      .addCase(fetchCmsById.fulfilled, (state, action) => {
        state.selectedSection = action.payload;
        const index = state.sections.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })

      // Create
      .addCase(createCms.fulfilled, (state, action) => {
        state.sections.unshift(action.payload);
        state.total += 1;
      })

      // Update
      .addCase(updateCms.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
        if (
          state.selectedSection?.id === action.payload.id ||
          state.selectedSection?._id === action.payload._id
        ) {
          state.selectedSection = action.payload;
        }
      })

      // Add/Update item
      .addCase(addOrUpdateCmsItem.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })

      // Delete item
      .addCase(deleteCmsItem.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteCms.fulfilled, (state, action) => {
        const { id, permanent } = action.payload;
        if (permanent) {
          state.sections = state.sections.filter(
            (s) => s.id !== id && s._id !== id
          );
          state.total = Math.max(0, state.total - 1);
        } else {
          const index = state.sections.findIndex(
            (s) => s.id === id || s._id === id
          );
          if (index !== -1) {
            state.sections[index].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteCms.fulfilled, (state, action) => {
        const { ids, permanent } = action.payload;
        if (permanent) {
          state.sections = state.sections.filter(
            (s) => !ids.includes(s.id) && !ids.includes(s._id)
          );
          state.total = Math.max(0, state.total - ids.length);
        } else {
          state.sections.forEach((s) => {
            if (ids.includes(s.id) || ids.includes(s._id)) {
              s.isDeleted = true;
            }
          });
        }
      });
  },
});

export const { clearCmsError, setSelectedSection, resetCmsState } =
  cmsSlice.actions;

/* ================= SELECTORS ================= */
export const selectCmsSections = (state) => state.cms?.sections ?? [];
export const selectCmsLoading = (state) => state.cms?.loading ?? false;
export const selectCmsError = (state) => state.cms?.error ?? null;
export const selectCmsTotal = (state) => state.cms?.total ?? 0;
export const selectCmsPage = (state) => state.cms?.page ?? 1;
export const selectCmsLimit = (state) => state.cms?.limit ?? 10;
export const selectCmsTotalPages = (state) => state.cms?.totalPages ?? 1;
export const selectCmsPagination = (state) => state.cms?.pagination ?? {};
export const selectSelectedCmsSection = (state) =>
  state.cms?.selectedSection ?? null;

/* ================= CUSTOM HOOK ================= */
export const useCms = () => {
  const dispatch = useDispatch();
  const sections = useSelector(selectCmsSections);
  const loading = useSelector(selectCmsLoading);
  const error = useSelector(selectCmsError);
  const total = useSelector(selectCmsTotal);
  const page = useSelector(selectCmsPage);
  const limit = useSelector(selectCmsLimit);
  const totalPages = useSelector(selectCmsTotalPages);
  const pagination = useSelector(selectCmsPagination);
  const selectedSection = useSelector(selectSelectedCmsSection);

  return {
    sections,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    selectedSection,
    getCmsList: React.useCallback(
      (params) => dispatch(fetchCmsList(params)),
      [dispatch]
    ),
    fetchCmsList: React.useCallback(
      (params) => dispatch(fetchCmsList(params)),
      [dispatch]
    ),
    getCmsById: React.useCallback(
      (id) => dispatch(fetchCmsById(id)),
      [dispatch]
    ),
    getCmsBySection: React.useCallback(
      (sectionName) => dispatch(fetchCmsBySection(sectionName)),
      [dispatch]
    ),
    createCms: React.useCallback(
      (data) => dispatch(createCms(data)),
      [dispatch]
    ),
    addCms: React.useCallback(
      (data) => dispatch(createCms(data)),
      [dispatch]
    ),
    updateCms: React.useCallback(
      (id, data) => dispatch(updateCms({ id, data })),
      [dispatch]
    ),
    editCms: React.useCallback(
      (id, data) => dispatch(updateCms({ id, data })),
      [dispatch]
    ),
    addOrUpdateCmsItem: React.useCallback(
      (id, itemData) => dispatch(addOrUpdateCmsItem({ id, itemData })),
      [dispatch]
    ),
    deleteCmsItem: React.useCallback(
      (id, cmsId) => dispatch(deleteCmsItem({ id, cmsId })),
      [dispatch]
    ),
    deleteCms: React.useCallback(
      (id, permanent = false) => dispatch(deleteCms({ id, permanent })),
      [dispatch]
    ),
    removeCms: React.useCallback(
      (id, permanent = false) => dispatch(deleteCms({ id, permanent })),
      [dispatch]
    ),
    bulkDeleteCms: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteCms({ ids, permanent })),
      [dispatch]
    ),
    bulkRemoveCms: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteCms({ ids, permanent })),
      [dispatch]
    ),
    setSelectedSection: React.useCallback(
      (sec) => dispatch(setSelectedSection(sec)),
      [dispatch]
    ),
    clearError: React.useCallback(() => dispatch(clearCmsError()), [dispatch]),
    dispatch,
  };
};

export default cmsSlice.reducer;

