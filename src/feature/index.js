/**
 * 📦 Feature Slices Central Store & Exports
 * Central barrel providing all Redux Toolkit slices, reducers,
 * async thunks, actions, selectors, and custom hooks.
 */

// Reducers
import authReducer from "./authSlice.js";
import productReducer from "./productSlice.js";
import productCategoryReducer from "./productCategorySlice.js";
import blogReducer from "./blogSlice.js";
import blogCategoryReducer from "./blogCategorySlice.js";
import roleReducer from "./roleSlice.js";
import userReducer from "./userSlice.js";
import seoReducer from "./seoSlice.js";
import domainReducer from "./domainSlice.js";
import leadReducer from "./leadSlice.js";

// Re-export individual reducers
export {
  authReducer,
  productReducer,
  productCategoryReducer,
  productCategoryReducer as categoryReducer,
  blogReducer,
  blogCategoryReducer,
  roleReducer,
  userReducer,
  seoReducer,
  domainReducer,
  leadReducer,
};

// Slices
export { authSlice } from "./authSlice.js";
export { productSlice } from "./productSlice.js";
export { productCategorySlice } from "./productCategorySlice.js";
export { blogSlice } from "./blogSlice.js";
export { blogCategorySlice } from "./blogCategorySlice.js";
export { roleSlice } from "./roleSlice.js";
export { userSlice } from "./userSlice.js";
export { seoSlice } from "./seoSlice.js";
export { domainSlice } from "./domainSlice.js";
export { leadSlice, useLeads } from "./leadSlice.js";

// Combined reducer map for Redux store configuration
export const featureReducers = {
  auth: authReducer,
  products: productReducer,
  productCategories: productCategoryReducer,
  categories: productCategoryReducer,
  blogs: blogReducer,
  blogCategories: blogCategoryReducer,
  roles: roleReducer,
  users: userReducer,
  seos: seoReducer,
  domain: domainReducer,
  leads: leadReducer,
};

// Re-export all actions, thunks, selectors, normalizers, and hooks
export * from "./authSlice.js";
export * from "./productSlice.js";
export * from "./productCategorySlice.js";
export * from "./blogSlice.js";
export * from "./blogCategorySlice.js";
export * from "./roleSlice.js";
export * from "./userSlice.js";
export * from "./seoSlice.js";
export * from "./domainSlice.js";
export * from "./leadSlice.js";

// Disambiguate shared exports between authSlice and userSlice
export { resetPassword, useResetPasswordMutation } from "./authSlice.js";
export { resetPasswordApi } from "./userSlice.js";

export default featureReducers;
