import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth/AuthSlice";
import AccountReducer from "./features/Account/AccountSlice";

const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        account:AccountReducer
        
    }
})

export default Store;