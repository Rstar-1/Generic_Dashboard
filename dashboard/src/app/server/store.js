import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../feature/cartSlice";
import roleReducer from "../../feature/roleSlice";
import authReducer from "../../feature/authSlice";
import userReducer from "../../feature/userSlice";
import productCategoryReducer from "../../feature/productCategorySlice";
import productReducer from "../../feature/productSlice";
import blogCategoryReducer from "../../feature/blogCategorySlice";
import blogReducer from "../../feature/blogSlice";
import leadReducer from "../../feature/leadSlice";
import cmsReducer from "../../feature/cmsSlice";
import seoReducer from "../../feature/seoSlice";

// Safe persistence loader
export const loadState = () => {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return undefined;
    const data = localStorage.getItem("appState");
    if (!data) return undefined;
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

// Safe persistence saver
export const saveState = (state) => {
  try {
    if (typeof window === "undefined" || typeof localStorage === "undefined")
      return;
    if (state?.cart) {
      localStorage.setItem("appState", JSON.stringify({ cart: state.cart }));
    }
  } catch {
    // Ignore localStorage write errors
  }
};

export const createStore = (preloadedState) =>
  configureStore({
    reducer: {
      cart: cartReducer,
      roles: roleReducer,
      auth: authReducer,
      users: userReducer,
      categories: productCategoryReducer,
      productCategories: productCategoryReducer,
      products: productReducer,
      blogCategories: blogCategoryReducer,
      blogs: blogReducer,
      leads: leadReducer,
      cms: cmsReducer,
      seo: seoReducer,
    },
    preloadedState: preloadedState !== undefined ? preloadedState : loadState(),
    devTools: import.meta.env?.DEV,
  });

export const store = createStore();

// Debounced persistence (browser-only)
if (typeof window !== "undefined") {
  let timeout;
  store.subscribe(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      saveState(store.getState());
    }, 300);
  });
}

export default store;
