import {configureStore} from "@reduxjs/toolkit";
import adReducer from "../features/ad/adSlice";

export const store = configureStore({
    reducer: {
        ad: adReducer
    }
});