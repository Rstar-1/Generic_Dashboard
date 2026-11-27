import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator, normalizeVendor } from "./sliceHelper.js";
import {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  bulkDeleteCategoriesApi,
  productCategoryApi,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
} from "../api/endpoints/productCategoryApi.js";

export {
  productCategoryApi,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
};

export const normalizeCategory = (c) => {
  if (!c || typeof c !== "object") return c;
  const rawMongoId = c._id?.$oid || (typeof c._id === "string" ? c._id : c._id ? String(c._id) : "");
  const mongoId = rawMongoId && rawMongoId !== "[object Object]" ? rawMongoId : "";
  const customId = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const id = customId || mongoId || "";
  const categoryName = c.categoryName || c.name || "";
  const count = Number(c.count ?? c.productsCount ?? 0);
  const createdby = normalizeCreator(c.createdBy, c.createdby);
  const vendorBy = normalizeVendor(c.vendorBy, c.VendorBy);

  return {
    ...c,
    _id: mongoId || id,
    mongoId: mongoId || id,
    id,
    customId: customId || id,
    categoryName,
    name: categoryName,
    count,
    productsCount: count,
    badge: String(count),
    slug: c.slug || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    categoryCode: c.categoryCode || id,
    icon: c.icon || "Folder",
    iconName: c.iconName || c.icon || "Folder",
    createdby,
    createdBy: createdby,
    vendorBy,
    VendorBy: vendorBy,
    isActive: Boolean(c.isActive ?? true),
    isDeleted: Boolean(c.isDeleted ?? false),
  };
};

export const fetchAllCategories = createAsyncThunk(
  "productCategories/fetchAllCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getCategoriesApi({ isDeleted: false, limit: "all", ...(params || {}) });
      const raw = res?.data !== undefined ? res.data : res;
      const list = raw?.categories || (Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw) ? raw : []));
      const normalized = list.map(normalizeCategory);
      try {
        localStorage.setItem("cachedProductCategories", JSON.stringify(normalized));
      } catch {}
      return normalized;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load categories");
    }
  }
);

const entity = createEntitySlice({
  name: "productCategories",
  itemKey: "categories",
  singular: "category",
  plural: "categories",
  api: {
    getAll: getCategoriesApi,
    getById: getCategoryByIdApi,
    create: createCategoryApi,
    update: updateCategoryApi,
    delete: deleteCategoryApi,
    bulkDelete: bulkDeleteCategoriesApi,
  },
  normalizer: normalizeCategory,
  initialState: {
    allCategories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.allCategories = action.payload;
    });
  },
});

export const {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
} = entity.thunks;

export const {
  clearCategoryError,
  setCurrentCategory,
  setCategoriesDirectly,
} = entity.actions;

// Selectors (support both state.productCategories and legacy state.categories)
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
export const selectCurrentCategory = (state) =>
  state.productCategories?.currentItem || state.categories?.currentItem || null;

export const selectAllCategories = (state) =>
  state.productCategories?.allCategories?.length
    ? state.productCategories.allCategories
    : state.productCategories?.categories || [];

export const productCategorySlice = entity.slice;

export const useProductCategories = () => {
  const base = entity.useHook();
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllCategories);
  const getAllCategories = React.useCallback(
    (params) => dispatch(fetchAllCategories(params)),
    [dispatch]
  );
  return {
    ...base,
    allCategories,
    getAllCategories,
    fetchAllCategories: getAllCategories,
  };
};

export const useCategories = useProductCategories;
export default entity.reducer;
