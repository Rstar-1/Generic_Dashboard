import {
  apiSlice,
  createCrudEndpoints,
  createCrudApi,
} from "../apiSlice.js";
import axiosInstance from "../server/axiosInstance.js";
import { handleRequest } from "../server/apiHandler.js";

/**
 * ⚡ RTK Query Endpoints for Products
 */
export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Standard CRUD (getProducts, getProductById, createProduct, updateProduct, deleteProduct, bulkDeleteProducts)
    ...createCrudEndpoints(builder, {
      tag: "Product",
      url: "/api/products",
      singular: "product",
      plural: "products",
    }),

    // Custom review endpoints
    addProductReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/products/${id}/reviews`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    deleteProductReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `/api/products/${productId}/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBulkDeleteProductsMutation,
  useAddProductReviewMutation,
  useDeleteProductReviewMutation,
} = productApi;

// Classic Axios API
const crud = createCrudApi("/api/products");
export const getProductsApi = crud.getAll;
export const getProductByIdApi = crud.getById;
export const createProductApi = crud.create;
export const updateProductApi = crud.update;
export const deleteProductApi = crud.delete;
export const bulkDeleteProductsApi = crud.bulkDelete;

export const addProductReviewApi = (id, data) =>
  handleRequest(() => axiosInstance.post(`/api/products/${id}/reviews`, data));

export const deleteProductReviewApi = (productId, reviewId) =>
  handleRequest(() =>
    axiosInstance.delete(`/api/products/${productId}/reviews/${reviewId}`)
  );

export default {
  getProducts: getProductsApi,
  getProductById: getProductByIdApi,
  createProduct: createProductApi,
  updateProduct: updateProductApi,
  deleteProduct: deleteProductApi,
  bulkDeleteProducts: bulkDeleteProductsApi,
  addProductReview: addProductReviewApi,
  deleteProductReview: deleteProductReviewApi,
  productApi,
};
