import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";

/**
 * ⚡ RTK Query Endpoints for Roles
 */
export const roleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getRoles, getRoleById, createRole, updateRole, deleteRole, bulkDeleteRoles)
    ...createCrudEndpoints(builder, {
      tag: "Role",
      url: "/api/roles",
      singular: "role",
      plural: "roles",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useBulkDeleteRolesMutation,
} = roleApi;

// Classic Axios API
const crud = createCrudApi("/api/roles");
export const getRolesApi = crud.getAll;
export const getRoleByIdApi = crud.getById;
export const createRoleApi = crud.create;
export const updateRoleApi = crud.update;
export const deleteRoleApi = crud.delete;
export const bulkDeleteRolesApi = crud.bulkDelete;

export default {
  getRoles: getRolesApi,
  getRoleById: getRoleByIdApi,
  createRole: createRoleApi,
  updateRole: updateRoleApi,
  deleteRole: deleteRoleApi,
  bulkDeleteRoles: bulkDeleteRolesApi,
  roleApi,
};
