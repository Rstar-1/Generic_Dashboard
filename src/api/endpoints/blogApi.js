import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

/**
 * ⚡ RTK Query Endpoints for Blogs
 */
export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, bulkDeleteBlogs)
    ...createCrudEndpoints(builder, {
      tag: "Blog",
      url: "/api/blogs",
      singular: "blog",
      plural: "blogs",
    }),

    // Custom review endpoints
    addBlogReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/blogs/${id}/reviews`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }],
    }),

    deleteBlogReview: builder.mutation({
      query: ({ blogId, reviewId }) => ({
        url: `/api/blogs/${blogId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { blogId }) => [
        { type: "Blog", id: blogId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBlogsQuery,
  useLazyGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useBulkDeleteBlogsMutation,
  useAddBlogReviewMutation,
  useDeleteBlogReviewMutation,
} = blogApi;

// Classic Axios API
const crud = createCrudApi("/api/blogs");
export const getBlogsApi = crud.getAll;
export const getBlogByIdApi = crud.getById;
export const createBlogApi = crud.create;
export const updateBlogApi = crud.update;
export const deleteBlogApi = crud.delete;
export const bulkDeleteBlogsApi = crud.bulkDelete;

export const addBlogReviewApi = (id, data) =>
  handleRequest(() => axiosInstance.post(`/api/blogs/${id}/reviews`, data));

export const deleteBlogReviewApi = (blogId, reviewId) =>
  handleRequest(() =>
    axiosInstance.delete(`/api/blogs/${blogId}/reviews/${reviewId}`)
  );

export default {
  getBlogs: getBlogsApi,
  getBlogById: getBlogByIdApi,
  createBlog: createBlogApi,
  updateBlog: updateBlogApi,
  deleteBlog: deleteBlogApi,
  bulkDeleteBlogs: bulkDeleteBlogsApi,
  addBlogReview: addBlogReviewApi,
  deleteBlogReview: deleteBlogReviewApi,
  blogApi,
};
