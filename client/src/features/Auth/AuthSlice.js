import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi } from "./AuthApi";

export const loginUserSlice = createAsyncThunk("/api/user/login", async (code, thunkApi) => {
  try {
    const login_user = await loginApi(code);
    return login_user.data;
  } catch (e) {
    // Corrected to return rejectWithValue
    return thunkApi.rejectWithValue(e);
  }
});

const login = createSlice({
  name: "login",
  initialState: {
    loading: false,
    isLogin: {
      login: (sessionStorage.getItem('access_token'))?true:false,
      data: sessionStorage.getItem("access_token")||null,
    },
    error: {
      message: null,
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserSlice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUserSlice.fulfilled, (state, { payload }) => {
      state.isLogin.login = true;
      state.loading = false;
      state.isLogin.data = payload.data;
      sessionStorage.setItem("access_token",payload.data.access_token);
      sessionStorage.setItem("refresh_token",payload.data.refresh_token);
      sessionStorage.setItem("instance_url",payload.data.instance_url);
    });
    builder.addCase(loginUserSlice.rejected, (state, { payload }) => {
      state.loading = false;
      state.error.error = true;
      state.error.message = payload;
    });
    
  },
});

export default login.reducer;
