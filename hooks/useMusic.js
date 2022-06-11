import { SET_TOP_CATEGORY, SET_CURRENT_TC, SET_SONGS } from "../redux/slices/musicSlice"
import { getTopCategoryAPI, getByTopCategoryAPI } from "../api/apiMusic";
import TopCategoryContext from "../models/TopCategoryContext";
import SongContext from "../models/SongContext";
import { useDispatch } from 'react-redux';

export default function useMusic()
{
    const dispatch = useDispatch();

    const createMusicTable = async () =>
    {
        await TopCategoryContext.createTable();
        await SongContext.createTable();
        console.log(">> Created music table");
    };

    const dropMusicTable = async () =>
    {
        await TopCategoryContext.dropTable();
        await SongContext.dropTable();
        console.log(">> Dropped music table");
    };

    const getMusicAPI = async () =>
    {
        // Gọi API để lấy về Top và Category
        const { data: tc } = await getTopCategoryAPI();
        const top_category = tc.data;
        // Duyệt qua các Key của Object - các Top 100 : top100_VN, top100_AM, ...
        Object.getOwnPropertyNames(top_category).forEach(top =>
        {
            // Thêm vào DB, chuyển mảng các category thành JSON
            TopCategoryContext.create({
                top: top,
                category: JSON.stringify(top_category[top])
            });
            // Lấy danh sách bài hát của từng Top và Category
            top_category[top].forEach(async (category) =>
            {
                const { data: songs } = await getByTopCategoryAPI({
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

    const getMusicDB = async () =>
    {
        try
        {
            // Lấy dữ liệu TopCategory từ DB
            let TopCategoryDB = await TopCategoryContext.query();
            // Nếu database chưa có thì tự động gọi API để lấy và lưu vào DB
            if (TopCategoryDB.length == 0)
            {
                await getMusicAPI();
                // Lấy dữ liệu TopCategory từ DB
                TopCategoryDB = await TopCategoryContext.query();
            }
            // JSON parse cho mảng Category
            TopCategoryDB = TopCategoryDB.map(tc => (
                {
                    top: tc.top,
                    category: JSON.parse(tc.category)
                }));
            // Dispatch vào Redux Store
            dispatch(SET_TOP_CATEGORY({
                top_category: TopCategoryDB,
                isLoading: false,
                exception: ""
            }));
        }
        catch
        {
            dispatch(SET_TOP_CATEGORY({
                top_category: [],
                isLoading: true,
                exception: "Error !"
            }));
        }
    };

    const setCurrentTopCategory = (tc) =>
    {
        dispatch(SET_CURRENT_TC(tc));
    };

    const setCurrentSongs = (songs) =>
    {
        dispatch(SET_SONGS(songs));
    }
    const filterSongTopCategory = async (top, category) =>
    {
        // Lọc ra các bài hát theo top và category
        const filter_songs = await SongContext.filterByTopCategory(top, category);
        dispatch(SET_SONGS(filter_songs));
    };

    const searchSongTitle = async (title) =>
    {
        // Tìm kiếm tương đối tên bài hát theo tiêu đề
        const search_songs = await SongContext.searchByTitle(title);
        dispatch(SET_SONGS(search_songs));
    };

    const clearSongStore = () =>
    {
        // Xóa hết nhạc lưu trong Redux Store
        dispatch(SET_SONGS([]));
    };

    const deleteTopCategory = async (id) =>
    {
        await TopCategoryContext.destroy(id);
    };

    const deleteSong = async (id) =>
    {
        await SongContext.destroy(id);
    };

    const deleteAll = async () =>
    {
        await TopCategoryContext.destroyAll();
        await SongContext.destroyAll();
        console.log(">> Cleared music table");
    };

    const reloadMusic = async () =>
    {
        // Clear mọi thứ
        await dispatch(SET_TOP_CATEGORY({
            top_category: [],
            isLoading: true,
            exception: ""
        }));
        await clearSongStore();
        // Xóa hết dữ liệu trong Database
        await deleteAll();
        // Cập nhật lại Database bằng API
        await getMusicDB();
    };

    return {
        createMusicTable, dropMusicTable, getMusicAPI, getMusicDB, setCurrentTopCategory,
        filterSongTopCategory, searchSongTitle, clearSongStore,
        deleteTopCategory, deleteSong, deleteAll, reloadMusic, setCurrentSongs
    };
}