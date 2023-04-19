import axios from "axios";
import {parseCookies} from "nookies";

export const api = axios.create({ baseURL: "http://localhost:8080" })
api.interceptors.request.use(
config => {
    const cookies = parseCookies();
    config.headers.Authorization = `Bearer ${cookies.token}`;
    config.headers["Content-Type"] = 'application/json';
    return config;
});