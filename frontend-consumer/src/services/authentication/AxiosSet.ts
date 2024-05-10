import axios from "axios";
import Cookies from "universal-cookie";
import ReissueService from "./ReissueService"; 

const cookies = new Cookies();
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const accessToken = cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`; // 모든 요청에 accessToken을 헤더에 추가
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터
axiosInstance.interceptors.response.use((response) => {
  // 성공 시 response 반환
  return response;
}, async (error) => {
  const originalRequest = error.config;
  // accessToken이 유효하지 않을 경우
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // 재시도 
    try {
      await ReissueService(); // 토큰 재발급
      return axiosInstance(originalRequest); // 재발급 받은 토큰으로 원래 API 다시 요청함
    } catch (e) {
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
