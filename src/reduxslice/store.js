import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
