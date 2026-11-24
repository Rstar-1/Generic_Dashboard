import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../../api/apiSlice.js";
import { featureReducers } from "../../feature/index.js";

export const createStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      ...featureReducers,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    preloadedState,
    devTools: import.meta.env.DEV,
  });

  return store;
};

// Main application store
export const store = createStore();

// Enable focus and reconnect refetching
setupListeners(store.dispatch);

export default store;
