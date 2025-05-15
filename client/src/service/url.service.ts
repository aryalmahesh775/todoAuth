import axios from "axios"

const APIURL = 'http://localhost:3000'

const axiosInstance = axios.create({
    baseURL: APIURL,
    withCredentials: true
})

export default axiosInstance;