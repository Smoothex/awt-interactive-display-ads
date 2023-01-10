import {configureStore} from "@reduxjs/toolkit";
import adReducer from "../features/ad/adSlice";
import diagramReducer from "../features/diagram/diagramSlice";
import dialogReducer from "../features/dialog/dialogSlice";

export const store = configureStore({
    reducer: {
        ad: adReducer,
        diagram: diagramReducer,
        dialog: dialogReducer
    }
});

export type RootState = ReturnType<typeof store.getState>