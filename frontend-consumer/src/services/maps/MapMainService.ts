import axiosInstance from "../authentication/AxiosSet";
import MainMapData from "../../types/MainMapDataType";

const MapListForm = async (mainData: MainMapData): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/api/stores`,
      {
        params: {
          // `mainData` 객체의 필드를 API 요청의 쿼리 파라미터로 사용
          longitude: mainData.longitude,
          latitude: mainData.latitude,
          page: mainData.page,
          size: mainData.size,
          radius: mainData.radius,
          sort: mainData.sort,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error("주소리스트 에러", error); // 에러 로깅 개선
  }
};
export default MapListForm;
