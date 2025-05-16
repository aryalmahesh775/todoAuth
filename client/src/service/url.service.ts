import axios from "axios"

// const APIURL = 'http://localhost:3000'
const APIURL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    baseURL: APIURL,
    withCredentials: true
})

export default axiosInstance;