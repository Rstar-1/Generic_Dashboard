import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSeoListApi,
  getSeoByIdApi,
  getSeoByPageApi,
  getSeoByPathApi,
  createSeoApi,
  updateSeoApi,
  deleteSeoApi,
  bulkDeleteSeoApi,
  seedSeoApi,
} from "../api/seoApi.js";

/* ================= CALCULATE SEO SCORE ================= */
export const calculateSeoScore = (doc = {}) => {
  let score = 50;
  if (doc.title) {
    const tLen = doc.title.length;
    if (tLen >= 30 && tLen <= 65) score += 15;
    else if (tLen > 0) score += 8;
  }
  if (doc.description) {
    const dLen = doc.description.length;
    if (dLen >= 120 && dLen <= 165) score += 15;
    else if (dLen > 0) score += 8;
  }
  if (doc.keywords && String(doc.keywords).trim()) score += 10;
  if (doc.image && String(doc.image).trim()) score += 5;
  if (Array.isArray(doc.breadcrumbs) && doc.breadcrumbs.length > 0) score += 5;
  if (!doc.noindex) score += 5;
  return `${Math.min(100, Math.max(30, score))} / 100`;
};

/* ================= NORMALIZE SEO ENTRY ================= */
export const normalizeSeo = (s) => {
  if (!s || typeof s !== "object") return s;
  const id = s.id || (s._id?.$oid ? s._id.$oid : s._id) || "";
  const name = s.name || "";
  const page = s.page || name || "page";
  const pageName = page
    ? page.charAt(0).toUpperCase() + page.slice(1).replace(/[-_]/g, " ")
    : "Page";
  const path = s.path || "";
  const route = path;
  const title = s.title || "";
  const metaTitle = title;
  const description = s.description || "";
  const keywords = s.keywords || "";
  const targetKeyword = (keywords ? String(keywords).split(",")[0].trim() : "") || "General";
  const image = s.image || "";
  const type = (s.type ? String(s.type).toLowerCase() : "website");
  const noindex = Boolean(s.noindex);
  const breadcrumbs = Array.isArray(s.breadcrumbs) ? s.breadcrumbs : [];
  const breadcrumbsText = breadcrumbs.length
    ? breadcrumbs.map((b) => b.label || b.name || b.path || b).join(" > ")
    : pageName;
  const canonical =
    s.canonical ||
    (path ? `https://ashmitavinyls.com${path.startsWith("/") ? path : `/${path}`}` : "https://ashmitavinyls.com");

  const createdByObj =
    typeof s.createdBy === "object" && s.createdBy !== null ? s.createdBy : {};
  const creatorName =
    createdByObj.fullname ||
    createdByObj.name ||
    (typeof s.createdby === "string" ? s.createdby : "") ||
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

  const scoreText = s.seoScore || calculateSeoScore(s);
  const isActive = s.isActive !== undefined ? Boolean(s.isActive) : true;
  const isDeleted = Boolean(s.isDeleted);
  const status = !isActive ? "Inactive" : (noindex ? "NoIndex" : "Active");

  return {
    ...s,
    _id: s._id || id,
    id,
    name,
    page,
    pageName,
    path,
    route,
    title,
    metaTitle,
    description,
    keywords,
    targetKeyword,
    image,
    type,
    noindex,
    breadcrumbs,
    breadcrumbsText,
    canonical,
    createdBy: createdByObj._id ? createdByObj : s.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    seoScore: scoreText,
    score: parseInt(scoreText, 10) || 85,
    status,
    isActive,
    isDeleted,
    createdAt: s.createdAt?.$date || s.createdAt || new Date().toISOString(),
    updatedAt: s.updatedAt?.$date || s.updatedAt || new Date().toISOString(),
    lastCrawled: s.updatedAt
      ? new Date(s.updatedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  };
};

/* ================= ASYNC THUNKS ================= */
export const fetchSeoList = createAsyncThunk(
  "seo/fetchSeoList",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getSeoListApi(params);
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
        list = Array.isArray(payload.seos) ? payload.seos : [];
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
        seos: list.map(normalizeSeo),
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
      return rejectWithValue(err.message || "Failed to fetch SEO configurations");
    }
  }
);

export const fetchSeoById = createAsyncThunk(
  "seo/fetchSeoById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSeoByIdApi(id);
      return normalizeSeo(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch SEO configuration");
    }
  }
);

export const fetchSeoByPage = createAsyncThunk(
  "seo/fetchSeoByPage",
  async (page, { rejectWithValue }) => {
    try {
      const res = await getSeoByPageApi(page);
      return normalizeSeo(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch SEO configuration");
    }
  }
);

export const fetchSeoByPath = createAsyncThunk(
  "seo/fetchSeoByPath",
  async (path, { rejectWithValue }) => {
    try {
      const res = await getSeoByPathApi(path);
      return normalizeSeo(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch SEO configuration");
    }
  }
);

export const createSeo = createAsyncThunk(
  "seo/createSeo",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createSeoApi(data);
      return normalizeSeo(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create SEO configuration");
    }
  }
);

export const updateSeo = createAsyncThunk(
  "seo/updateSeo",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateSeoApi(id, data);
      return normalizeSeo(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update SEO configuration");
    }
  }
);

export const deleteSeo = createAsyncThunk(
  "seo/deleteSeo",
  async ({ id, permanent = false }, { rejectWithValue }) => {
    try {
      await deleteSeoApi(id, permanent);
      return { id, permanent };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete SEO configuration");
    }
  }
);

export const bulkDeleteSeo = createAsyncThunk(
  "seo/bulkDeleteSeo",
  async ({ ids, permanent = false }, { rejectWithValue }) => {
    try {
      await bulkDeleteSeoApi({ ids, permanent });
      return { ids, permanent };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete SEO configurations");
    }
  }
);

export const seedInitialSeo = createAsyncThunk(
  "seo/seedInitialSeo",
  async (force = false, { rejectWithValue }) => {
    try {
      const res = await seedSeoApi(force);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to seed SEO configurations");
    }
  }
);

/* ================= SLICE DEFINITION ================= */
const seoSlice = createSlice({
  name: "seo",
  initialState: {
    seos: [],
    selectedSeo: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
    pagination: { total: 0, page: 1, limit: 5, totalPages: 1 },
  },
  reducers: {
    setSelectedSeo: (state, action) => {
      state.selectedSeo = action.payload;
    },
    clearSeoError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSeoList
      .addCase(fetchSeoList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeoList.fulfilled, (state, action) => {
        state.loading = false;
        state.seos = action.payload.seos;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSeoList.rejected, (state, action) => {
        state.loading = false;
        if (!action.payload?.isCanceled) {
          state.error = action.payload || "Failed to fetch SEO configurations";
        }
      })

      // fetchSeoById
      .addCase(fetchSeoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSeo = action.payload;
        const index = state.seos.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.seos[index] = action.payload;
        }
      })
      .addCase(fetchSeoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // createSeo
      .addCase(createSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeo.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.seos.some(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (!exists) {
          state.seos.unshift(action.payload);
          state.total += 1;
        }
      })
      .addCase(createSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateSeo
      .addCase(updateSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.seos.findIndex(
          (s) => s.id === action.payload.id || s._id === action.payload._id
        );
        if (index !== -1) {
          state.seos[index] = action.payload;
        }
        if (
          state.selectedSeo &&
          (state.selectedSeo.id === action.payload.id ||
            state.selectedSeo._id === action.payload._id)
        ) {
          state.selectedSeo = action.payload;
        }
      })
      .addCase(updateSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteSeo
      .addCase(deleteSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeo.fulfilled, (state, action) => {
        state.loading = false;
        const { id, permanent } = action.payload;
        if (permanent) {
          state.seos = state.seos.filter((s) => s.id !== id && s._id !== id);
          state.total = Math.max(0, state.total - 1);
        } else {
          const index = state.seos.findIndex((s) => s.id === id || s._id === id);
          if (index !== -1) {
            state.seos[index].isDeleted = true;
          }
        }
      })
      .addCase(deleteSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // bulkDeleteSeo
      .addCase(bulkDeleteSeo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkDeleteSeo.fulfilled, (state, action) => {
        state.loading = false;
        const { ids, permanent } = action.payload;
        const idSet = new Set(ids);
        if (permanent) {
          state.seos = state.seos.filter(
            (s) => !idSet.has(s.id) && !idSet.has(s._id)
          );
          state.total = Math.max(0, state.total - ids.length);
        } else {
          state.seos = state.seos.map((s) =>
            idSet.has(s.id) || idSet.has(s._id) ? { ...s, isDeleted: true } : s
          );
        }
      })
      .addCase(bulkDeleteSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // seedInitialSeo
      .addCase(seedInitialSeo.pending, (state) => {
        state.loading = true;
      })
      .addCase(seedInitialSeo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(seedInitialSeo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSeo, clearSeoError } = seoSlice.actions;

/* ================= SELECTORS ================= */
export const selectSeos = (state) => state.seo?.seos ?? [];
export const selectSeoLoading = (state) => state.seo?.loading ?? false;
export const selectSeoError = (state) => state.seo?.error ?? null;
export const selectSeoTotal = (state) => state.seo?.total ?? 0;
export const selectSeoPage = (state) => state.seo?.page ?? 1;
export const selectSeoLimit = (state) => state.seo?.limit ?? 5;
export const selectSeoTotalPages = (state) => state.seo?.totalPages ?? 1;
export const selectSeoPagination = (state) =>
  state.seo?.pagination ?? { total: 0, page: 1, limit: 5, totalPages: 1 };
export const selectSelectedSeo = (state) => state.seo?.selectedSeo ?? null;

/* ================= CUSTOM HOOK ================= */
export const useSeo = () => {
  const dispatch = useDispatch();
  const seos = useSelector(selectSeos);
  const loading = useSelector(selectSeoLoading);
  const error = useSelector(selectSeoError);
  const total = useSelector(selectSeoTotal);
  const page = useSelector(selectSeoPage);
  const limit = useSelector(selectSeoLimit);
  const totalPages = useSelector(selectSeoTotalPages);
  const pagination = useSelector(selectSeoPagination);
  const selectedSeo = useSelector(selectSelectedSeo);

  return {
    seos,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    selectedSeo,
    getSeoList: React.useCallback(
      (params) => dispatch(fetchSeoList(params)),
      [dispatch]
    ),
    fetchSeoList: React.useCallback(
      (params) => dispatch(fetchSeoList(params)),
      [dispatch]
    ),
    getSeoById: React.useCallback(
      (id) => dispatch(fetchSeoById(id)),
      [dispatch]
    ),
    getSeoByPage: React.useCallback(
      (pageName) => dispatch(fetchSeoByPage(pageName)),
      [dispatch]
    ),
    getSeoByPath: React.useCallback(
      (path) => dispatch(fetchSeoByPath(path)),
      [dispatch]
    ),
    createSeo: React.useCallback(
      (data) => dispatch(createSeo(data)),
      [dispatch]
    ),
    addSeo: React.useCallback(
      (data) => dispatch(createSeo(data)),
      [dispatch]
    ),
    updateSeo: React.useCallback(
      (id, data) => dispatch(updateSeo({ id, data })),
      [dispatch]
    ),
    editSeo: React.useCallback(
      (id, data) => dispatch(updateSeo({ id, data })),
      [dispatch]
    ),
    deleteSeo: React.useCallback(
      (id, permanent = false) => dispatch(deleteSeo({ id, permanent })),
      [dispatch]
    ),
    removeSeo: React.useCallback(
      (id, permanent = false) => dispatch(deleteSeo({ id, permanent })),
      [dispatch]
    ),
    bulkDeleteSeo: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteSeo({ ids, permanent })),
      [dispatch]
    ),
    bulkRemoveSeo: React.useCallback(
      (ids, permanent = false) => dispatch(bulkDeleteSeo({ ids, permanent })),
      [dispatch]
    ),
    seedInitialSeo: React.useCallback(
      (force = false) => dispatch(seedInitialSeo(force)),
      [dispatch]
    ),
    setSelectedSeo: React.useCallback(
      (item) => dispatch(setSelectedSeo(item)),
      [dispatch]
    ),
    clearError: React.useCallback(() => dispatch(clearSeoError()), [dispatch]),
    dispatch,
  };
};

export default seoSlice.reducer;

