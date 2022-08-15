import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer";
import reduxThunk from "redux-thunk";

export const rootStore = configureStore({
    // untuk mengelompokkan seluruh reducer yang dibuat
    reducer: {
        userReducer
    }
}, applyMiddleware(reduxThunk))