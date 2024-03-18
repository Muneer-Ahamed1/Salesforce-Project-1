import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/Auth/AuthSlice";
import AccountReducer from "./features/Account/AccountSlice";
import ContactReducer from "./features/Contact/ContactSlice";
import RedumReducer from "./features/Redum/DeleteSlice";


const Store=configureStore({
    reducer:{
        auth:AuthReducer,
        account:AccountReducer,
        contact:ContactReducer,
        redum:RedumReducer
        
    }
})

export default Store;