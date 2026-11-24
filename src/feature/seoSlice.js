import { createEntitySlice, normalizeCreator } from "./sliceHelper.js";
import {
  getSeoListApi,
  getSeoByIdApi,
  createSeoApi,
  updateSeoApi,
  deleteSeoApi,
  bulkDeleteSeoApi,
  seedSeoApi,
  seoApi,
  useGetSeosQuery,
  useLazyGetSeosQuery,
  useGetSeoByIdQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useBulkDeleteSeosMutation,
  useSeedSeoMutation,
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
  useSeedSeoMutation,
};

export const normalizeSeo = (s) => {
  if (!s || typeof s !== "object") return s;
  const id = s.id || (s._id?.$oid ? s._id.$oid : s._id) || "";
  const pageTitle = s.pageTitle || s.title || "";
  const createdby = normalizeCreator(s.createdBy, s.createdby);

  return {
    ...s,
    _id: id,
    id,
    pageTitle,
    title: pageTitle,
    createdby,
    createdBy: createdby,
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
  customHookMethods: {
    seedInitialSeo: (dispatch) => () => dispatch(entity.thunks.fetchSeos()),
  },
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
