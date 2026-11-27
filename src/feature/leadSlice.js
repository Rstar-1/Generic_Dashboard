import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator, normalizeVendor } from "./sliceHelper.js";
import {
  getLeadsApi,
  getLeadByIdApi,
  createLeadApi,
  updateLeadApi,
  deleteLeadApi,
  bulkDeleteLeadsApi,
  updateLeadSeverityApi,
  leadApi,
  useGetLeadsQuery,
  useLazyGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useBulkDeleteLeadsMutation,
  useUpdateLeadSeverityMutation,
} from "../api/endpoints/leadApi.js";

export {
  leadApi,
  useGetLeadsQuery,
  useLazyGetLeadsQuery,
  useGetLeadByIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
  useBulkDeleteLeadsMutation,
  useUpdateLeadSeverityMutation,
};

/**
 * Normalizes lead document to standard dashboard schema
 */
export const normalizeLead = (l) => {
  if (!l || typeof l !== "object") return l;
  const id = l.id || (l._id?.$oid ? l._id.$oid : l._id) || "";
  const createdby = normalizeCreator(l.createdBy, l.createdby);
  const vendorBy = normalizeVendor(l.vendorBy, l.VendorBy);

  const rawCat = l.category ? String(l.category).toLowerCase().trim() : "enquiry";
  const category = rawCat;
  const categoryLabel = category === "product" ? "Product" : category === "manual" ? "Manual" : "Enquiry";

  const isProduct = category === "product";
  const rawSev = String(l.severity || "").toLowerCase().trim();
  const severity = isProduct ? "-" : (["high", "medium", "low"].includes(rawSev) ? rawSev : "low");
  const severityLabel = isProduct ? "-" : (severity === "high" ? "High" : severity === "medium" ? "Medium" : "Low");

  const productsList = Array.isArray(l.products) ? l.products : l.products ? [l.products] : [];
  const productNames = productsList
    .map((p) => (typeof p === "object" && p !== null ? (p.productName || p.name || p.id) : String(p)))
    .filter(Boolean)
    .join(", ");

  const name = isProduct
    ? (l.name && l.name !== "Product Lead" ? l.name : (productNames || "Product Lead"))
    : (l.name || "-");

  const quantity = isProduct
    ? (l.quantity !== undefined && l.quantity !== null && l.quantity !== "" ? Number(l.quantity) : 1)
    : "-";

  return {
    ...l,
    _id: id,
    id,
    name,
    productNames: productNames || (isProduct ? "Product" : "-"),
    quantity,
    mobile: l.mobile || "-",
    phone: l.mobile || l.phone || "-",
    email: l.email || "-",
    location: l.location || "-",
    description: l.description || l.notes || "-",
    severity,
    severityLabel,
    category,
    categoryLabel,
    products: productsList,
    isActive: l.isActive !== undefined ? Boolean(l.isActive) : true,
    status: l.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(l.isDeleted),
    createdby,
    createdBy: createdby,
    vendorBy,
    VendorBy: vendorBy,
    createdAt: l.createdAt?.$date || l.createdAt || new Date().toISOString(),
    updatedAt: l.updatedAt?.$date || l.updatedAt || new Date().toISOString(),
  };
};

export const updateLeadSeverityThunk = createAsyncThunk(
  "leads/updateLeadSeverity",
  async ({ id, severity }, { rejectWithValue }) => {
    try {
      const res = await updateLeadSeverityApi(id, severity);
      return { id, severity, data: res?.data !== undefined ? res.data : res };
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to update lead severity");
    }
  }
);

const entity = createEntitySlice({
  name: "leads",
  itemKey: "leads",
  singular: "lead",
  plural: "leads",
  api: {
    getAll: getLeadsApi,
    getById: getLeadByIdApi,
    create: createLeadApi,
    update: updateLeadApi,
    delete: deleteLeadApi,
    bulkDelete: bulkDeleteLeadsApi,
  },
  normalizer: normalizeLead,
  extraReducers: (builder) => {
    builder.addCase(updateLeadSeverityThunk.fulfilled, (state, action) => {
      const { id, severity } = action.payload;
      const target = state.leads.find((l) => l.id === id || l._id === id);
      if (target) {
        target.severity = severity;
        target.severityLabel =
          severity === "high" ? "High" : severity === "medium" ? "Medium" : "Low";
      }
      if (
        state.currentItem &&
        (state.currentItem.id === id || state.currentItem._id === id)
      ) {
        state.currentItem.severity = severity;
      }
    });
  },
  customHookMethods: {
    updateSeverity: (dispatch) => (id, severity) =>
      dispatch(updateLeadSeverityThunk({ id, severity })),
  },
});

export const {
  fetchLeads: getLeads,
  fetchLeadById: getLeadById,
  createLead: addLead,
  updateLead: editLead,
  deleteLead: removeLead,
  bulkDeleteLeads: bulkRemoveLeads,
} = entity.thunks;

export const {
  clearLeadError,
  setCurrentLead,
  setLeadsDirectly,
} = entity.actions;

export const {
  selectLeads,
  selectLeadsLoading,
  selectLeadsError,
  selectLeadsTotal,
  selectLeadsPage,
  selectLeadsLimit,
  selectLeadsTotalPages,
  selectLeadsPagination,
  selectCurrentLead,
} = entity.selectors;

export const leadSlice = entity.slice;
export const useLeads = entity.useHook;
export default entity.reducer;
