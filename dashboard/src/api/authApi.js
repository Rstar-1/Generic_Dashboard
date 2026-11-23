import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

export const registerApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/auth/register", data));

export const verifyOtpApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/auth/verify-otp", data));

export const loginApi = (credentials) =>
  handleRequest(() => axiosInstance.post("/api/auth/login", credentials));

export const logoutApi = () =>
  handleRequest(() => axiosInstance.post("/api/auth/logout"));

export const forgotPasswordApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/auth/forgot-password", data));

export const verifyForgotOtpApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/auth/verify-forgot-otp", data));

export const resetPasswordApi = (data) =>
  handleRequest(() => axiosInstance.post("/api/auth/reset-password", data));

export default {
  register: registerApi,
  verifyOtp: verifyOtpApi,
  login: loginApi,
  logout: logoutApi,
  forgotPassword: forgotPasswordApi,
  verifyForgotOtp: verifyForgotOtpApi,
  resetPassword: resetPasswordApi,
};

