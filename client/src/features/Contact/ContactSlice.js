import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAllContactById,deleteContactById,ContactDesc,fetchContactById,createContactById,updateContactById} from "./ContactApi";
import {toast} from 'react-toastify'
export const fetchContactByIdSlice=createAsyncThunk("/api/contact/fetchAllContactByIdApi",async (id,thunkApi)=>{
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

export const ContactDescSlice=createAsyncThunk("/api/contact/ContactDesc",async (_,thunkApi)=>{
    try{
        const response=await ContactDesc();
        return response.data;
    }
    catch(err){

        throw thunkApi.rejectWithValue(err);

    }
})

export const ContactByIdSlice=createAsyncThunk("/api/contact/fetchContactById" ,async (id,thunkApi)=>{
    try{
        const response=await fetchContactById(id);
        return response.data;

    }
    catch(err){
        throw thunkApi.rejectWithValue(err);

    }
})
export const createContactByIdSlice=createAsyncThunk("/api/contact/createContactById",async (data,thunkApi)=>{
    try{
        const response =await createContactById(data);
        return response.data;
    }
    catch(e){
        throw thunkApi.rejectWithValue(e);

    }


})

export const updateContactByIdSlice=createAsyncThunk("/api/contact/updateContactById",async (editData,thunkApi) =>{
     try{
        const{id,data}=editData;
        const response=await updateContactById(id,data);
        return response.data;

    }
    catch(e){
        throw thunkApi.rejectWithValue(e);

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
        descContact:{
            data:null,
            loading:false
        },
        error:{
            error:false,
            message:null
        },
        contactDataById:{
            data:null,
            loading:false
        },
        addContactById:{
            message:null,
            loading:false,
            status:false
        },
        updateContactById:{
            message:null,
            loading:false,
            status:false
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
            state.updateContactById.status=false;
            state.updateContactById.message=null

            

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
            toast.pending("Pending Delete Contact")
        })
        builder.addCase(deleteContactByIdSlice.fulfilled,(state,{payload})=>{
            state.deleteContact.loading=false;
            state.deleteContact.status=true;
            state.deleteContact.message=payload;
            toast.success("success deleted contact")

        })
        builder.addCase(deleteContactByIdSlice.rejected,(state,{payload})=>{
            state.deleteContact.loading=false;
            state.error.error=true;
            state.error.message=payload;
            toast.error("Contact can't be deleted")
        })
        builder.addCase(ContactDescSlice.pending,(state)=>{
            state.descContact.loading=true;
        })
        builder.addCase(ContactDescSlice.fulfilled,(state,{payload})=>{
            state.descContact.loading=false;
            state.descContact.data=payload;
        })
        builder.addCase(ContactDescSlice.rejected,(state,{payload})=>{
            state.error.error=true;
            state.error.message=payload;
        })
        builder.addCase(ContactByIdSlice.pending,(state)=>{
            state.contactDataById.loading=true;
        })
        builder.addCase(ContactByIdSlice.fulfilled,(state,{payload})=>{
            state.contactDataById.loading=false;
            state.contactDataById.data=payload;

        })
        builder.addCase(ContactByIdSlice.rejected,(state,{payload})=>{
            state.contactDataById.loading=false;
            state.error.error=true;
            state.error.message=payload;
        })
        builder.addCase(createContactByIdSlice.pending,(state)=>{
            state.addContactById.loading=true

        })
        builder.addCase(createContactByIdSlice.fulfilled,(state,{payload})=>{
            state.addContactById.loading=false
            state.addContactById.status=true;
            state.addContactById.message=payload;

        })
        builder.addCase(createContactByIdSlice.rejected,(state,{payload})=>{
            state.addContactById.loading=false;
            state.error.error=true;
            state.error.message=payload;

        })
        builder.addCase(updateContactByIdSlice.pending,(state)=>{
            state.updateContactById.loading=true
            toast.warn("Uploading data")

        })
        builder.addCase(updateContactByIdSlice.fulfilled,(state,{payload})=>{
            state.updateContactById.loading=false
            state.updateContactById.status=true;
            state.updateContactById.message=payload
            toast.success("Contact updated")
        })
        builder.addCase(updateContactByIdSlice.rejected,(state,{payload})=>{
            state.updateContactById.loading=false;
            state.error.error=true;
            state.error.message=payload;
            toast.error("Something went wrong")
        })
        
    }
})


export default contact.reducer;