import { apiSlice, createCrudEndpoints, createCrudApi } from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

export const seoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ...createCrudEndpoints(builder, {
      tag: "SEO",
      url: "/api/seo",
      singular: "seo",
      plural: "seos",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSeosQuery,
  useLazyGetSeosQuery,
  useGetSeoByIdQuery,
  useCreateSeoMutation,
  useUpdateSeoMutation,
  useDeleteSeoMutation,
  useBulkDeleteSeosMutation,
} = seoApi;

const crud = createCrudApi("/api/seo");
export const getSeoListApi = crud.getAll;
export const getSeoByIdApi = crud.getById;
export const createSeoApi = crud.create;
export const updateSeoApi = crud.update;
export const deleteSeoApi = crud.delete;
export const bulkDeleteSeoApi = crud.bulkDelete;

export default {
  getAll: getSeoListApi,
  getById: getSeoByIdApi,
  create: createSeoApi,
  update: updateSeoApi,
  delete: deleteSeoApi,
  bulkDelete: bulkDeleteSeoApi,
  seoApi,
};
