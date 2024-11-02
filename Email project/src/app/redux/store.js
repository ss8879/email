import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./slices/userslice";
export const store = configureStore({
  reducer: {
    User: Userslice,
  },
});
