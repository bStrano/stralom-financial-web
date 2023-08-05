import axios from "axios";

export const axiosDefault = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    timeout: 30000,
});
export const axiosAuthentication = axios.create({
    baseURL: process.env.NEXT_PUBLIC_AUTH_ENDPOINT,
    timeout: 30000,
});
