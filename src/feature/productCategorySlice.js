import { createEntitySlice, normalizeCreator } from "./sliceHelper.js";
import {
  getCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  bulkDeleteCategoriesApi,
  productCategoryApi,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
} from "../api/endpoints/productCategoryApi.js";

export {
  productCategoryApi,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useBulkDeleteCategoriesMutation,
};

export const normalizeCategory = (c) => {
  if (!c || typeof c !== "object") return c;
  const id = c.id || (c._id?.$oid ? c._id.$oid : c._id) || "";
  const categoryName = c.categoryName || c.name || "";
  const count = Number(c.count ?? c.productsCount ?? 0);
  const createdby = normalizeCreator(c.createdBy, c.createdby);

  return {
    ...c,
    _id: id,
    id,
    categoryName,
    name: categoryName,
    count,
    productsCount: count,
    badge: String(count),
    slug: c.slug || categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    categoryCode: c.categoryCode || id,
    icon: c.icon || "Folder",
    iconName: c.iconName || c.icon || "Folder",
    createdby,
    createdBy: createdby,
    isActive: Boolean(c.isActive ?? true),
    isDeleted: Boolean(c.isDeleted ?? false),
  };
};

const entity = createEntitySlice({
  name: "productCategories",
  itemKey: "categories",
  singular: "category",
  plural: "categories",
  api: {
    getAll: getCategoriesApi,
    getById: getCategoryByIdApi,
    create: createCategoryApi,
    update: updateCategoryApi,
    delete: deleteCategoryApi,
    bulkDelete: bulkDeleteCategoriesApi,
  },
  normalizer: normalizeCategory,
});

export const {
  fetchCategories,
  fetchCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  bulkDeleteCategories,
} = entity.thunks;

export const {
  clearCategoryError,
  setCurrentCategory,
  setCategoriesDirectly,
} = entity.actions;

// Selectors (support both state.productCategories and legacy state.categories)
export const selectCategories = (state) =>
  state.productCategories?.categories || state.categories?.categories || [];
export const selectCategoriesLoading = (state) =>
  Boolean(state.productCategories?.loading || state.categories?.loading);
export const selectCategoriesError = (state) =>
  state.productCategories?.error || state.categories?.error || null;
export const selectCategoriesTotal = (state) =>
  state.productCategories?.total || state.categories?.total || 0;
export const selectCategoriesPage = (state) =>
  state.productCategories?.page || state.categories?.page || 1;
export const selectCategoriesLimit = (state) =>
  state.productCategories?.limit || state.categories?.limit || 10;
export const selectCategoriesTotalPages = (state) =>
  state.productCategories?.totalPages || state.categories?.totalPages || 1;
export const selectCategoriesPagination = (state) =>
  state.productCategories?.pagination || state.categories?.pagination || null;
export const selectCurrentCategory = (state) =>
  state.productCategories?.currentItem || state.categories?.currentItem || null;

export const productCategorySlice = entity.slice;
export const useProductCategories = entity.useHook;
export const useCategories = entity.useHook;
export default entity.reducer;
