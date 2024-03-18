import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchAllRecordApi, deleteRecordByIdApi, createRecordApi, templateAccountApi, fetchRecordApiByIdApi, updateRecordById
    , ownerShipApi
} from "./AccountApi";

import { toast } from 'react-toastify';
export const fetchAllAccountRecordsSlice = createAsyncThunk("/api/account/fetchAllAccountRecords", async (_, thunkApi) => {
    try {
        const response = await fetchAllRecordApi();

        return response.data;
    }
    catch (e) {
        throw thunkApi.reject(e);

    }
})

export const deleteRecordByIdSlice = createAsyncThunk("/api/account/deleteRecordById", async (Id, thunkApi) => {
    try {
        const response = await deleteRecordByIdApi(Id);
        return response.data;

    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);

    }
})
export const createRecordApiSlice = createAsyncThunk("/api/account/createRecordApiSlice", async (data, thunkApi) => {
    try {
        const response = await createRecordApi(data);
        return response.data;
    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);
    }
})

export const templateAccountSlice = createAsyncThunk("/api/account/describe", async () => {
    try {
        const response = await templateAccountApi();
        return response.data;
    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);

    }
})

export const fetchRecordByIdSlice = createAsyncThunk("/api/account/fetchRecordById", async (id, thunkApi) => {
    try {
        console.log("Fetching" + id);
        const response = await fetchRecordApiByIdApi(id);
        return response.data;
    }
    catch (err) {
        throw thunkApi.rejectWithValue(err);
    }
})

export const fetchOwnerShipSlice = createAsyncThunk("/api/account/fetchOwnerShip", async () => {
    try {
        const response = await ownerShipApi();
        return response.data;
    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);

    }
})





export const accountUpdateByIdSlice = createAsyncThunk("/api/account/updateByIdSlice", async (editData, thunkApi) => {
    try {
        const { id, data } = editData;
        const response = await updateRecordById(id, data);
        return response.data;
    }
    catch (e) {
        throw thunkApi.rejectWithValue(e);

    }
})









const account = createSlice({
    name: "account",
    initialState: {
        loading: false,
        accountData: null,
        fetchAllAccountRecord:{
            error:false,
            status:false
        },
        error: {
            message: null,
            error: false
        },
        accountDescribe: {
            data: null,
            loading: false,
            error: false

        },
        deleteAccount: {
            status: false,
            message: null
        },
        addAccountRecord: {
            status: false,
            message: null
        },
        accountUpdateData: {
            status: false,
            message: null,
            loading: false
        },
        fetchByIdAccountRecord: {  
            status: false,
            data: null,
            loading: false,
            error: false
        },
        fetchOwnerShip: {
            status: false, data: null, loading: false,error:false
        }

    },
    reducers: {
        resetData:(state)=>{
            state.accountUpdateData.loading = false;
            state.accountUpdateData.message=null;
            state.accountUpdateData.status=false

        },
        resetError:(state)=>{
            state.error.error=false;
            state.error.message=null;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllAccountRecordsSlice.pending, (state, { payload }) => {
            state.loading = true;
        })
        builder.addCase(fetchAllAccountRecordsSlice.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.deleteAccount.status = false;
            state.addAccountRecord.status = false;
            state.addAccountRecord.message = null;
            state.deleteAccount.message = null;
            state.addAccountRecord.status = false;
            state.addAccountRecord.message = null;
            state.accountData = payload;
            state.error.error=false;
            state.error.message=null;
            state.fetchAllAccountRecord.status=true
            state.fetchAllAccountRecord.error=false;

        })
        builder.addCase(fetchAllAccountRecordsSlice.rejected, (state, { payload }) => {
            state.loading = false;
            state.error.error = true;
            state.error.message = payload;
            state.fetchAllAccountRecord.error=true;

        })
        builder.addCase(deleteRecordByIdSlice.pending, (state) => {
            state.loading = true;

        })
        builder.addCase(deleteRecordByIdSlice.fulfilled, (state, { payload }) => {
            state.deleteAccount.status = true;
            state.error.error=false;
            state.error.message=null;
            toast.success("account is deleted successfully")



            state.deleteAccount.message = payload.message;
        })
        builder.addCase(deleteRecordByIdSlice.rejected, (state, { payload }) => {
            state.error.error = true;
            state.loading = false;
            toast.error("Delete is failed");

            state.error.message = payload;
        })
        builder.addCase(templateAccountSlice.pending, (state) => {
            state.accountDescribe.loading = true;
        })

        builder.addCase(templateAccountSlice.fulfilled, (state, { payload }) => {
            state.accountDescribe.data = payload;
            state.accountDescribe.loading = false;
            state.error.error=false;
            state.error.message=null;
            state.accountDescribe.error=false;


        })
        builder.addCase(templateAccountSlice.rejected, (state, { payload }) => {
            state.error.error = true;
            state.error.message = payload;
            state.accountDescribe.loading = false;
            state.accountDescribe.error=true;

        })

        builder.addCase(createRecordApiSlice.pending, (state, { payload }) => {
            state.loading = true;
            state.error.error = false;
            state.error.message = null;
            state.addAccountRecord.status = false;
            state.addAccountRecord.message = null;

            
        })



        builder.addCase(createRecordApiSlice.fulfilled, (state, { payload }) => {
            state.error.error = false;
            state.error.message = null;
            state.addAccountRecord.status = true;
            state.addAccountRecord.message = "Added The data";
            state.error.error=false;
            state.error.message=null;
            toast.success("account is successful created")

        })
        builder.addCase(createRecordApiSlice.rejected, (state, { payload }) => {
            state.error.error = true;
            state.loading=false;
            state.error.message = payload;
            state.addAccountRecord.status = false;
            state.addAccountRecord.message = null;
            toast.error("account can't be created successfully")
        })

        builder.addCase(fetchRecordByIdSlice.pending, (state, { payload }) => {
            state.fetchByIdAccountRecord.loading = true;
            state.fetchByIdAccountRecord.status = false;
            state.fetchByIdAccountRecord.data = null;
            state.fetchByIdAccountRecord.error=false;

        })
        builder.addCase(fetchRecordByIdSlice.fulfilled, (state, { payload }) => {
            state.fetchByIdAccountRecord.loading = false;
            state.fetchByIdAccountRecord.status = true;
            state.fetchByIdAccountRecord.data = payload;
            state.accountUpdateData.status=false
            state.accountUpdateData.message=null;
            state.accountUpdateData.loading=false;
            state.error.error=false;
            state.error.message=null;
            state.fetchByIdAccountRecord.error=false;
        })
        builder.addCase(fetchRecordByIdSlice.rejected, (state, { payload }) => {
            state.fetchByIdAccountRecord.loading = false;
            state.error.error = true;
            state.error.message = payload;
            state.fetchByIdAccountRecord.error=true;

        })
        builder.addCase(fetchOwnerShipSlice.pending, (state) => {
            state.fetchOwnerShip.loading = true;
            state.fetchOwnerShip.error=true;

        })
        builder.addCase(fetchOwnerShipSlice.fulfilled, (state, { payload }) => {
            state.fetchOwnerShip.loading = false;
            state.fetchOwnerShip.status = true;
            state.fetchOwnerShip.data = payload;
            state.error.error=false;
            state.fetchOwnerShip.error=false;
            state.error.message=null;
        })
        builder.addCase(fetchOwnerShipSlice.rejected, (state, { payload }) => {
            state.fetchOwnerShip.loading = false;
            state.error.error = true;
            state.fetchOwnerShip.error=true
            state.error.message = payload;
        })
        builder.addCase(accountUpdateByIdSlice.pending, (state) => {
            state.loading=true
            state.accountUpdateData.loading = true;
        })
        builder.addCase(accountUpdateByIdSlice.fulfilled, (state, { payload }) => {
            state.accountUpdateData.loading = false;
            state.accountUpdateData.status = true;
            state.accountUpdateData.message = "Account updated";
            state.error.error=false;
            state.error.message=null;
            toast.success("update is successful")

        })
        builder.addCase(accountUpdateByIdSlice.rejected, (state, { payload }) => {
            state.loading=false
            state.accountUpdateData.loading = false;
            state.accountUpdateData.status = false;
            state.accountUpdateData.message = null;
            state.error.error = true;
            state.error.message = payload
            toast.error("something went wrong")
        })


    }
})
export const {resetData,resetError}=account.actions
export default account.reducer;