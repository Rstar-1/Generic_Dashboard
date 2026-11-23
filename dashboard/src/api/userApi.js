import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const getUsersApi = (params = {}) =>
  handleRequest(() => axiosInstance.get("/api/users", { params }));

export const getUserProfileApi = () =>
  handleRequest(() => axiosInstance.get("/api/users/profile"));

export const updateProfileApi = (data) =>
  handleRequest(() => axiosInstance.put("/api/users/profile", data));

export const getUserByIdApi = (id) =>
  handleRequest(() => axiosInstance.get(`/api/users/${id}`));

export const updateUserApi = (id, data) =>
  handleRequest(() => axiosInstance.put(`/api/users/${id}`, data));

export const deleteUserApi = (id) =>
  handleRequest(() => axiosInstance.delete(`/api/users/${id}`));

export default {
  getUsers: getUsersApi,
  getUserProfile: getUserProfileApi,
  updateProfile: updateProfileApi,
  getUserById: getUserByIdApi,
  updateUser: updateUserApi,
  deleteUser: deleteUserApi,
};

