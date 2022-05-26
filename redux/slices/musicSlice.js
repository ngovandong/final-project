import { createSlice } from '@reduxjs/toolkit';

const init = {
    top_category: [],
    songs: [],
    isLoading: true,
    exception: ""
}

export const musicSlice = createSlice({
    name: 'music',
    initialState: init,
    reducers: {
        SET_TOP_CATEGORY: (state, action) =>
        {
            const { top_category, isLoading, exception } = action.payload;
            state.top_category = top_category;
            state.isLoading = isLoading;
            state.exception = exception;
            return state;
        },
        SET_SONGS: (state, action) =>
        {
            state.songs = action.payload;
            return state;
        }
    },
    extraReducers: {}
});

export const { SET_TOP_CATEGORY, SET_SONGS } = musicSlice.actions;

export default musicSlice.reducer;