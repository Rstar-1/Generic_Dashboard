import { configureStore } from "@reduxjs/toolkit";
import botReducer from "./slices/botSlice";

export const store = configureStore({
  reducer: {
    bot: botReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
