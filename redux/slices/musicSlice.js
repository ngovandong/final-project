import { createSlice } from '@reduxjs/toolkit';

const init = {
    top_category: [],
    songs: [],
    isLoading: true,
    exception: null,
}

export const musicSlice = createSlice({
    name: 'music',
    initialState: init,
    reducers: {
        SET_MUSIC_DATA: (state, action) =>
        {
            // const {top_category, songs, isLoading, exception} = action.payload;
            return action.payload;
        }
    },
    extraReducers: {}
});

export const { SET_MUSIC_DATA } = musicSlice.actions;

export default musicSlice.reducer;