import {
    combineReducers,
    configureStore
} from "@reduxjs/toolkit";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import adReducer from "../features/ad/adSlice";

import diagramReducer from "../features/diagram/diagramSlice";

import dialogReducer from "../features/dialog/dialogSlice";

const rootReducer = combineReducers({
    ad: adReducer,
    diagram: diagramReducer,
    dialog: dialogReducer
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ["ad"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>