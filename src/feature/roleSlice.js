import { createEntitySlice } from "./sliceHelper.js";
import {
  getRolesApi,
  getRoleByIdApi,
  createRoleApi,
  updateRoleApi,
  deleteRoleApi,
  bulkDeleteRolesApi,
  roleApi,
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useBulkDeleteRolesMutation,
} from "../api/endpoints/roleApi.js";

export {
  roleApi,
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useBulkDeleteRolesMutation,
};

export const normalizeRole = (r) => {
  if (!r || typeof r !== "object") return r;
  const rolename = r.rolename || r.name || r.role || "";
  const id = r.id || (r._id?.$oid ? r._id.$oid : r._id) || "";
  return {
    ...r,
    _id: r._id || id,
    id,
    rolename,
    name: rolename,
    role: rolename.toLowerCase(),
    permissions: Array.isArray(r.permissions) ? r.permissions : [],
    pages: Array.isArray(r.pages) ? r.pages : [],
    count: r.count ?? 0,
    usersassigned: r.count ?? r.usersassigned ?? r.usersCount ?? 0,
    isActive: r.isActive !== undefined ? Boolean(r.isActive) : true,
    isDeleted: Boolean(r.isDeleted),
    createdAt: r.createdAt?.$date || r.createdAt || new Date().toISOString(),
    updatedAt: r.updatedAt?.$date || r.updatedAt || new Date().toISOString(),
  };
};

const entity = createEntitySlice({
  name: "roles",
  itemKey: "roles",
  singular: "role",
  plural: "roles",
  api: {
    getAll: getRolesApi,
    getById: getRoleByIdApi,
    create: createRoleApi,
    update: updateRoleApi,
    delete: deleteRoleApi,
    bulkDelete: bulkDeleteRolesApi,
  },
  normalizer: normalizeRole,
});

export const {
  fetchRoles,
  fetchRoleById,
  createRole,
  updateRole,
  deleteRole,
  bulkDeleteRoles,
} = entity.thunks;

export const {
  clearRoleError,
  setCurrentRole,
  setRolesDirectly,
} = entity.actions;

export const {
  selectRoles,
  selectRolesLoading,
  selectRolesError,
  selectRolesTotal,
  selectRolesPage,
  selectRolesLimit,
  selectRolesTotalPages,
  selectRolesPagination,
  selectCurrentRole,
} = entity.selectors;

export const roleSlice = entity.slice;
export const useRoles = entity.useHook;
export default entity.reducer;
