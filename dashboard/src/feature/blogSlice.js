import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBlogsApi,
  getBlogByIdApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
  bulkDeleteBlogsApi,
  addBlogReviewApi,
  deleteBlogReviewApi,
} from "../api/blogApi.js";

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

  const createdByObj =
    typeof b.createdBy === "object" && b.createdBy !== null ? b.createdBy : {};
  const creatorName =
    createdByObj.fullname ||
    createdByObj.name ||
    (typeof b.createdby === "string" ? b.createdby : "") ||
    (typeof b.createdBy === "string" && !b.createdBy.match(/^[0-9a-fA-F]{24}$/)
      ? b.createdBy
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

  const badges = Array.isArray(b.badges) ? b.badges : [];
  const reviews = Array.isArray(b.reviews) ? b.reviews : [];

  return {
    ...b,
    _id: b._id || id,
    id,
    blogName,
    title: blogName,
    name: blogName,
    category: categoryName,
    categoryId: categoryObj._id || b.categoryId,
    categoryName,
    description: b.description || "",
    shortDesc: b.shortDesc || "",
    excerpt: b.shortDesc || (b.description ? b.description.slice(0, 100) + "..." : ""),
    quote: b.quote || "",
    image: b.image || "",
    readTime: b.readTime || "1 min read",
    badges,
    tags: badges,
    specifications: Array.isArray(b.specifications) ? b.specifications : [],
    reviews,
    comments: reviews.length,
    author: creatorName,
    createdBy: createdByObj._id ? createdByObj : b.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    isActive: b.isActive !== undefined ? Boolean(b.isActive) : true,
    status: b.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(b.isDeleted),
    createdAt: b.createdAt?.$date || b.createdAt || new Date().toISOString(),
    updatedAt: b.updatedAt?.$date || b.updatedAt || new Date().toISOString(),
  };
};

// Async Thunks
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getBlogsApi(params);
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
        list = Array.isArray(payload.blogs) ? payload.blogs : [];
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
        blogs: list.map(normalizeBlog),
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
      return rejectWithValue(err.message || "Failed to fetch blogs");
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getBlogByIdApi(id);
      return normalizeBlog(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch blog");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createBlogApi(data);
      return normalizeBlog(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create blog");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateBlogApi(id, data);
      return normalizeBlog(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update blog");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await deleteBlogApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete blog");
    }
  }
);

export const bulkDeleteBlogs = createAsyncThunk(
  "blogs/bulkDeleteBlogs",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteBlogsApi(data);
      const ids = Array.isArray(data)
        ? data
        : Array.isArray(data?.ids)
        ? data.ids
        : data?.blogIds || [];
      return { ids, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete blogs");
    }
  }
);

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

const initialState = {
  blogs: [],
  currentBlog: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    setCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    setBlogsDirectly: (state, action) => {
      state.blogs = Array.isArray(action.payload)
        ? action.payload.map(normalizeBlog)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBlogs.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.blogs = action.payload.blogs;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        const newBlog = action.payload;
        const idx = state.blogs.findIndex(
          (b) => b.id === newBlog.id || (newBlog._id && b._id === newBlog._id)
        );
        if (idx !== -1) {
          state.blogs[idx] = newBlog;
        } else {
          state.blogs.unshift(newBlog);
          state.total += 1;
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.blogs.findIndex(
          (b) => b.id === updated.id || (updated._id && b._id === updated._id)
        );
        if (idx !== -1) state.blogs[idx] = updated;
        if (
          state.currentBlog &&
          (state.currentBlog.id === updated.id ||
            state.currentBlog._id === updated._id)
        ) {
          state.currentBlog = updated;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        const id = action.payload;
        const idx = state.blogs.findIndex(
          (b) => b.id === id || b._id === id
        );
        if (idx !== -1) {
          if (state.blogs[idx].isDeleted) {
            state.blogs.splice(idx, 1);
            state.total = Math.max(0, state.total - 1);
          } else {
            state.blogs[idx].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteBlogs.fulfilled, (state, action) => {
        const idSet = new Set(action.payload.ids.map(String));
        state.blogs = state.blogs
          .filter(
            (b) =>
              !(
                b.isDeleted &&
                (idSet.has(String(b.id)) || idSet.has(String(b._id)))
              )
          )
          .map((b) =>
            idSet.has(String(b.id)) || idSet.has(String(b._id))
              ? { ...b, isDeleted: true }
              : b
          );
      })

      // Review Add
      .addCase(addBlogReview.fulfilled, (state, action) => {
        const updated = action.payload.blog;
        const idx = state.blogs.findIndex(
          (b) => b.id === updated.id || (updated._id && b._id === updated._id)
        );
        if (idx !== -1) state.blogs[idx] = updated;
      })

      // Review Delete
      .addCase(deleteBlogReview.fulfilled, (state, action) => {
        const { id, reviewId } = action.payload;
        const idx = state.blogs.findIndex(
          (b) => b.id === id || b._id === id
        );
        if (idx !== -1) {
          state.blogs[idx].reviews = (state.blogs[idx].reviews || []).filter(
            (r) => String(r.id) !== String(reviewId) && String(r._id) !== String(reviewId)
          );
          state.blogs[idx].comments = state.blogs[idx].reviews.length;
        }
      });
  },
});

export const {
  clearBlogError,
  setCurrentBlog,
  setBlogsDirectly,
} = blogSlice.actions;

// Selectors
export const selectBlogs = (state) => state.blogs?.blogs || [];
export const selectBlogsLoading = (state) => Boolean(state.blogs?.loading);
export const selectBlogsError = (state) => state.blogs?.error || null;
export const selectBlogsTotal = (state) => state.blogs?.total || 0;
export const selectBlogsPage = (state) => state.blogs?.page || 1;
export const selectBlogsLimit = (state) => state.blogs?.limit || 10;
export const selectBlogsTotalPages = (state) => state.blogs?.totalPages || 1;
export const selectBlogsPagination = (state) => state.blogs?.pagination || null;

// Unified useBlogs Hook
export const useBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const loading = useSelector(selectBlogsLoading);
  const error = useSelector(selectBlogsError);
  const total = useSelector(selectBlogsTotal);
  const page = useSelector(selectBlogsPage);
  const limit = useSelector(selectBlogsLimit);
  const totalPages = useSelector(selectBlogsTotalPages);
  const pagination = useSelector(selectBlogsPagination);

  return {
    blogs,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getBlogs: React.useCallback(
      (params) => dispatch(fetchBlogs(params)),
      [dispatch]
    ),
    fetchBlogs: React.useCallback(
      (params) => dispatch(fetchBlogs(params)),
      [dispatch]
    ),
    addBlog: React.useCallback(
      (data) => dispatch(createBlog(data)),
      [dispatch]
    ),
    createBlog: React.useCallback(
      (data) => dispatch(createBlog(data)),
      [dispatch]
    ),
    editBlog: React.useCallback(
      (id, data) => dispatch(updateBlog({ id, data })),
      [dispatch]
    ),
    updateBlog: React.useCallback(
      (id, data) => dispatch(updateBlog({ id, data })),
      [dispatch]
    ),
    removeBlog: React.useCallback(
      (id) => dispatch(deleteBlog(id)),
      [dispatch]
    ),
    deleteBlog: React.useCallback(
      (id) => dispatch(deleteBlog(id)),
      [dispatch]
    ),
    bulkRemoveBlogs: React.useCallback(
      (data) => dispatch(bulkDeleteBlogs(data)),
      [dispatch]
    ),
    bulkDeleteBlogs: React.useCallback(
      (data) => dispatch(bulkDeleteBlogs(data)),
      [dispatch]
    ),
    addReview: React.useCallback(
      (id, data) => dispatch(addBlogReview({ id, data })),
      [dispatch]
    ),
    deleteReview: React.useCallback(
      (id, reviewId) => dispatch(deleteBlogReview({ id, reviewId })),
      [dispatch]
    ),
    dispatch,
  };
};

export default blogSlice.reducer;

