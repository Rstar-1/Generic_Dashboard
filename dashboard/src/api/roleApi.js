import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getRolesApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/roles", { params }));

export const getRoleByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/roles/${id}`));

export const createRoleApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/roles", data));

export const updateRoleApi = (id, data) =>
  handleRequest(() => axiosInstance.put(`/api/roles/${id}`, data));

export const deleteRoleApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/roles/${id}`));

export const bulkDeleteRolesApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/roles/bulk-delete", data));

export default {
  getRoles: getRolesApi,
  getRoleById: getRoleByIdApi,
  createRole: createRoleApi,
  updateRole: updateRoleApi,
  deleteRole: deleteRoleApi,
  bulkDeleteRoles: bulkDeleteRolesApi,
};
