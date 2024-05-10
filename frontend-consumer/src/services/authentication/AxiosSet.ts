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
    config.headers["Content-Type"] = "application/json";
  }
  console.log("요청이 보내지는 정보 로그:", config);
  return config;
}, (error) => {
  console.error("에러시 보내지는 에러:", error);
  return Promise.reject(error);
});

// 응답 인터셉터
axiosInstance.interceptors.response.use((response) => {
  console.log("성공 응답의 상태 코드 로그:", response.status, response.config);
  // 성공 시 response 반환
  return response;
}, async (error) => {
  const originalRequest = error.config;
  console.error("에러 응답의 상태 코드:", error.response.status, "요청 정보 로그:", originalRequest);
  // accessToken이 유효하지 않을 경우
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true; // 재시도 
    console.error("유효하지 않은 토큰입니다. 메시지:", error.response.data.message, "상태:", error.response.data.status);
    try {
      await ReissueService(); // 토큰 재발급
      return axiosInstance(originalRequest); // 재발급 받은 토큰으로 원래 API 다시 요청함
    } catch (e) {
      console.error("리프레쉬 토큰 발급 실패:", e);
      return Promise.reject(e);
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
