import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import teamReducer from "./slices/teamSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
     team: teamReducer,
  },
});



