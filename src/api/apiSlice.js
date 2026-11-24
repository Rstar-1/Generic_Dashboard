import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "./server/axiosInstance.js";
import { handleRequest } from "./server/apiHandler.js";

/**
 * Custom Axios BaseQuery for RTK Query
 * Supports both `data` and `body`, automatic JWT injection,
 * params serialization, and file upload (FormData) headers.
 */
export const axiosBaseQuery =
  () =>
  async ({ url, method = "GET", data, body, params, headers }) => {
    try {
      const payload = data !== undefined ? data : body;
      const isFormData =
        typeof FormData !== "undefined" && payload instanceof FormData;

      const result = await axiosInstance({
        url,
        method,
        data: payload,
        params,
        headers: {
          ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
          ...headers,
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          status: axiosError.response?.status || 500,
          data:
            axiosError.response?.data ||
            axiosError.message ||
            "An unexpected error occurred",
        },
      };
    }
  };

/**
 * Generic RTK Query Tag Helpers
 */
export const providesList = (type) => (result) => {
  const list = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
    ? result.data
    : Array.isArray(result?.data?.data)
    ? result.data.data
    : [];
  return [
    ...list.map((item) => ({ type, id: item._id || item.id })),
    { type, id: "LIST" },
  ];
};

export const providesItem = (type) => (_result, _error, id) => [
  { type, id: typeof id === "object" ? id?.id || id?._id : id },
];

export const invalidatesList = (type) => [{ type, id: "LIST" }];

export const invalidatesItem = (type) => (_result, _error, arg) => [
  { type, id: typeof arg === "object" ? arg?.id || arg?._id : arg },
  { type, id: "LIST" },
];

/**
 * Generic CRUD Endpoints Generator for RTK Query
 * Generates standard get, getById, create, update, delete, bulkDelete endpoints
 */
export const createCrudEndpoints = (
  builder,
  { tag, url, singular = "Item", plural = "Items" }
) => {
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const getQueryName = `get${cap(plural)}`;
  const getByIdQueryName = `get${cap(singular)}ById`;
  const createMutationName = `create${cap(singular)}`;
  const updateMutationName = `update${cap(singular)}`;
  const deleteMutationName = `delete${cap(singular)}`;
  const bulkDeleteMutationName = `bulkDelete${cap(plural)}`;

  return {
    [getQueryName]: builder.query({
      query: (params = {}) => ({ url, method: "GET", params }),
      providesTags: providesList(tag),
    }),
    [getByIdQueryName]: builder.query({
      query: (id) => ({ url: `${url}/${id}`, method: "GET" }),
      providesTags: providesItem(tag),
    }),
    [createMutationName]: builder.mutation({
      query: (data) => ({ url, method: "POST", data }),
      invalidatesTags: invalidatesList(tag),
    }),
    [updateMutationName]: builder.mutation({
      query: ({ id, ...data }) => ({ url: `${url}/${id}`, method: "PUT", data }),
      invalidatesTags: invalidatesItem(tag),
    }),
    [deleteMutationName]: builder.mutation({
      query: (id) => ({ url: `${url}/${id}`, method: "DELETE" }),
      invalidatesTags: invalidatesItem(tag),
    }),
    [bulkDeleteMutationName]: builder.mutation({
      query: (data) => ({ url: `${url}/bulk-delete`, method: "POST", data }),
      invalidatesTags: invalidatesList(tag),
    }),
  };
};

/**
 * In-Flight Promise Cache for duplicate GET requests
 */
const inFlightGetMap = new Map();

/**
 * Generic Axios Promise API helper for Redux createAsyncThunk (with in-flight deduplication)
 */
export const createCrudApi = (url) => ({
  getAll: (params = {}) => {
    const key = `GET:${url}:${JSON.stringify(params || {})}`;
    if (inFlightGetMap.has(key)) {
      return inFlightGetMap.get(key);
    }
    const promise = handleRequest(() => axiosInstance.get(url, { params })).finally(() => {
      inFlightGetMap.delete(key);
    });
    inFlightGetMap.set(key, promise);
    return promise;
  },
  getById: (id) => {
    const key = `GET:${url}/${id}`;
    if (inFlightGetMap.has(key)) {
      return inFlightGetMap.get(key);
    }
    const promise = handleRequest(() => axiosInstance.get(`${url}/${id}`)).finally(() => {
      inFlightGetMap.delete(key);
    });
    inFlightGetMap.set(key, promise);
    return promise;
  },
  create: (data) =>
    handleRequest(() => {
      const isForm = typeof FormData !== "undefined" && data instanceof FormData;
      return axiosInstance.post(
        url,
        data,
        isForm ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
      );
    }),
  update: (id, data) =>
    handleRequest(() => {
      const isForm = typeof FormData !== "undefined" && data instanceof FormData;
      return axiosInstance.put(
        `${url}/${id}`,
        data,
        isForm ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
      );
    }),
  delete: (id) =>
    handleRequest(() => axiosInstance.delete(`${url}/${id}`)),
  bulkDelete: (data) =>
    handleRequest(() => axiosInstance.post(`${url}/bulk-delete`, data)),
});

/**
 * Base RTK Query API Slice
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Product",
    "ProductCategory",
    "Blog",
    "BlogCategory",
    "Role",
    "User",
    "Auth",
    "Lead",
    "Campaign",
    "Order",
    "SEO",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
