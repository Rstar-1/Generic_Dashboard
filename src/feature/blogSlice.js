import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator, normalizeVendor } from "./sliceHelper.js";
import {
  getBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  bulkDeleteBlogsApi,
  addBlogReviewApi,
  deleteBlogReviewApi,
  blogApi,
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useBulkDeleteBlogsMutation,
  useAddBlogReviewMutation,
  useDeleteBlogReviewMutation,
} from "../api/endpoints/blogApi.js";

export {
  blogApi,
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useBulkDeleteBlogsMutation,
  useAddBlogReviewMutation,
  useDeleteBlogReviewMutation,
};

export const normalizeBlog = (b) => {
  if (!b || typeof b !== "object") return b;
  const id = b.id || (b._id?.$oid ? b._id.$oid : b._id) || "";
  const blogName = b.blogName || b.title || "";
  const categoryObj =
    typeof b.categoryId === "object" && b.categoryId !== null ? b.categoryId : {};
  const categoryName =
    categoryObj.categoryName ||
    categoryObj.name ||
    (typeof b.category === "string"
      ? b.category
      : typeof b.categoryId === "string"
      ? b.categoryId
      : "General");

  const createdby = normalizeCreator(b.createdBy, b.createdby);
  const vendorBy = normalizeVendor(b.vendorBy, b.VendorBy);

  return {
    ...b,
    _id: id,
    id,
    blogName,
    title: blogName,
    name: blogName,
    categoryId: categoryObj._id || b.categoryId || "",
    category: categoryName,
    categoryName,
    description: b.description || "",
    content: b.content || b.description || "",
    tags: Array.isArray(b.tags) ? b.tags : [],
    image: b.image || "",
    views: Number(b.views || 0),
    likes: Number(b.likes || 0),
    reviews: Array.isArray(b.reviews) ? b.reviews : [],
    createdby,
    createdBy: createdby,
    vendorBy,
    VendorBy: vendorBy,
    isActive: b.isActive !== undefined ? Boolean(b.isActive) : true,
    status: b.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(b.isDeleted),
    createdAt: b.createdAt?.$date || b.createdAt || new Date().toISOString(),
    updatedAt: b.updatedAt?.$date || b.updatedAt || new Date().toISOString(),
  };
};

export const addBlogReview = createAsyncThunk(
  "blogs/addBlogReview",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await addBlogReviewApi(id, data);
      return { id, blog: normalizeBlog(res?.data !== undefined ? res.data : res) };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to add blog review");
    }
  }
);

export const deleteBlogReview = createAsyncThunk(
  "blogs/deleteBlogReview",
  async ({ id, reviewId }, { rejectWithValue }) => {
    try {
      await deleteBlogReviewApi(id, reviewId);
      return { id, reviewId };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete blog review");
    }
  }
);

const entity = createEntitySlice({
  name: "blogs",
  itemKey: "blogs",
  singular: "blog",
  plural: "blogs",
  api: {
    getAll: getBlogsApi,
    getById: getBlogByIdApi,
    create: createBlogApi,
    update: updateBlogApi,
    delete: deleteBlogApi,
    bulkDelete: bulkDeleteBlogsApi,
  },
  normalizer: normalizeBlog,
  extraReducers: (builder) => {
    builder
      .addCase(addBlogReview.fulfilled, (state, action) => {
        const { id, blog } = action.payload;
        const idx = state.blogs.findIndex((b) => b.id === id || b._id === id);
        if (idx !== -1) state.blogs[idx] = blog;
        if (state.currentItem && (state.currentItem.id === id || state.currentItem._id === id)) {
          state.currentItem = blog;
        }
      })
      .addCase(deleteBlogReview.fulfilled, (state, action) => {
        const { id, reviewId } = action.payload;
        const target = state.blogs.find((b) => b.id === id || b._id === id);
        if (target && Array.isArray(target.reviews)) {
          target.reviews = target.reviews.filter((r) => r.id !== reviewId && r._id !== reviewId);
        }
        if (state.currentItem && Array.isArray(state.currentItem.reviews)) {
          state.currentItem.reviews = state.currentItem.reviews.filter(
            (r) => r.id !== reviewId && r._id !== reviewId
          );
        }
      });
  },
  customHookMethods: {
    addReview: (dispatch) => (id, data) => dispatch(addBlogReview({ id, data })),
    removeReview: (dispatch) => (id, reviewId) => dispatch(deleteBlogReview({ id, reviewId })),
    deleteReview: (dispatch) => (id, reviewId) => dispatch(deleteBlogReview({ id, reviewId })),
  },
});

export const {
  fetchBlogs,
  fetchBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkDeleteBlogs,
} = entity.thunks;

export const {
  clearBlogError,
  setCurrentBlog,
  setBlogsDirectly,
} = entity.actions;

export const {
  selectBlogs,
  selectBlogsLoading,
  selectBlogsError,
  selectBlogsTotal,
  selectBlogsPage,
  selectBlogsLimit,
  selectBlogsTotalPages,
  selectBlogsPagination,
  selectCurrentBlog,
} = entity.selectors;

export const blogSlice = entity.slice;
export const useBlogs = entity.useHook;
export default entity.reducer;
