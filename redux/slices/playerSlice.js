import { createSlice } from '@reduxjs/toolkit';

const init = {
    trackList: [
        {
            avatar: "https://avatar-ex-swe.nixcdn.com/song/2018/01/25/5/2/d/e/1516891769034.jpg",
            creator: "Ed Sheeran",
            music: "https://aredir.nixcdn.com/Warner_Audio38/ShapeOfYou-EdSheeran-6443488.mp3?st=ycuZei2P_WKHl48bXVvUlA&e=1631635369",
            title: "Shape Of You",
        },
    ]
}

export const playerSlice = createSlice({
    name: 'player',
    initialState: init,
    reducers: {
        SET_TRACK_LIST: (state, action) =>
        {
            state.trackList = action.payload;
            return state;
        },
        ADD_TRACK: (state, action) =>
        {
            state.trackList.push(action.payload);
            return state;
        },
        REMOVE_TRACK: (state, action) =>
        {
            // Trong trackList phải có ít nhất 1 bài để không lỗi undefined
            if (state.trackList.length > 1)
            {
                const { music } = action.payload;
                state.trackList = state.trackList.filter(t => t.music !== music);
            };
            return state;
        }
    },
    extraReducers: {}
});

export const { SET_TRACK_LIST, ADD_TRACK, REMOVE_TRACK } = playerSlice.actions;

export default playerSlice.reducer;