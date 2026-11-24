import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

/**
 * ⚡ RTK Query Endpoints for Users
 */
export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getUsers, getUserById, updateUser, deleteUser, bulkDeleteUsers)
    ...createCrudEndpoints(builder, {
      tag: "User",
      url: "/api/users",
      singular: "user",
      plural: "users",
    }),

    // Custom Profile query & mutation
    getUserProfile: builder.query({
      query: () => ({ url: "/api/users/profile", method: "GET" }),
      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({ url: "/api/users/profile", method: "PUT", data }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
} = userApi;

// Classic Axios API
const crud = createCrudApi("/api/users");
export const getUsersApi = crud.getAll;
export const getUserByIdApi = crud.getById;
export const updateUserApi = crud.update;
export const deleteUserApi = crud.delete;
export const bulkDeleteUsersApi = crud.bulkDelete;

export const getUserProfileApi = () =>
  handleRequest(() => axiosInstance.get("/api/users/profile"));

export const updateProfileApi = (data) =>
  handleRequest(() => {
    const isForm = typeof FormData !== "undefined" && data instanceof FormData;
    return axiosInstance.put(
      "/api/users/profile",
      data,
      isForm ? { headers: { "Content-Type": "multipart/form-data" } } : undefined
    );
  });

export default {
  getUsers: getUsersApi,
  getUserById: getUserByIdApi,
  getUserProfile: getUserProfileApi,
  updateProfile: updateProfileApi,
  updateUser: updateUserApi,
  deleteUser: deleteUserApi,
  bulkDeleteUsers: bulkDeleteUsersApi,
  userApi,
};
