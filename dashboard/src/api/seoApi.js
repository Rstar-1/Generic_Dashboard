import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getSeoListApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/seo", { params }));

export const getSeoByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/seo/${id}`));

export const getSeoByPageApi = (page) =>
  handleRequest(() => axiosInstance.get(`/api/seo/page/${encodeURIComponent(page)}`));

export const getSeoByPathApi = (path) =>
  handleRequest(() => axiosInstance.get("/api/seo/by-path", { params: { path } }));

export const createSeoApi = (data) => {
  if (data instanceof FormData) {
    return handleRequest(() =>
      axiosInstance.post("/api/seo", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }
  return handleRequest(() => axiosInstance.post("/api/seo", data));
};

export const updateSeoApi = (id, data) => {
  if (data instanceof FormData) {
    return handleRequest(() =>
      axiosInstance.put(`/api/seo/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  }
  return handleRequest(() => axiosInstance.put(`/api/seo/${id}`, data));
};

export const deleteSeoApi = (id, permanent = false) =>
  handleRequest(() =>
    axiosInstance.delete(`/api/seo/${id}`, {
      params: permanent ? { permanent: true } : undefined,
    })
  );

export const bulkDeleteSeoApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/seo/bulk-delete", data));

export const seedSeoApi = (force = false) =>
  handleRequest(() => axiosInstance.post("/api/seo/seed", { force }));

export const uploadSeoImageApi = (formData) =>
  handleRequest(() =>
    axiosInstance.post("/api/seo/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

export default {
  getSeoList: getSeoListApi,
  getSeoById: getSeoByIdApi,
  getSeoByPage: getSeoByPageApi,
  getSeoByPath: getSeoByPathApi,
  createSeo: createSeoApi,
  updateSeo: updateSeoApi,
  deleteSeo: deleteSeoApi,
  bulkDeleteSeo: bulkDeleteSeoApi,
  seedSeo: seedSeoApi,
  uploadSeoImage: uploadSeoImageApi,
};

