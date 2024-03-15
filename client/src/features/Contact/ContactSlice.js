import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchAllContactById,abcDeleteApi,ContactDesc,fetchContactById,createContactById,updateContactById} from "./ContactApi";
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



export const abcDeleteSlice=createAsyncThunk("/api/contact/abcDeleteSlice",async (id,thunkApi)=>{
     try{
         console.log(id);
        const response=await abcDeleteApi(id);
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
        }

    },
    reducers:{
        resetData:(state)=>{
            state.contactDataById.data=null;
            state.contactDataById.loading=false;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchContactByIdSlice.pending,(state)=>{
            state.contactData.loading=true;
            state.contactData.data=null;

        })
        builder.addCase(fetchContactByIdSlice.fulfilled,(state,{payload})=>{
            state.contactData.loading=false;
            state.contactData.data=payload;
            // state.deleteByIdContact.loading=false;
            // state.deleteByIdContact.status=false;
            // state.deleteByIdContact.message=null;   
            state.updateContactById.status=false;
            state.updateContactById.message=null
            state.contactData.error=false;

            

        })
        builder.addCase(fetchContactByIdSlice.rejected,(state,{payload})=>{
            state.contactData.loading=false;
            state.error.error=true;
            state.error.message=payload;
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
            toast.warn("Pending Contact")

        })
        builder.addCase(createContactByIdSlice.fulfilled,(state,{payload})=>{
            state.addContactById.loading=false
            state.addContactById.status=true;
            state.addContactById.message=payload;
            toast.success("Contact added successfully")

        })
        builder.addCase(createContactByIdSlice.rejected,(state,{payload})=>{
            state.addContactById.loading=false;
            state.error.error=true;
            state.error.message=payload;
            console.log(payload);
            toast.error("Bad request")

        })
        builder.addCase(updateContactByIdSlice.pending,(state)=>{
            state.updateContactById.loading=true
            toast.warn("Uploading Contact")

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
            toast.error("Bad request")
        })
        builder.addCase(abcDeleteSlice.pending,(state)=>{
            state.abcDeleteContact.loading=true;
            state.abcDeleteContact.status=false;
            state.abcDeleteContact.message=null;
            toast.pending("Pending Delete Contact")
        })
        builder.addCase(abcDeleteSlice.fulfilled,(state,{payload})=>{
            state.abcDeleteContact.loading=false;
            state.abcDeleteContact.status=true;
            state.abcDeleteContact.message=payload;
            toast.success("success deleted contact")

        })
        builder.addCase(abcDeleteSlice.rejected,(state,{payload})=>{
            state.abcDeleteContact.loading=false;
            state.error.error=true;
            state.error.message=payload;
            toast.error("Contact can't be deleted")
        })
        
    }
})


export default contact.reducer;
export const {resetData}=contact.actions