import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
    },
    // Disable SerializableStateInvariantMiddleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});