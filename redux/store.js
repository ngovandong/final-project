import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './slices/modalSlice';
import musicSlice from "./slices/musicSlice";

export const store = configureStore({
    reducer: {
        music: musicSlice,
        modal: modalSlice
    },

    // Disable SerializableStateInvariantMiddleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});