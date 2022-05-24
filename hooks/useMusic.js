import { GET_TOP_CATEGORY, FILTER_BY_TOP_CATEGORY } from "../api/apiMusic";
import TopCategoryContext from "../models/TopCategoryContext";
import { SET_MUSIC_DATA } from "../redux/slices/musicSlice"
import SongContext from "../models/SongContext";
import { useDispatch } from 'react-redux';

export default function useMusic()
{
    const dispatch = useDispatch();

    const Create_Table = async () =>
    {
        await TopCategoryContext.createTable();
        await SongContext.createTable();
        console.log(">> Created music table");
    };

    const Drop_Table = async () =>
    {
        await TopCategoryContext.dropTable();
        await SongContext.dropTable();
        console.log(">> Dropped music table");
    };

    const Get_Music_API = async () =>
    {

    };

    const Get_TopCategory_DB = async () =>
    {
        // const TopCategoryDB = await TopCategoryContext.query();
        // if (TopCategoryDB.length == 0)
        //     await Get_Station_From_API();
        // else dispatch(SET_LIST_STATION(TopCategoryDB));
    };

    const Delete_TopCategory = async (id) =>
    {
        await TopCategoryContext.destroy(id);
    };

    const Delete_Song = async (id) =>
    {
        await SongContext.destroy(id);
    };

    const Delete_All = async () =>
    {
        await TopCategoryContext.destroyAll();
        await SongContext.destroyAll();
        console.log(">> Cleared music table");
    };

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