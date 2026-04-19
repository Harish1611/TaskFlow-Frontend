import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../features/auth/api";

export const login = createAsyncThunk(
  "auth/login",
  async (data: any) => {
    const res = await loginAPI(data);
    return res.data;
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;