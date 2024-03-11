import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAllContactById,deleteContactById} from "./ContactApi";

export const fetchContactByIdSlice=createAsyncThunk("/api/contact/fetchContactByIdApi",async (id,thunkApi)=>{
    try{
        const response=await fetchAllContactById(id);
        return response.data;

    }
    catch(e){
        throw thunkApi.rejectWithValue(e);

    }

})

export const deleteContactByIdSlice=createAsyncThunk("/api/contact/deleteContactByIdApi",async (id,thunkApi)=>{
    try{
        const response=await deleteContactById(id);
        return response.data;
    }
    catch(err){
        throw thunkApi.rejectWithValue(err);

    }
})


const contact=createSlice({
    name:"contact",
    initialState:{
        loading:false,
        contactData:{
            data:null,
            loading:false,
        },
        deleteContact:{
            message:null,
            loading:false,
            status:false
        },
        error:{
            error:false,
            message:null
        }
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchContactByIdSlice.pending,(state)=>{
            state.contactData.loading=true;
            state.contactData.data=null;

        })
        builder.addCase(fetchContactByIdSlice.fulfilled,(state,{payload})=>{
            state.contactData.loading=false;
            state.contactData.data=payload;
            state.deleteContact.loading=false;
            state.deleteContact.status=false;
            state.deleteContact.message=null;
        })
        builder.addCase(fetchContactByIdSlice.rejected,(state,{payload})=>{
            state.contactData.loading=false;
            state.error.error=true;
            state.error.message=payload;
        })
        builder.addCase(deleteContactByIdSlice.pending,(state)=>{
            state.deleteContact.loading=true;
            state.deleteContact.status=false;
            state.deleteContact.message=null;
        })
        builder.addCase(deleteContactByIdSlice.fulfilled,(state,{payload})=>{
            state.deleteContact.loading=false;
            state.deleteContact.status=true;
            state.deleteContact.message=payload;
        })
        builder.addCase(deleteContactByIdSlice.rejected,(state,{payload})=>{
            state.deleteContact.loading=false;
            state.error.error=true;
            state.error.message=payload;
        })
    }
})


export default contact.reducer;