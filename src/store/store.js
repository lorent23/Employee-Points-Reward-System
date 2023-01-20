import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
