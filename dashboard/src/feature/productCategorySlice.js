import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  bulkDeleteCategoriesApi,
} from "../api/productCategoryApi.js";

export const normalizeCategory = (c) => {
  if (!c || typeof c !== "object") return c;
  const id = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const categoryName = c.categoryName || c.name || "";
  const count = Number(c.count ?? c.productsCount ?? 0);
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
    categoryCode: c.categoryCode || id || `CAT-${String(id).slice(-4).toUpperCase()}`,
    description: c.description || "",
    image: c.image || "",
    icon: c.image || c.iconName || "Box",
    iconName: c.iconName || "",
    count,
    productsCount: count,
    subCategoriesCount: c.subCategoriesCount ?? 0,
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
export const fetchCategories = createAsyncThunk(
  "productCategories/fetchCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi(params);
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
        categories: list.map(normalizeCategory),
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
      return rejectWithValue(err.message || "Failed to fetch categories");
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "productCategories/fetchCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getCategoryByIdApi(id);
      return normalizeCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch category");
    }
  }
);

export const createCategory = createAsyncThunk(
  "productCategories/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createCategoryApi(data);
      return normalizeCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create category");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "productCategories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateCategoryApi(id, data);
      return normalizeCategory(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update category");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "productCategories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete category");
    }
  }
);

export const bulkDeleteCategories = createAsyncThunk(
  "productCategories/bulkDeleteCategories",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteCategoriesApi(data);
      const ids = Array.isArray(data)
        ? data
        : Array.isArray(data?.ids)
        ? data.ids
        : data?.categoryIds || [];
      return { ids, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete categories");
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

export const productCategorySlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    setCategoriesDirectly: (state, action) => {
      state.categories = Array.isArray(action.payload)
        ? action.payload.map(normalizeCategory)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
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
      .addCase(fetchCategories.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
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
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
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
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCategory.fulfilled, (state, action) => {
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
      .addCase(bulkDeleteCategories.fulfilled, (state, action) => {
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
  clearCategoryError,
  setCurrentCategory,
  setCategoriesDirectly,
} = productCategorySlice.actions;

// Selectors
export const selectCategories = (state) =>
  state.productCategories?.categories || state.categories?.categories || [];
export const selectCategoriesLoading = (state) =>
  Boolean(state.productCategories?.loading || state.categories?.loading);
export const selectCategoriesError = (state) =>
  state.productCategories?.error || state.categories?.error || null;
export const selectCategoriesTotal = (state) =>
  state.productCategories?.total || state.categories?.total || 0;
export const selectCategoriesPage = (state) =>
  state.productCategories?.page || state.categories?.page || 1;
export const selectCategoriesLimit = (state) =>
  state.productCategories?.limit || state.categories?.limit || 10;
export const selectCategoriesTotalPages = (state) =>
  state.productCategories?.totalPages || state.categories?.totalPages || 1;
export const selectCategoriesPagination = (state) =>
  state.productCategories?.pagination || state.categories?.pagination || null;

// Unified useProductCategories Hook
export const useProductCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectCategoriesLoading);
  const error = useSelector(selectCategoriesError);
  const total = useSelector(selectCategoriesTotal);
  const page = useSelector(selectCategoriesPage);
  const limit = useSelector(selectCategoriesLimit);
  const totalPages = useSelector(selectCategoriesTotalPages);
  const pagination = useSelector(selectCategoriesPagination);

  return {
    categories,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getCategories: React.useCallback(
      (params) => dispatch(fetchCategories(params)),
      [dispatch]
    ),
    fetchCategories: React.useCallback(
      (params) => dispatch(fetchCategories(params)),
      [dispatch]
    ),
    addCategory: React.useCallback(
      (data) => dispatch(createCategory(data)),
      [dispatch]
    ),
    createCategory: React.useCallback(
      (data) => dispatch(createCategory(data)),
      [dispatch]
    ),
    editCategory: React.useCallback(
      (id, data) => dispatch(updateCategory({ id, data })),
      [dispatch]
    ),
    updateCategory: React.useCallback(
      (id, data) => dispatch(updateCategory({ id, data })),
      [dispatch]
    ),
    removeCategory: React.useCallback(
      (id) => dispatch(deleteCategory(id)),
      [dispatch]
    ),
    deleteCategory: React.useCallback(
      (id) => dispatch(deleteCategory(id)),
      [dispatch]
    ),
    bulkRemoveCategories: React.useCallback(
      (data) => dispatch(bulkDeleteCategories(data)),
      [dispatch]
    ),
    bulkDeleteCategories: React.useCallback(
      (data) => dispatch(bulkDeleteCategories(data)),
      [dispatch]
    ),
    dispatch,
  };
};

export default productCategorySlice.reducer;

