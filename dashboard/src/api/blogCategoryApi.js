import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getBlogCategoriesApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/blog-categories", { params }));

export const getBlogCategoryByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/blog-categories/${id}`));

export const createBlogCategoryApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/blog-categories", data));

export const updateBlogCategoryApi = (id, data) =>
  handleRequest(() => axiosInstance.put(`/api/blog-categories/${id}`, data));

export const deleteBlogCategoryApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/blog-categories/${id}`));

export const bulkDeleteBlogCategoriesApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/blog-categories/bulk-delete", data));

export default {
  getBlogCategories: getBlogCategoriesApi,
  getBlogCategoryById: getBlogCategoryByIdApi,
  createBlogCategory: createBlogCategoryApi,
  updateBlogCategory: updateBlogCategoryApi,
  deleteBlogCategory: deleteBlogCategoryApi,
  bulkDeleteBlogCategories: bulkDeleteBlogCategoriesApi,
};

