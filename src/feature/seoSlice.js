import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator, normalizeVendor } from "./sliceHelper.js";
import {
  getSeoListApi,
  getSeoByIdApi,
  createSeoApi,
  updateSeoApi,
  deleteSeoApi,
  bulkDeleteSeoApi,
  seoApi,
  useGetSeosQuery,
  useLazyGetSeosQuery,
  useGetSeoByIdQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useBulkDeleteSeosMutation,
} from "../api/endpoints/seoApi.js";

export {
  seoApi,
  useGetSeosQuery,
  useLazyGetSeosQuery,
  useGetSeoByIdQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useBulkDeleteSeosMutation,
};

export const normalizeSeo = (s) => {
  if (!s || typeof s !== "object") return s;
  const id = s.id || (s._id?.$oid ? s._id.$oid : s._id) || "";
  const pageName = s.page || s.name || s.pageName || "Page";
  const pageTitle = s.pageTitle || s.title || pageName;
  const createdby = normalizeCreator(s.createdBy, s.createdby);
  const vendorBy = normalizeVendor(s.vendorBy, s.VendorBy);

  const breadcrumbsArr = Array.isArray(s.breadcrumbs)
    ? s.breadcrumbs
    : typeof s.breadcrumbs === "string"
    ? (() => {
        try {
          return JSON.parse(s.breadcrumbs);
        } catch {
          return [];
        }
      })()
    : [];

  const breadcrumbsText =
    s.breadcrumbsText ||
    (breadcrumbsArr.length > 0
      ? breadcrumbsArr.map((b) => b?.label || b).join(" > ")
      : pageName);

  const firstKeyword =
    typeof s.keywords === "string"
      ? s.keywords.split(",")[0]?.trim()
      : Array.isArray(s.keywords)
      ? s.keywords[0]
      : "";
  const targetKeyword = s.targetKeyword || firstKeyword || "SEO";

  const path = s.path || "/";
  const canonical =
    s.canonical ||
    (path.startsWith("http")
      ? path
      : `https://ashmitavinyls.com${path.startsWith("/") ? "" : "/"}${path}`);

  const seoScore = s.seoScore || s.score || "92 / 100";
  const status =
    s.status ||
    (s.noindex ? "NoIndex" : s.isActive !== false ? "Indexed" : "Inactive");
  const lastCrawled = s.lastCrawled || s.updatedAt || s.createdAt || "2026-08-12";

  return {
    ...s,
    _id: id,
    id,
    pageName,
    name: s.name || pageName,
    page: s.page || pageName,
    path,
    pageTitle,
    title: pageTitle,
    createdby,
    createdBy: createdby,
    vendorBy,
    VendorBy: vendorBy,
    creatorName: createdby.fullname || createdby.name || "Admin",
    createdByName: createdby.fullname || createdby.name || "Admin",
    breadcrumbs: breadcrumbsArr,
    breadcrumbsText,
    targetKeyword,
    canonical,
    seoScore,
    status,
    lastCrawled,
    isActive: Boolean(s.isActive ?? true),
    isDeleted: Boolean(s.isDeleted ?? false),
  };
};

const entity = createEntitySlice({
  name: "seos",
  itemKey: "seos",
  singular: "seo",
  plural: "seos",
  api: {
    getAll: getSeoListApi,
    getById: getSeoByIdApi,
    create: createSeoApi,
    update: updateSeoApi,
    delete: deleteSeoApi,
    bulkDelete: bulkDeleteSeoApi,
  },
  normalizer: normalizeSeo,
});

export const {
  fetchSeos: getSeoList,
  fetchSeoById: getSeoById,
  createSeo,
  updateSeo,
  deleteSeo,
  bulkDeleteSeos: bulkDeleteSeo,
} = entity.thunks;

export const {
  clearSeoError,
  setCurrentSeo,
  setSeosDirectly,
} = entity.actions;

export const {
  selectSeos,
  selectSeosLoading,
  selectSeosError,
  selectSeosTotal,
  selectSeosPage,
  selectSeosLimit,
  selectSeosTotalPages,
  selectSeosPagination,
  selectCurrentSeo,
} = entity.selectors;

export const seoSlice = entity.slice;
export const useSeo = entity.useHook;
export default entity.reducer;
