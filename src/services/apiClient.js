import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.gulfbase.com/api/',
  timeout: 15000
})

export default axiosInstance