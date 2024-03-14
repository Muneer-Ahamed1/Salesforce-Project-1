import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth/AuthSlice";
import AccountReducer from "./features/Account/AccountSlice";
import ContactReducer from "./features/Contact/ContactSlice";


const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        account:AccountReducer,
        contact:ContactReducer,
        
    }
})

export default Store;