import { createSlice } from '@reduxjs/toolkit';

const init = {
    top_category: [],
    current_tc: "",
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
        SET_CURRENT_TC: (state, action) =>
        {
            state.current_tc = action.payload;
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

export const { SET_TOP_CATEGORY, SET_CURRENT_TC, SET_SONGS } = musicSlice.actions;

export default musicSlice.reducer;