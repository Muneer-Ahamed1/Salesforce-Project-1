import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {redumDeleteApi} from "./DeleteApi";



export const deleteRedumSlice=createAsyncThunk("/api/redum/delete",async (id,thunkApi)=>{
  try{
      console.log(id);
     const response=await redumDeleteApi(id);
      return response.data;
  }
  catch(err){
  throw thunkApi.rejectWithValue(err);

  }
 
 
})
const redum = createSlice({
  name: "redum",
  initialState: {
    loading: false,
   
    error: {
      message: null,
      error: false,
    },
    deleteRedum:{
      message:null,
      status:false,
      loading:false
    }
  },
  reducers: {
    resetDelete:(state)=>{
        state.deleteRedum.message=null;
        state.deleteRedum.status=false;
        state.deleteRedum.loading=false;
    }
  },
  extraReducers: (builder) => {
   builder.addCase(deleteRedumSlice.pending,(state)=>{
    state.deleteRedum.loading = true;
   })
   builder.addCase(deleteRedumSlice.fulfilled,(state,{paylaod})=>{
    state.deleteRedum.loading = false;
    state.deleteRedum.status = true;
    state.deleteRedum.message=paylaod;
   })
   builder.addCase(deleteRedumSlice.rejected,(state,{paylaod})=>{
    state.deleteRedum.loading=false;
    state.error.error=true;
    state.error.message=paylaod
   })
    
  },
});
export const {resetDelete}=redum.actions
export default redum.reducer;
