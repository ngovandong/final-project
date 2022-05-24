import callAPI from "./apiService";

export const SAVE_MUSIC_API_2_MONGO = () => callAPI.get("music/get_from_api");

export const GET_TOP_CATEGORY = (filter) => callAPI.get("music/get_top_category", { params: filter });

export const FILTER_BY_TOP_CATEGORY = () => callAPI.get("music/filter_by_top_category");

export const SEARCH_BY_TITLE = (title) => callAPI.get("music/search_by_title", { params: { title: title } });