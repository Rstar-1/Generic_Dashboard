import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getCategoriesApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/categories", { params }));

export const getCategoryByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/categories/${id}`));

export const createCategoryApi = (data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.post("/api/categories", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const updateCategoryApi = (id, data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.put(`/api/categories/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const deleteCategoryApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/categories/${id}`));

export const bulkDeleteCategoriesApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/categories/bulk-delete", data));

export default {
  getCategories: getCategoriesApi,
  getCategoryById: getCategoryByIdApi,
  createCategory: createCategoryApi,
  updateCategory: updateCategoryApi,
  deleteCategory: deleteCategoryApi,
  bulkDeleteCategories: bulkDeleteCategoriesApi,
};

