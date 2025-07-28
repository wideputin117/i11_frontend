import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT == 'development' ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL : process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL

console.log("the base url is", baseUrl)

export const axiosInstance = axios.create({
    baseURL:baseUrl,
    withCredentials: true,
});