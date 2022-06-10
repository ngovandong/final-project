import { createSlice } from '@reduxjs/toolkit';

const init = {
    trackList: [
        {
            avatar: "https://avatar-ex-swe.nixcdn.com/song/2018/01/25/5/2/d/e/1516891769034.jpg",
            bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/25/5/6/f/6/1624608342223_600.jpg",
            coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/26/b/e/2/9/1622014505032_500.jpg",
            creator: "Ed Sheeran",
            lyric: "https://lrc-nct.nixcdn.com/2017/06/20/a/c/0/4/1497891884063.lrc",
            music: "https://aredir.nixcdn.com/Warner_Audio38/ShapeOfYou-EdSheeran-6443488.mp3?st=ycuZei2P_WKHl48bXVvUlA&e=1631635369",
            title: "Shape Of You",
            url: "https://www.nhaccuatui.com/bai-hat/shape-of-you-ed-sheeran.syMtBZwXwA76.html"
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
            const { music } = action.payload;
            state.trackList = state.trackList.filter(t => t.music !== music);
            return state;
        }
    },
    extraReducers: {}
});

export const { SET_TRACK_LIST, ADD_TRACK, REMOVE_TRACK } = playerSlice.actions;

export default playerSlice.reducer;