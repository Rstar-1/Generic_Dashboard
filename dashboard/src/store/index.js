import { configureStore } from "@reduxjs/toolkit";
import botReducer from "./slices/botSlice";

export const store = configureStore({
  reducer: {
    bot: botReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
