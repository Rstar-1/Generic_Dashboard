import { createEntitySlice } from "./sliceHelper.js";
import {
  getUsersApi,
  getUserByIdApi,
  updateUserApi,
  deleteUserApi,
  bulkDeleteUsersApi,
  userApi,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserProfileQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
} from "../api/endpoints/userApi.js";

export {
  userApi,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetUserProfileQuery,
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
};

export const normalizeUser = (u) => {
  if (!u || typeof u !== "object") return u;
  const roleName = u.roleId?.rolename || u.role || "customer";
  const id = u.id || (u._id?.$oid ? u._id.$oid : u._id) || "";
  const name = u.fullname || u.name || "User";
  const normalizedImg = u.image || u.avatar || "";

  // Cache user for cross-referencing creator columns across overview & category pages
  try {
    const raw = typeof window !== "undefined" && localStorage.getItem("cachedUsers");
    const list = raw ? JSON.parse(raw) : [];
    const uId = u._id || id;
    const idx = list.findIndex((x) => x._id === uId || x.id === id);
    const minUser = {
      _id: uId,
      id,
      fullname: name,
      name,
      mobile: u.mobile || "",
      email: u.email || "",
      role: String(roleName).toLowerCase(),
      image: normalizedImg,
      avatar: normalizedImg,
    };
    if (idx >= 0) list[idx] = { ...list[idx], ...minUser };
    else list.push(minUser);
    localStorage.setItem("cachedUsers", JSON.stringify(list));
  } catch {}

  return {
    ...u,
    _id: u._id || id,
    id,
    fullname: name,
    name,
    email: u.email || "",
    mobile: u.mobile || "",
    role: String(roleName).toLowerCase(),
    rolename: roleName,
    roleId: u.roleId?._id || u.roleId || null,
    roleObj: typeof u.roleId === "object" ? u.roleId : null,
    image: normalizedImg,
    avatar: normalizedImg,
    address: Array.isArray(u.address) ? u.address : [],
    loginAttempts: u.loginAttempts !== undefined && u.loginAttempts !== null ? Number(u.loginAttempts) : 0,
    isOtpVerified: Boolean(u.isOtpVerified),
    isActive: u.isActive !== undefined ? Boolean(u.isActive) : true,
    status: u.isActive ? "Active" : "Inactive",
    isDeleted: Boolean(u.isDeleted),
    lastLogin: u.lastLogin || null,
    lastActive: u.lastLogin
      ? new Date(u.lastLogin).toLocaleDateString()
      : "Just now",
    createdAt: u.createdAt || new Date().toISOString(),
    updatedAt: u.updatedAt || new Date().toISOString(),
  };
};

const entity = createEntitySlice({
  name: "users",
  itemKey: "users",
  singular: "user",
  plural: "users",
  api: {
    getAll: getUsersApi,
    getById: getUserByIdApi,
    update: updateUserApi,
    delete: deleteUserApi,
    bulkDelete: bulkDeleteUsersApi,
  },
  normalizer: normalizeUser,
});

export const {
  fetchUsers,
  fetchUserById,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
} = entity.thunks;

export const {
  clearUserError,
  setCurrentUser: setCurrentUserItem,
  setUsersDirectly,
} = entity.actions;

export const {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectUsersTotal,
  selectUsersPage,
  selectUsersLimit,
  selectUsersTotalPages,
  selectUsersPagination,
  selectCurrentUser: selectCurrentUserItem,
} = entity.selectors;

export const userSlice = entity.slice;
export const useUsers = entity.useHook;
export default entity.reducer;
