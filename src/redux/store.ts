import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { messagesApi } from "../services/messagesAPI";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(messagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
