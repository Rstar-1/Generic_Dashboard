import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getLeadsApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/leads", { params }));

export const getLeadByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/leads/${id}`));

export const createLeadApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/leads", data));

export const updateLeadApi = (id, data) =>
  handleRequest(() => axiosInstance.put(`/api/leads/${id}`, data));

export const updateLeadSeverityApi = (id, severity) =>
  handleRequest(() => axiosInstance.patch(`/api/leads/${id}/severity`, { severity }));

export const deleteLeadApi = (id, permanent = false) =>
  handleRequest(() =>
    axiosInstance.delete(`/api/leads/${id}`, {
      params: permanent ? { permanent: true } : undefined,
    })
  );

export const bulkDeleteLeadsApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/leads/bulk-delete", data));

export default {
  getLeads: getLeadsApi,
  getLeadById: getLeadByIdApi,
  createLead: createLeadApi,
  updateLead: updateLeadApi,
  updateLeadSeverity: updateLeadSeverityApi,
  deleteLead: deleteLeadApi,
  bulkDeleteLeads: bulkDeleteLeadsApi,
};

