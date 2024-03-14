import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

  import { loginApi,abcDeleteApi} from "./AuthApi";
  import {toast} from 'react-toastify'

export const loginUserSlice = createAsyncThunk("/api/user/login", async (code, thunkApi) => {
  try {
    const login_user = await loginApi(code);
    return login_user.data;
  } catch (e) {
    // Corrected to return rejectWithValue
    return thunkApi.rejectWithValue(e);
  }
});

export const abcDeleteSliceAuthSlice=createAsyncThunk("/api/contact/abcDelice",async (id,thunkApi)=>{
  try{
      console.log(id);
     const response=await abcDeleteApi(id);
      return response.data;
  }
  catch(err){
  throw thunkApi.rejectWithValue(err);

  }
 
 
})
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
    deleteConXyz:{
      message:null,
      status:false,
      loading:false
    }
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
    builder.addCase(abcDeleteSliceAuthSlice.pending,(state)=>{
      state.deleteConXyz.loading=true;
      state.deleteConXyz.status=false;
      state.deleteConXyz.message=null;
      toast.pending("Pending Delete Contact")
  })
  builder.addCase(abcDeleteSliceAuthSlice.fulfilled,(state,{payload})=>{
      state.deleteConXyz.loading=false;
      state.deleteConXyz.status=true;
      state.deleteConXyz.message=payload;
      toast.success("success deleted contact")

  })
  builder.addCase(abcDeleteSliceAuthSlice.rejected,(state,{payload})=>{
      state.deleteConXyz.loading=false;
      state.error.error=true;
      state.error.message=payload;
      toast.error("Contact can't be deleted")
  })
    
  },
});

export default login.reducer;
