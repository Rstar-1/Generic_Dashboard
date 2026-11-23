import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getCmsListApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/cms", { params }));

export const getCmsByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/cms/${id}`));

export const getCmsBySectionNameApi = (sectionName) =>
  handleRequest(() => axiosInstance.get(`/api/cms/section/${encodeURIComponent(sectionName)}`));

export const createCmsApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/cms", data));

export const updateCmsApi = (id, data) =>
  handleRequest(() => axiosInstance.put(`/api/cms/${id}`, data));

export const addOrUpdateCmsItemApi = (id, itemData) =>
  handleRequest(() => axiosInstance.post(`/api/cms/${id}/data`, itemData));

export const deleteCmsItemApi = (id, cmsId) =>
  handleRequest(() => axiosInstance.delete(`/api/cms/${id}/data/${cmsId}`));

export const deleteCmsApi = (id, permanent = false) =>
  handleRequest(() =>
    axiosInstance.delete(`/api/cms/${id}`, {
      params: permanent ? { permanent: true } : undefined,
    })
  );

export const bulkDeleteCmsApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/cms/bulk-delete", data));

export const uploadCmsMediaApi = (formData) =>
  handleRequest(() =>
    axiosInstance.post("/api/cms/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

export default {
  getCmsList: getCmsListApi,
  getCmsById: getCmsByIdApi,
  getCmsBySectionName: getCmsBySectionNameApi,
  createCms: createCmsApi,
  updateCms: updateCmsApi,
  addOrUpdateCmsItem: addOrUpdateCmsItemApi,
  deleteCmsItem: deleteCmsItemApi,
  deleteCms: deleteCmsApi,
  bulkDeleteCms: bulkDeleteCmsApi,
  uploadCmsMedia: uploadCmsMediaApi,
};

