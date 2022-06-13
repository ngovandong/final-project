import { SET_TRACK_LIST, ADD_TRACK, REMOVE_TRACK, SHUFFLE_TRACK } from "../redux/slices/playerSlice"
import { useDispatch } from 'react-redux';

export default function useMusic()
{
    const dispatch = useDispatch();

    const getTrackListFromDB = async () =>
    {
        const trackList = [];
        dispatch(SET_TRACK_LIST(trackList));
    };

    const addTrackToPlayer = (track) =>
    {
        dispatch(ADD_TRACK(track));
    };

    const removeTrackFromPlayer = (track) =>
    {
        dispatch(REMOVE_TRACK(track));
    };

    const shuffleTrackList = () =>
    {
        dispatch(SHUFFLE_TRACK());
    };

    return {
        getTrackListFromDB, addTrackToPlayer,
        removeTrackFromPlayer, shuffleTrackList
    };
}