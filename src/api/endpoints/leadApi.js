import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

/**
 * ⚡ RTK Query Endpoints for Leads
 */
export const leadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getLeads, getLeadById, createLead, updateLead, deleteLead, bulkDeleteLeads)
    ...createCrudEndpoints(builder, {
      tag: "Lead",
      url: "/api/leads",
      singular: "lead",
      plural: "leads",
    }),

    // Custom patch endpoints
    updateLeadSeverity: builder.mutation({
      query: ({ id, severity }) => ({
        url: `/api/leads/${id}/severity`,
        method: "PATCH",
        data: { severity: String(severity).toLowerCase().trim() },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Lead", id },
        { type: "Lead", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLeadsQuery,
  useLazyGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useBulkDeleteLeadsMutation,
  useUpdateLeadSeverityMutation,
} = leadApi;

// Generic Axios CRUD API helper
const crud = createCrudApi("/api/leads");
export const getLeadsApi = crud.getAll;
export const getLeadByIdApi = crud.getById;
export const createLeadApi = crud.create;
export const updateLeadApi = crud.update;
export const deleteLeadApi = crud.delete;
export const bulkDeleteLeadsApi = crud.bulkDelete;

export const updateLeadSeverityApi = (id, severity) =>
  handleRequest(() =>
    axiosInstance.patch(`/api/leads/${id}/severity`, {
      severity: String(severity).toLowerCase().trim(),
    })
  );

export default {
  getLeads: getLeadsApi,
  getLeadById: getLeadByIdApi,
  createLead: createLeadApi,
  updateLead: updateLeadApi,
  deleteLead: deleteLeadApi,
  bulkDeleteLeads: bulkDeleteLeadsApi,
  updateLeadSeverity: updateLeadSeverityApi,
  leadApi,
};
