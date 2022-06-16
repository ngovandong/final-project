import { createSlice } from '@reduxjs/toolkit';

const init = {
    trackList: [
        {
            avatar: "https://avatar-ex-swe.nixcdn.com/song/2021/09/09/f/c/f/d/1631181753902.jpg",
            bgImage: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/10/29/a/a/d/4/1572318457703_600.jpg",
            coverImage: "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg",
            creator: "Masew, Masiu, B Ray, TAP",
            lyric: "https://lrc-nct.nixcdn.com/null",
            music: "https://aredir.nixcdn.com/NhacCuaTui1021/CuoiThoi-MasewMasiuBRayTAPVietNam-7085648.mp3?st=Fdf-94PGaMjuqak7C3FJzw&e=1631635351",
            title: "Cưới Thôi",
            url: "https://www.nhaccuatui.com/bai-hat/cuoi-thoi-masew-ft-masiu-ft-b-ray-ft-tap.SQTZSysfmPRJ.html"
        }
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
            // Kiểm tra bài này đã có trong TrackList chưa
            let found = false;
            for (let i = 0; i < state.trackList.length; i++)
            {
                if (state.trackList[i].music === action.payload.music)
                {
                    found = true;
                    break;
                }
            }
            // Nếu bài này chưa có thì mới thêm vào cuối mảng
            if (!found)
            {
                state.trackList.push(action.payload);
            }
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
        },
        SHUFFLE_TRACK: (state, action) =>
        {
            let { trackList } = state;
            if (trackList.length > 1)
            {
                // Giữ lại bài hát hiện tại, suffle các bài hát khác
                const currentIndex = action.payload;
                // Lấy bài hiện tại và xóa nó khỏi trackList
                const currentTrack = trackList.splice(currentIndex, 1)[0];
                // Xáo ngẫu nhiên các bài hát khác
                for (let i = trackList.length - 1; i > 0; i--)
                {
                    const j = Math.floor(Math.random() * (i + 1));
                    const temp = trackList[i];
                    trackList[i] = trackList[j];
                    trackList[j] = temp;
                }
                // Thêm lại currentTrack vào lại đúng index ban đầu của nó
                trackList.splice(currentIndex, 0, currentTrack);
                state.trackList = trackList;
            }
            return state;
        }
    },
    extraReducers: {}
});

export const { SET_TRACK_LIST, ADD_TRACK,
    REMOVE_TRACK, SHUFFLE_TRACK } = playerSlice.actions;

export default playerSlice.reducer;