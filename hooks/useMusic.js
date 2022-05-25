import { SET_TOP_CATEGORY, SET_SONGS, SET_MUSIC_DATA } from "../redux/slices/musicSlice"
import { GET_TOP_CATEGORY, FILTER_BY_TOP_CATEGORY } from "../api/apiMusic";
import TopCategoryContext from "../models/TopCategoryContext";
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
        const { data: tc } = await GET_TOP_CATEGORY();
        const top_category = tc.data;
        Object.getOwnPropertyNames(top_category).forEach(top =>
        {
            // Thêm vào DB
            TopCategoryContext.create({
                top: top,
                category: JSON.stringify(top_category[top])
            });
            // Lấy danh sách bài hát của từng Top và Category
            top_category[top].forEach(async (category) =>
            {
                const { data: songs } = await FILTER_BY_TOP_CATEGORY({
                    top: top,
                    category: category
                });
                // Lưu bài hát vào Database, kèm thêm top và category tương ứng
                songs.data.forEach(s =>
                {
                    SongContext.create({
                        ...s,
                        top: top,
                        category: category
                    });
                });
            });
        });
        console.log(">> Save music to database");
    };

    const Get_Music_DB = async () =>
    {
        // Kiểm tra xem Database đã có dữ liệu hay chưa
        // Nếu chưa có thì tự động gọi API để lấy và lưu vào DB
        let TopCategoryDB = await TopCategoryContext.query();
        if (TopCategoryDB.length == 0) await Get_Music_API();

        // Lấy dữ liệu TopCategory từ DB
        TopCategoryDB = await TopCategoryContext.query();
        // Dispatch vào Redux Store
        TopCategoryDB = TopCategoryDB.map(tc => (
            {
                top: tc.top,
                category: JSON.parse(tc.category)
            }));
        dispatch(SET_TOP_CATEGORY(TopCategoryDB));
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

    return {
        Create_Table, Drop_Table, Get_Music_API, Get_Music_DB,
        Delete_TopCategory, Delete_Song, Delete_All
    };
}