import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAllContactById,ContactDesc,fetchContactById,createContactById,updateContactById} from "./ContactApi";
import {redumDeleteApi} from "../Redum/DeleteApi";
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
export const deleteRedumSlice=createAsyncThunk("/api/contact/delete",async (id,thunkApi)=>{
    try{
        console.log(id);
       const response=await redumDeleteApi(id);
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
            error:false
        },
       abcDeleteContact:{
        message:null,
        success:false,
        status:false
       },
        descContact:{  
            data:null,
            loading:false,
            error:false
        },
        error:{
            error:false,
            message:null
        },
        contactDataById:{
            data:null,
            loading:false,
            error:false

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
        },
        deleteRedum:{
            message:null,
            status:false,
            loading:false
          }

    },
    reducers:{
        resetData:(state)=>{
            state.contactDataById.data=null;
            state.contactDataById.loading=false;
        },
        resetLoading:(state)=>{
            state.loading=true;
        },
        resetLoaderFalse:(state)=>{
            console.log("I am inside");
            state.loading=false;

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchContactByIdSlice.pending,(state)=>{
            state.loading=true
            state.contactData.loading=true;
            state.contactData.data=null;
            console.log("I AM INISE fetchContactByIdSlice")

        })
        builder.addCase(fetchContactByIdSlice.fulfilled,(state,{payload})=>{
            state.contactData.loading=false;
            state.loading=false;
            state.contactData.data=payload;
            // state.deleteByIdContact.loading=false;
            // state.deleteByIdContact.status=false;
            // state.deleteByIdContact.message=null; 
            if(state.addContactById.status) {
                toast.success("Contact added successfully")
                state.addContactById.loading=false;
                state.addContactById.status=false;
                state.addContactById.message=null;
            }
            if(state.updateContactById.status) {
                toast.success("Contact is updated successfully")
            
            state.updateContactById.status=false;
            state.updateContactById.message=null
            state.contactData.error=false;
            }
           
             if(state.deleteRedum.status) {
                toast.success("Contact is deleted successfully")

                state.deleteRedum.loading=false;
                state.deleteRedum.message=null;
                state.deleteRedum.status=false;
            }

            

        })
        builder.addCase(fetchContactByIdSlice.rejected,(state,{payload})=>{
            state.contactData.loading=false;
            state.loading=false
            state.error.error=true;
            state.error.message=payload;
            state.loading=false
            state.contactData.error=true;
        })
      
        builder.addCase(ContactDescSlice.pending,(state)=>{
            state.descContact.loading=true;


        })
        builder.addCase(ContactDescSlice.fulfilled,(state,{payload})=>{
            state.descContact.loading=false;
            state.descContact.error=false;
            state.descContact.data=payload;
        })
        builder.addCase(ContactDescSlice.rejected,(state,{payload})=>{
            state.error.error=true;
            state.error.message=payload;
            state.descContact.error=true;
        })
        builder.addCase(ContactByIdSlice.pending,(state)=>{
            state.contactDataById.loading=true;
        })
        builder.addCase(ContactByIdSlice.fulfilled,(state,{payload})=>{
            state.contactDataById.loading=false;
            state.contactDataById.data=payload;
            state.contactDataById.error=false;

        })
        builder.addCase(ContactByIdSlice.rejected,(state,{payload})=>{
            state.contactDataById.loading=false;
            state.error.error=true;
            state.error.message=payload;
            state.contactDataById.error=true;

        })
        builder.addCase(createContactByIdSlice.pending,(state)=>{
            state.addContactById.loading=true
            state.loading=true;
            state.addContactById.status=false;


        })
        builder.addCase(createContactByIdSlice.fulfilled,(state,{payload})=>{
            state.addContactById.loading=false
            state.addContactById.status=true;
            state.addContactById.message=payload;

        })
        builder.addCase(createContactByIdSlice.rejected,(state,{payload})=>{
            state.addContactById.loading=false;
            state.loading=false
            state.addContactById.status=false;

            state.error.error=true;
            state.error.message=payload;
            console.log(payload);
            toast.error("Bad request")

        })
        builder.addCase(updateContactByIdSlice.pending,(state)=>{
            state.updateContactById.loading=true
            state.loading=true

        })
        builder.addCase(updateContactByIdSlice.fulfilled,(state,{payload})=>{
            state.updateContactById.loading=false
            state.updateContactById.status=true;
            state.updateContactById.message=payload
        })
        builder.addCase(updateContactByIdSlice.rejected,(state,{payload})=>{
            state.updateContactById.loading=false;
            state.loading=false
            state.error.error=true;
            state.error.message=payload;
        })
        builder.addCase(deleteRedumSlice.pending,(state)=>{
            state.loading=true
            state.deleteRedum.loading = true;
           })
           builder.addCase(deleteRedumSlice.fulfilled,(state,{paylaod})=>{
            state.deleteRedum.loading = true;
            state.deleteRedum.status = true;
            state.deleteRedum.message=paylaod;
           })
           builder.addCase(deleteRedumSlice.rejected,(state,{paylaod})=>{
            state.deleteRedum.loading=false;
            state.loading=false
            toast.error("Contact can't be deleted")
            state.error.error=true;
            state.error.message=paylaod
           })
        
    }
})


export default contact.reducer;
export const {resetData,resetLoading,resetLoaderFalse}=contact.actions