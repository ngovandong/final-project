import { SET_TRACK_LIST, ADD_TRACK, REMOVE_TRACK, SHUFFLE_TRACK } from "../redux/slices/playerSlice"
import { restoreTrackList } from "../helpers/asyncStorage";
import { useDispatch } from 'react-redux';

export default function useMusic()
{
    const dispatch = useDispatch();

    const getRestoredTrackList = async () =>
    {
        const trackList = await restoreTrackList();
        if (trackList) dispatch(SET_TRACK_LIST(trackList));
    };

    const addTrackToPlayer = async (track) =>
    {
        dispatch(ADD_TRACK(track));
    };

    const removeTrackFromPlayer = (track) =>
    {
        dispatch(REMOVE_TRACK(track));
    };

    const shuffleTrackList = (currentIndex) =>
    {
        dispatch(SHUFFLE_TRACK(currentIndex));
    };

    return {
        getRestoredTrackList, addTrackToPlayer,
        removeTrackFromPlayer, shuffleTrackList
    };
}