import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogCategoriesApi,
  getBlogCategoryByIdApi,
  createBlogCategoryApi,
  updateBlogCategoryApi,
  deleteBlogCategoryApi,
  bulkDeleteBlogCategoriesApi,
} from "../api/blogCategoryApi.js";

export const normalizeBlogCategory = (c) => {
  if (!c || typeof c !== "object") return c;
  const id = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const categoryName = c.categoryName || c.name || "";
  const count = Number(c.count ?? c.articlesCount ?? 0);
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

  return {
    ...c,
    _id: c._id || id,
    id,
    categoryName,
    name: categoryName,
    slug: c.slug || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    icon: c.image || "Clipboard",
    count,
    articlesCount: count,
    badge: c.badge || categoryName,
    views: c.views ?? 0,
    createdBy: createdByObj._id ? createdByObj : c.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    isActive: c.isActive !== undefined ? Boolean(c.isActive) : true,
    status: c.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(c.isDeleted),
    createdAt: c.createdAt?.$date || c.createdAt || new Date().toISOString(),
    updatedAt: c.updatedAt?.$date || c.updatedAt || new Date().toISOString(),
  };
};

// Async Thunks
export const fetchBlogCategories = createAsyncThunk(
  "blogCategories/fetchBlogCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getBlogCategoriesApi(params);
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
        list = Array.isArray(payload.categories) ? payload.categories : [];
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
        categories: list.map(normalizeBlogCategory),
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
      return rejectWithValue(err.message || "Failed to fetch blog categories");
    }
  }
);

export const fetchBlogCategoryById = createAsyncThunk(
  "blogCategories/fetchBlogCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getBlogCategoryByIdApi(id);
      return normalizeBlogCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch blog category");
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "blogCategories/createBlogCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createBlogCategoryApi(data);
      return normalizeBlogCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create blog category");
    }
  }
);

export const updateBlogCategory = createAsyncThunk(
  "blogCategories/updateBlogCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateBlogCategoryApi(id, data);
      return normalizeBlogCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update blog category");
    }
  }
);

export const deleteBlogCategory = createAsyncThunk(
  "blogCategories/deleteBlogCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlogCategoryApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete blog category");
    }
  }
);

export const bulkDeleteBlogCategories = createAsyncThunk(
  "blogCategories/bulkDeleteBlogCategories",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteBlogCategoriesApi(data);
      const ids = Array.isArray(data)
        ? data
        : Array.isArray(data?.ids)
        ? data.ids
        : data?.categoryIds || [];
      return { ids, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete blog categories");
    }
  }
);

const initialState = {
  categories: [],
  currentCategory: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {
    clearBlogCategoryError: (state) => {
      state.error = null;
    },
    setCurrentBlogCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setBlogCategoriesDirectly: (state, action) => {
      state.categories = Array.isArray(action.payload)
        ? action.payload.map(normalizeBlogCategory)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBlogCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.categories = action.payload.categories;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        const newCat = action.payload;
        const idx = state.categories.findIndex(
          (c) => c.id === newCat.id || (newCat._id && c._id === newCat._id)
        );
        if (idx !== -1) {
          state.categories[idx] = newCat;
        } else {
          state.categories.unshift(newCat);
          state.total += 1;
        }
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateBlogCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.categories.findIndex(
          (c) => c.id === updated.id || (updated._id && c._id === updated._id)
        );
        if (idx !== -1) state.categories[idx] = updated;
        if (
          state.currentCategory &&
          (state.currentCategory.id === updated.id ||
            state.currentCategory._id === updated._id)
        ) {
          state.currentCategory = updated;
        }
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        const id = action.payload;
        const idx = state.categories.findIndex(
          (c) => c.id === id || c._id === id
        );
        if (idx !== -1) {
          if (state.categories[idx].isDeleted) {
            state.categories.splice(idx, 1);
            state.total = Math.max(0, state.total - 1);
          } else {
            state.categories[idx].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteBlogCategories.fulfilled, (state, action) => {
        const idSet = new Set(action.payload.ids.map(String));
        state.categories = state.categories
          .filter(
            (c) =>
              !(
                c.isDeleted &&
                (idSet.has(String(c.id)) || idSet.has(String(c._id)))
              )
          )
          .map((c) =>
            idSet.has(String(c.id)) || idSet.has(String(c._id))
              ? { ...c, isDeleted: true }
              : c
          );
      });
  },
});

export const {
  clearBlogCategoryError,
  setCurrentBlogCategory,
  setBlogCategoriesDirectly,
} = blogCategorySlice.actions;

// Selectors
export const selectBlogCategories = (state) =>
  state.blogCategories?.categories || [];
export const selectBlogCategoriesLoading = (state) =>
  Boolean(state.blogCategories?.loading);
export const selectBlogCategoriesError = (state) =>
  state.blogCategories?.error || null;
export const selectBlogCategoriesTotal = (state) =>
  state.blogCategories?.total || 0;
export const selectBlogCategoriesPage = (state) =>
  state.blogCategories?.page || 1;
export const selectBlogCategoriesLimit = (state) =>
  state.blogCategories?.limit || 10;
export const selectBlogCategoriesTotalPages = (state) =>
  state.blogCategories?.totalPages || 1;
export const selectBlogCategoriesPagination = (state) =>
  state.blogCategories?.pagination || null;

// Unified useBlogCategories Hook
export const useBlogCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectBlogCategories);
  const loading = useSelector(selectBlogCategoriesLoading);
  const error = useSelector(selectBlogCategoriesError);
  const total = useSelector(selectBlogCategoriesTotal);
  const page = useSelector(selectBlogCategoriesPage);
  const limit = useSelector(selectBlogCategoriesLimit);
  const totalPages = useSelector(selectBlogCategoriesTotalPages);
  const pagination = useSelector(selectBlogCategoriesPagination);

  return {
    categories,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getBlogCategories: React.useCallback(
      (params) => dispatch(fetchBlogCategories(params)),
      [dispatch]
    ),
    fetchBlogCategories: React.useCallback(
      (params) => dispatch(fetchBlogCategories(params)),
      [dispatch]
    ),
    addBlogCategory: React.useCallback(
      (data) => dispatch(createBlogCategory(data)),
      [dispatch]
    ),
    createBlogCategory: React.useCallback(
      (data) => dispatch(createBlogCategory(data)),
      [dispatch]
    ),
    editBlogCategory: React.useCallback(
      (id, data) => dispatch(updateBlogCategory({ id, data })),
      [dispatch]
    ),
    updateBlogCategory: React.useCallback(
      (id, data) => dispatch(updateBlogCategory({ id, data })),
      [dispatch]
    ),
    removeBlogCategory: React.useCallback(
      (id) => dispatch(deleteBlogCategory(id)),
      [dispatch]
    ),
    deleteBlogCategory: React.useCallback(
      (id) => dispatch(deleteBlogCategory(id)),
      [dispatch]
    ),
    bulkRemoveBlogCategories: React.useCallback(
      (data) => dispatch(bulkDeleteBlogCategories(data)),
      [dispatch]
    ),
    bulkDeleteBlogCategories: React.useCallback(
      (data) => dispatch(bulkDeleteBlogCategories(data)),
      [dispatch]
    ),
    dispatch,
  };
};

export default blogCategorySlice.reducer;

