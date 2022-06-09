import { createSlice } from '@reduxjs/toolkit';

const init = {
    trackList: [],
    statusPlaying: false,
    track: null,
    msg: '',
    playList: []
}

export const playerSlice = createSlice({
    name: 'music',
    initialState: init,
    reducers: {

    },
    extraReducers: {}
});

export const { } = playerSlice.actions;

export default playerSlice.reducer;