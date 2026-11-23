import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getProductsApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/products", { params }));

export const getProductByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/products/${id}`));

export const createProductApi = (data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.post("/api/products", data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const updateProductApi = (id, data) =>
  handleRequest(() => {
    const isFormData = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.put(`/api/products/${id}`, data, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
  });

export const deleteProductApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/products/${id}`));

export const bulkDeleteProductsApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/products/bulk-delete", data));

export const addProductReviewApi = (id, data) =>
  handleRequest(() => axiosInstance.post(`/api/products/${id}/reviews`, data));

export const deleteProductReviewApi = (productId, reviewId) =>
  handleRequest(() => axiosInstance.delete(`/api/products/${productId}/reviews/${reviewId}`));

export default {
  getProducts: getProductsApi,
  getProductById: getProductByIdApi,
  createProduct: createProductApi,
  updateProduct: updateProductApi,
  deleteProduct: deleteProductApi,
  bulkDeleteProducts: bulkDeleteProductsApi,
  addProductReview: addProductReviewApi,
  deleteProductReview: deleteProductReviewApi,
};

