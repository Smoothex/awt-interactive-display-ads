import {configureStore} from "@reduxjs/toolkit";
import adReducer from "../features/ad/adSlice";
import dialogReducer from "../features/dialog/dialogSlice";

export const store = configureStore({
    reducer: {
        ad: adReducer,
        dialog: dialogReducer
    }
});

export type RootState = ReturnType<typeof store.getState>