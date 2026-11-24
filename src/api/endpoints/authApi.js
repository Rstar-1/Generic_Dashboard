import { apiSlice } from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

/**
 * ⚡ RTK Query Endpoints for Authentication
 */
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({ url: "/api/auth/login", method: "POST", data: credentials }),
      invalidatesTags: ["Auth", "User"],
    }),
    register: builder.mutation({
      query: (data) => ({ url: "/api/auth/register", method: "POST", data }),
      invalidatesTags: ["Auth", "User"],
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({ url: "/api/auth/verify-otp", method: "POST", data }),
      invalidatesTags: ["Auth", "User"],
    }),
    logout: builder.mutation({
      query: () => ({ url: "/api/auth/logout", method: "POST" }),
      invalidatesTags: ["Auth", "User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({ url: "/api/auth/forgot-password", method: "POST", data }),
    }),
    verifyForgotOtp: builder.mutation({
      query: (data) => ({ url: "/api/auth/verify-forgot-otp", method: "POST", data }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({ url: "/api/auth/reset-password", method: "POST", data }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyForgotOtpMutation,
  useResetPasswordMutation,
} = authApi;

// Classic Axios API
export const registerApi = (data) =>
  handleRequest(() => {
    const isForm = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.post("/api/auth/register", data, isForm ? { headers: { "Content-Type": "multipart/form-data" } } : undefined);
  });

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
  authApi,
};
