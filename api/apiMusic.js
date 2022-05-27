import callAPI from "./apiService";

export const saveMusic2MongoAPI = () => callAPI.get("music/get_from_api");

export const getTopCategoryAPI = () => callAPI.get("music/get_top_category");

export const getByTopCategoryAPI = (filter) => callAPI.get("music/filter_by_top_category", { params: filter });

export const searchByTitleAPI = (title) => callAPI.get("music/search_by_title", { params: { title: title } });