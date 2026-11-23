import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsApi,
  getProductByIdApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  bulkDeleteProductsApi,
  addProductReviewApi,
  deleteProductReviewApi,
} from "../api/productApi.js";

export const normalizeProduct = (p) => {
  if (!p || typeof p !== "object") return p;
  const id = p.id || (p._id?.$oid ? p._id.$oid : p._id) || "";
  const productName = p.productName || p.title || p.name || "";
  const categoryObj =
    typeof p.categoryId === "object" && p.categoryId !== null ? p.categoryId : {};
  const categoryName =
    categoryObj.categoryName ||
    categoryObj.name ||
    (typeof p.category === "string"
      ? p.category
      : typeof p.categoryId === "string"
      ? p.categoryId
      : "General");

  const createdByObj =
    typeof p.createdBy === "object" && p.createdBy !== null ? p.createdBy : {};
  const creatorName =
    createdByObj.fullname ||
    createdByObj.name ||
    (typeof p.createdby === "string" ? p.createdby : "") ||
    (typeof p.createdBy === "string" && !p.createdBy.match(/^[0-9a-fA-F]{24}$/)
      ? p.createdBy
      : "") ||
    "Admin";

  const creatorMobile =
    createdByObj.mobile ||
    createdByObj.phone ||
    createdByObj.email ||
    "";
  const creatorAvatar = createdByObj.image || createdByObj.avatar || "";

  const createdbyData = {
    fullname: creatorName,
    name: creatorName,
    mobile: creatorMobile || createdByObj.email || "—",
    phone: creatorMobile || createdByObj.email || "—",
    email: createdByObj.email || "",
    avatar: creatorAvatar,
    image: creatorAvatar,
    toString() {
      return creatorName;
    },
    valueOf() {
      return creatorName;
    },
  };

  const priceVal = Number(p.price ?? 0);
  const currencySymbol =
    p.currency === "USD"
      ? "$"
      : p.currency === "INR" || !p.currency
      ? "₹"
      : p.currency;
  const priceFormatted = `${currencySymbol}${priceVal.toLocaleString("en-IN")}`;
  const totalStock = Number(p.totalStock ?? p.stock ?? 0);

  let avgRating = 4.5;
  if (Array.isArray(p.reviews) && p.reviews.length > 0) {
    const sum = p.reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    avgRating = Number((sum / p.reviews.length).toFixed(1));
  } else if (p.rating !== undefined) {
    avgRating = Number(p.rating) || 4.5;
  }

  return {
    ...p,
    _id: p._id || id,
    id,
    productName,
    name: productName,
    title: productName,
    sku: p.sku || id || `SKU-${String(id).slice(-4).toUpperCase()}`,
    category: categoryName,
    categoryId: categoryObj._id || p.categoryId,
    categoryName,
    price: priceFormatted,
    rawPrice: priceVal,
    priceFormatted,
    currency: p.currency || "INR",
    unit: p.unit || "Pcs",
    totalStock,
    stock: totalStock,
    inStock: Boolean(p.stockStatus !== undefined ? p.stockStatus : totalStock > 0),
    stockStatus: Boolean(p.stockStatus !== undefined ? p.stockStatus : totalStock > 0),
    status:
      p.stockStatus !== false && totalStock > 0 ? "In Stock" : "Out of Stock",
    rating: avgRating,
    image: p.image || (Array.isArray(p.images) && p.images[0]) || "",
    images: Array.isArray(p.images) ? p.images : [],
    badges: Array.isArray(p.badges) ? p.badges : [],
    specifications: Array.isArray(p.specifications) ? p.specifications : [],
    reviews: Array.isArray(p.reviews) ? p.reviews : [],
    isTrending: Boolean(p.isTrending),
    severity: p.severity || "pending",
    createdBy: createdByObj._id ? createdByObj : p.createdBy,
    createdby: createdbyData,
    creatorName,
    createdByName: creatorName,
    creatorMobile,
    creatorAvatar,
    isActive: p.isActive !== undefined ? Boolean(p.isActive) : true,
    status: p.isActive === false ? "Inactive" : "Active",
    isDeleted: Boolean(p.isDeleted),
    createdAt: p.createdAt?.$date || p.createdAt || new Date().toISOString(),
    updatedAt: p.updatedAt?.$date || p.updatedAt || new Date().toISOString(),
  };
};

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await getProductsApi(params);
      const payload = res?.data !== undefined ? res.data : res;

      let list = [];
      let total = 0;
      let page = Number(params.page) || 1;
      let limit = Number(params.limit) || 10;
      let totalPages = 1;

      if (Array.isArray(payload)) {
        list = payload;
        total = payload.length;
        totalPages = Math.ceil(total / limit) || 1;
      } else if (payload && typeof payload === "object") {
        list = Array.isArray(payload.products) ? payload.products : [];
        total = Number(payload.total ?? payload.pagination?.total ?? list.length);
        page = Number(payload.page ?? payload.pagination?.page ?? page);
        limit = Number(payload.limit ?? payload.pagination?.limit ?? limit);
        totalPages = Number(
          payload.totalPages ??
            payload.pagination?.totalPages ??
            (Math.ceil(total / limit) || 1)
        );
      }

      return {
        products: list.map(normalizeProduct),
        total,
        page,
        limit,
        totalPages,
        pagination: { total, page, limit, totalPages },
      };
    } catch (err) {
      if (err?.isCanceled || err?.name === "CanceledError") {
        return rejectWithValue({ isCanceled: true });
      }
      return rejectWithValue(err.message || "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdApi(id);
      return normalizeProduct(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch product");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const res = await createProductApi(data);
      return normalizeProduct(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await updateProductApi(id, data);
      return normalizeProduct(res?.data !== undefined ? res.data : res);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to update product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductApi(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete product");
    }
  }
);

export const bulkDeleteProducts = createAsyncThunk(
  "products/bulkDeleteProducts",
  async (data, { rejectWithValue }) => {
    try {
      const res = await bulkDeleteProductsApi(data);
      const ids = Array.isArray(data)
        ? data
        : Array.isArray(data?.ids)
        ? data.ids
        : data?.productIds || [];
      return { ids, res };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to bulk delete products");
    }
  }
);

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

const initialState = {
  products: [],
  currentProduct: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 1,
  pagination: null,
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setProductsDirectly: (state, action) => {
      state.products = Array.isArray(action.payload)
        ? action.payload.map(normalizeProduct)
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          state.products = action.payload.products;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false;
          if (!action.payload?.isCanceled) {
            state.error = action.payload;
          }
        }
      })

      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        const newProd = action.payload;
        const idx = state.products.findIndex(
          (p) => p.id === newProd.id || (newProd._id && p._id === newProd._id)
        );
        if (idx !== -1) {
          state.products[idx] = newProd;
        } else {
          state.products.unshift(newProd);
          state.total += 1;
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.products.findIndex(
          (p) => p.id === updated.id || (updated._id && p._id === updated._id)
        );
        if (idx !== -1) state.products[idx] = updated;
        if (
          state.currentProduct &&
          (state.currentProduct.id === updated.id ||
            state.currentProduct._id === updated._id)
        ) {
          state.currentProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        const idx = state.products.findIndex(
          (p) => p.id === id || p._id === id
        );
        if (idx !== -1) {
          if (state.products[idx].isDeleted) {
            state.products.splice(idx, 1);
            state.total = Math.max(0, state.total - 1);
          } else {
            state.products[idx].isDeleted = true;
          }
        }
      })

      // Bulk Delete
      .addCase(bulkDeleteProducts.fulfilled, (state, action) => {
        const idSet = new Set(action.payload.ids.map(String));
        state.products = state.products
          .filter(
            (p) =>
              !(
                p.isDeleted &&
                (idSet.has(String(p.id)) || idSet.has(String(p._id)))
              )
          )
          .map((p) =>
            idSet.has(String(p.id)) || idSet.has(String(p._id))
              ? { ...p, isDeleted: true }
              : p
          );
      })

      // Review
      .addCase(addProductReview.fulfilled, (state, action) => {
        const updated = action.payload.product;
        const idx = state.products.findIndex(
          (p) => p.id === updated.id || (updated._id && p._id === updated._id)
        );
        if (idx !== -1) state.products[idx] = updated;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        const { productId, reviewId, product: updated } = action.payload;
        const idx = state.products.findIndex(
          (p) =>
            p.id === productId ||
            (productId && p._id === productId) ||
            (updated && (p.id === updated.id || (updated._id && p._id === updated._id)))
        );
        if (idx !== -1) {
          if (updated && Array.isArray(updated.reviews)) {
            state.products[idx] = updated;
          } else {
            state.products[idx].reviews = (state.products[idx].reviews || []).filter(
              (r) => String(r.id) !== String(reviewId) && String(r._id) !== String(reviewId)
            );
          }
        }
      });
  },
});

export const {
  clearProductError,
  setCurrentProduct,
  setProductsDirectly,
} = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products?.products || [];
export const selectProductsLoading = (state) => Boolean(state.products?.loading);
export const selectProductsError = (state) => state.products?.error || null;
export const selectProductsTotal = (state) => state.products?.total || 0;
export const selectProductsPage = (state) => state.products?.page || 1;
export const selectProductsLimit = (state) => state.products?.limit || 10;
export const selectProductsTotalPages = (state) => state.products?.totalPages || 1;
export const selectProductsPagination = (state) => state.products?.pagination || null;

// Unified useProducts Hook
export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const total = useSelector(selectProductsTotal);
  const page = useSelector(selectProductsPage);
  const limit = useSelector(selectProductsLimit);
  const totalPages = useSelector(selectProductsTotalPages);
  const pagination = useSelector(selectProductsPagination);

  return {
    products,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    pagination,
    getProducts: React.useCallback(
      (params) => dispatch(fetchProducts(params)),
      [dispatch]
    ),
    fetchProducts: React.useCallback(
      (params) => dispatch(fetchProducts(params)),
      [dispatch]
    ),
    addProduct: React.useCallback(
      (data) => dispatch(createProduct(data)),
      [dispatch]
    ),
    createProduct: React.useCallback(
      (data) => dispatch(createProduct(data)),
      [dispatch]
    ),
    editProduct: React.useCallback(
      (id, data) => dispatch(updateProduct({ id, data })),
      [dispatch]
    ),
    updateProduct: React.useCallback(
      (id, data) => dispatch(updateProduct({ id, data })),
      [dispatch]
    ),
    removeProduct: React.useCallback(
      (id) => dispatch(deleteProduct(id)),
      [dispatch]
    ),
    deleteProduct: React.useCallback(
      (id) => dispatch(deleteProduct(id)),
      [dispatch]
    ),
    bulkRemoveProducts: React.useCallback(
      (data) => dispatch(bulkDeleteProducts(data)),
      [dispatch]
    ),
    bulkDeleteProducts: React.useCallback(
      (data) => dispatch(bulkDeleteProducts(data)),
      [dispatch]
    ),
    addReview: React.useCallback(
      (id, data) => dispatch(addProductReview({ id, data })),
      [dispatch]
    ),
    removeReview: React.useCallback(
      (productId, reviewId) => dispatch(deleteProductReview({ productId, reviewId })),
      [dispatch]
    ),
    deleteReview: React.useCallback(
      (productId, reviewId) => dispatch(deleteProductReview({ productId, reviewId })),
      [dispatch]
    ),
    dispatch,
  };
};

export default productSlice.reducer;

