import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator } from "./sliceHelper.js";
import {
  getBlogCategoriesApi,
  getBlogCategoryByIdApi,
  createBlogCategoryApi,
  updateBlogCategoryApi,
  deleteBlogCategoryApi,
  bulkDeleteBlogCategoriesApi,
  blogCategoryApi,
  useGetBlogCategoriesQuery,
  useLazyGetBlogCategoriesQuery,
  useGetBlogCategoryByIdQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useBulkDeleteBlogCategoriesMutation,
} from "../api/endpoints/blogCategoryApi.js";

export {
  blogCategoryApi,
  useGetBlogCategoriesQuery,
  useLazyGetBlogCategoriesQuery,
  useGetBlogCategoryByIdQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useBulkDeleteBlogCategoriesMutation,
};

export const normalizeBlogCategory = (c) => {
  if (!c || typeof c !== "object") return c;
  const id = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const categoryName = c.categoryName || c.name || "";
  const count = Number(c.count ?? c.articlesCount ?? 0);
  const createdby = normalizeCreator(c.createdBy, c.createdby);

  return {
    ...c,
    _id: id,
    id,
    categoryName,
    name: categoryName,
    count,
    articlesCount: count,
    badge: String(count),
    views: count > 0 ? `${(count * 1.2).toFixed(1)}k` : "0",
    icon: c.icon || "Folder",
    iconName: c.iconName || c.icon || "Folder",
    createdby,
    createdBy: createdby,
    isActive: Boolean(c.isActive ?? true),
    isDeleted: Boolean(c.isDeleted ?? false),
  };
};

export const fetchAllBlogCategories = createAsyncThunk(
  "blogCategories/fetchAllBlogCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getBlogCategoriesApi({ isDeleted: false, limit: "all" });
      const raw = res?.data !== undefined ? res.data : res;
      const list = raw?.categories || (Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw) ? raw : []));
      const normalized = list.map(normalizeBlogCategory);
      try {
        localStorage.setItem("cachedBlogCategories", JSON.stringify(normalized));
      } catch {}
      return normalized;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to load blog categories");
    }
  }
);

const entity = createEntitySlice({
  name: "blogCategories",
  itemKey: "categories",
  singular: "blogCategory",
  plural: "blogCategories",
  api: {
    getAll: getBlogCategoriesApi,
    getById: getBlogCategoryByIdApi,
    create: createBlogCategoryApi,
    update: updateBlogCategoryApi,
    delete: deleteBlogCategoryApi,
    bulkDelete: bulkDeleteBlogCategoriesApi,
  },
  normalizer: normalizeBlogCategory,
  initialState: {
    allCategories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlogCategories.fulfilled, (state, action) => {
      state.allCategories = action.payload;
    });
  },
});

export const {
  fetchBlogCategories,
  fetchBlogCategoryById,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  bulkDeleteBlogCategories,
} = entity.thunks;

export const {
  clearBlogCategoryError,
  setCurrentBlogCategory,
  setBlogCategoriesDirectly,
} = entity.actions;

export const {
  selectCategories: selectBlogCategories,
  selectCategoriesLoading: selectBlogCategoriesLoading,
  selectCategoriesError: selectBlogCategoriesError,
  selectCategoriesTotal: selectBlogCategoriesTotal,
  selectCategoriesPage: selectBlogCategoriesPage,
  selectCategoriesLimit: selectBlogCategoriesLimit,
  selectCategoriesTotalPages: selectBlogCategoriesTotalPages,
  selectCategoriesPagination: selectBlogCategoriesPagination,
  selectCurrentBlogCategory,
} = entity.selectors;

export const selectAllBlogCategories = (state) =>
  state.blogCategories?.allCategories?.length
    ? state.blogCategories.allCategories
    : state.blogCategories?.categories || [];

export const blogCategorySlice = entity.slice;

export const useBlogCategories = () => {
  const base = entity.useHook();
  const dispatch = useDispatch();
  const allCategories = useSelector(selectAllBlogCategories);
  const getAllBlogCategories = React.useCallback(
    () => dispatch(fetchAllBlogCategories()),
    [dispatch]
  );
  return {
    ...base,
    allCategories,
    getAllBlogCategories,
    fetchAllBlogCategories: getAllBlogCategories,
  };
};

export default entity.reducer;
