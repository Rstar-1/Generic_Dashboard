import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getBlogsApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/blogs", { params }));

export const getBlogByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/blogs/${id}`));

export const createBlogApi = (data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.post("/api/blogs", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const updateBlogApi = (id, data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.put(`/api/blogs/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const deleteBlogApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/blogs/${id}`));

export const bulkDeleteBlogsApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/blogs/bulk-delete", data));

export const addBlogReviewApi = (id, data) =>
  handleRequest(() => axiosInstance.post(`/api/blogs/${id}/reviews`, data));

export const deleteBlogReviewApi = (id, reviewId) =>
  handleRequest(() => axiosInstance.delete(`/api/blogs/${id}/reviews/${reviewId}`));

export default {
  getBlogs: getBlogsApi,
  getBlogById: getBlogByIdApi,
  createBlog: createBlogApi,
  updateBlog: updateBlogApi,
  deleteBlog: deleteBlogApi,
  bulkDeleteBlogs: bulkDeleteBlogsApi,
  addBlogReview: addBlogReviewApi,
  deleteBlogReview: deleteBlogReviewApi,
};

