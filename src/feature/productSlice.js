import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEntitySlice, normalizeCreator, normalizeVendor } from "./sliceHelper.js";
import {
  getProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  bulkDeleteProductsApi,
  addProductReviewApi,
  deleteProductReviewApi,
  productApi,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBulkDeleteProductsMutation,
  useAddProductReviewMutation,
  useDeleteProductReviewMutation,
} from "../api/endpoints/productApi.js";

export {
  productApi,
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useBulkDeleteProductsMutation,
  useAddProductReviewMutation,
  useDeleteProductReviewMutation,
};

export const normalizeProduct = (p) => {
  if (!p || typeof p !== "object") return p;
  const id = p.id || (p._id?.$oid ? p._id.$oid : p._id) || "";
  const productName = p.productName || p.title || p.name || "";
  const categoryObj =
    typeof p.categoryId === "object" && p.categoryId !== null ? p.categoryId : {};
  let categoryName =
    categoryObj.categoryName ||
    categoryObj.name ||
    (typeof p.category === "string" && !p.category.match(/^[0-9a-fA-F]{24}$/)
      ? p.category
      : "");

  if (!categoryName) {
    const rawCatId = String(p.categoryId?._id || p.categoryId || "");
    if (rawCatId) {
      try {
        const rawCached = localStorage.getItem("cachedProductCategories");
        if (rawCached) {
          const list = JSON.parse(rawCached);
          const found = list.find((c) => String(c._id) === rawCatId || String(c.id) === rawCatId);
          if (found) categoryName = found.categoryName || found.name || "";
        }
      } catch {}
    }
  }

  if (!categoryName) {
    categoryName = typeof p.category === "string" && !p.category.match(/^[0-9a-fA-F]{24}$/)
      ? p.category
      : (typeof p.categoryId === "string" && !p.categoryId.match(/^[0-9a-fA-F]{24}$/)
      ? p.categoryId
      : "General");
  }

  const createdby = normalizeCreator(p.createdBy, p.createdby);
  const vendorBy = normalizeVendor(p.vendorBy, p.VendorBy);

  const mainImage = Array.isArray(p.image)
    ? (p.image[0] || "")
    : (typeof p.image === "string" ? p.image : "");
  const gallery = Array.isArray(p.images)
    ? p.images
    : Array.isArray(p.image)
    ? p.image
    : (p.image ? [p.image] : []);
  const resolvedImage = mainImage || (gallery[0] || "");

  return {
    ...p,
    _id: id,
    id,
    productName,
    title: productName,
    name: productName,
    categoryId: categoryObj._id || p.categoryId || "",
    category: categoryName,
    categoryName,
    description: p.description || "",
    specification: p.specification || "",
    price: Number(p.price || 0),
    mrp: Number(p.mrp || 0),
    stock: Number(p.totalStock ?? p.stock ?? 0),
    totalStock: Number(p.totalStock ?? p.stock ?? 0),
    sku: p.sku || "",
    image: resolvedImage,
    images: gallery,
    ratings: Number(p.ratings || p.rating || 0),
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    tags: Array.isArray(p.tags) ? p.tags : [],
    createdby,
    createdBy: createdby,
    vendorBy,
    VendorBy: vendorBy,
    isActive: p.isActive !== undefined ? Boolean(p.isActive) : true,
    status: p.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(p.isDeleted),
    createdAt: p.createdAt?.$date || p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt?.$date || p.updatedAt || new Date().toISOString(),
  };
};

export const addProductReview = createAsyncThunk(
  "products/addProductReview",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await addProductReviewApi(id, data);
      return { id, product: normalizeProduct(res?.data !== undefined ? res.data : res) };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to add review");
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProductReview",
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      const res = await deleteProductReviewApi(productId, reviewId);
      return {
        productId,
        reviewId,
        product: normalizeProduct(res?.data !== undefined ? res.data : res),
      };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete review");
    }
  }
);

const entity = createEntitySlice({
  name: "products",
  itemKey: "products",
  singular: "product",
  plural: "products",
  api: {
    getAll: getProductsApi,
    getById: getProductByIdApi,
    create: createProductApi,
    update: updateProductApi,
    delete: deleteProductApi,
    bulkDelete: bulkDeleteProductsApi,
  },
  normalizer: normalizeProduct,
  extraReducers: (builder) => {
    builder
      .addCase(addProductReview.fulfilled, (state, action) => {
        const { id, product } = action.payload;
        const idx = state.products.findIndex((p) => p.id === id || p._id === id);
        if (idx !== -1) state.products[idx] = product;
        if (state.currentItem && (state.currentItem.id === id || state.currentItem._id === id)) {
          state.currentItem = product;
        }
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        const { productId, product } = action.payload;
        const idx = state.products.findIndex((p) => p.id === productId || p._id === productId);
        if (idx !== -1) state.products[idx] = product;
        if (state.currentItem && (state.currentItem.id === productId || state.currentItem._id === productId)) {
          state.currentItem = product;
        }
      });
  },
  customHookMethods: {
    addReview: (dispatch) => (id, data) => dispatch(addProductReview({ id, data })),
    removeReview: (dispatch) => (productId, reviewId) => dispatch(deleteProductReview({ productId, reviewId })),
    deleteReview: (dispatch) => (productId, reviewId) => dispatch(deleteProductReview({ productId, reviewId })),
  },
});

export const {
  fetchProducts,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
} = entity.thunks;

export const {
  clearProductError,
  setCurrentProduct,
  setProductsDirectly,
} = entity.actions;

export const {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectProductsTotal,
  selectProductsPage,
  selectProductsLimit,
  selectProductsTotalPages,
  selectProductsPagination,
  selectCurrentProduct,
} = entity.selectors;

export const productSlice = entity.slice;
export const useProducts = entity.useHook;
export default entity.reducer;
