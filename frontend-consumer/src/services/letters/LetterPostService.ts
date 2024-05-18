import axiosInstance from "../authentication/AxiosSet";
import { LetterData } from "../../types/LetterDataType"; // LetterData.ts에서 LetterData 인터페이스 가져오기

const LetterPostForm = async (letterData: LetterData): Promise<LetterData> => {
  try {
    // 폼 데이터 생성
    const formData = new FormData();
    formData.append("content", letterData.content);
    if (letterData.image) {
      formData.append("image", letterData.image);
    }
    formData.append("storeId", String(letterData.storeId));
    formData.append("orderInfoId", String(letterData.orderInfoId));

    // API 요청 보내기
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_API_URL}/api/reviews`,
      formData
    );

    // 요청 성공 시 처리
    return response.data;
  } catch (error) {
    // 요청 실패 시 처리
    console.error("Error:", error);
    throw error;
  }
};

export default LetterPostForm;
