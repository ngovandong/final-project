import { SET_MUSIC_DATA } from "../redux/slices/musicSlice"
import { useDispatch } from 'react-redux';

export default function useMusicAPI()
{
    const dispatch = useDispatch();

    // const Load_Quizz_API = async () =>
    // {
    //     try
    //     {
    //         const { data } = await GET_QUIZZ();
    //         dispatch(SET_QUIZZ({
    //             listQuizz: data,
    //             isLoading: false,
    //             exception: "",
    //             currentQuizz: data[0]
    //         }));
    //     }
    //     catch
    //     {
    //         console.log("Error occur when load api");
    //         dispatch(SET_QUIZZ({
    //             listQuizz: [],
    //             isLoading: true,
    //             exception: "Error occur when load api",
    //             currentQuizz: null
    //         }));
    //     }
    // };

    return {

    };
}