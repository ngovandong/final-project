import { configureStore } from '@reduxjs/toolkit';
import musicSlice from "./slices/musicSlice";

export const store = configureStore({
    reducer: {
        music: musicSlice
    },

    // Disable SerializableStateInvariantMiddleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});