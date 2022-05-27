import queryString from 'query-string';
import axios from 'axios';

const BASE_URL = "https://0zn8fg.deta.dev/";

const callAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
});

callAPI.interceptors.request.use((config) =>
{
    return config;
}, (error) =>
{
    return Promise.reject(error);
});

callAPI.interceptors.response.use((response) =>
{
    return response;
}, async (error) =>
{
    return Promise.reject(error);
});

export default callAPI;