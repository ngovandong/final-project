import { configureStore } from '@reduxjs/toolkit';
import playerSlice from "./slices/playerSlice";
import modalSlice from "./slices/modalSlice";
import musicSlice from "./slices/musicSlice";

export const store = configureStore({
    reducer: {
        music: musicSlice,
        modal: modalSlice,
        player: playerSlice
    },

    // Disable SerializableStateInvariantMiddleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});