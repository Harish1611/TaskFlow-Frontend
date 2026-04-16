import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../features/auth/api";

export const login = createAsyncThunk(
  "auth/login",
  async (data: any) => {
    const res = await loginAPI(data);
    return res.data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export default slice.reducer;