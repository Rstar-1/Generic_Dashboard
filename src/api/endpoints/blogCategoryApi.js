import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";

/**
 * ⚡ RTK Query Endpoints for Blog Categories
 */
export const blogCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getBlogCategories, getBlogCategoryById, createBlogCategory, updateBlogCategory, deleteBlogCategory, bulkDeleteBlogCategories)
    ...createCrudEndpoints(builder, {
      tag: "BlogCategory",
      url: "/api/blog-categories",
      singular: "blogCategory",
      plural: "blogCategories",
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBlogCategoriesQuery,
  useLazyGetBlogCategoriesQuery,
  useGetBlogCategoryByIdQuery,
  useCreateBlogCategoryMutation,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
  useBulkDeleteBlogCategoriesMutation,
} = blogCategoryApi;

// Classic Axios API
const crud = createCrudApi("/api/blog-categories");
export const getBlogCategoriesApi = crud.getAll;
export const getBlogCategoryByIdApi = crud.getById;
export const createBlogCategoryApi = crud.create;
export const updateBlogCategoryApi = crud.update;
export const deleteBlogCategoryApi = crud.delete;
export const bulkDeleteBlogCategoriesApi = crud.bulkDelete;

export default {
  getBlogCategories: getBlogCategoriesApi,
  getBlogCategoryById: getBlogCategoryByIdApi,
  createBlogCategory: createBlogCategoryApi,
  updateBlogCategory: updateBlogCategoryApi,
  deleteBlogCategory: deleteBlogCategoryApi,
  bulkDeleteBlogCategories: bulkDeleteBlogCategoriesApi,
  blogCategoryApi,
};
