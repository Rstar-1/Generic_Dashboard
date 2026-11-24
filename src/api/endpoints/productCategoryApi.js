import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";

/**
 * ⚡ RTK Query Endpoints for Product Categories
 */
export const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getCategories, getCategoryById, createCategory, updateCategory, deleteCategory, bulkDeleteCategories)
    ...createCrudEndpoints(builder, {
      tag: "ProductCategory",
      url: "/api/categories",
      singular: "category",
      plural: "categories",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
} = productCategoryApi;

// Classic Axios API
const crud = createCrudApi("/api/categories");
export const getCategoriesApi = crud.getAll;
export const getCategoryByIdApi = crud.getById;
export const createCategoryApi = crud.create;
export const updateCategoryApi = crud.update;
export const deleteCategoryApi = crud.delete;
export const bulkDeleteCategoriesApi = crud.bulkDelete;

export default {
  getCategories: getCategoriesApi,
  getCategoryById: getCategoryByIdApi,
  createCategory: createCategoryApi,
  updateCategory: updateCategoryApi,
  deleteCategory: deleteCategoryApi,
  bulkDeleteCategories: bulkDeleteCategoriesApi,
  productCategoryApi,
};
