import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken");

interface locationsData {
  address: string;
  alias: string;
  roadAddress: string;
  longitude: number;
  latitude: number;
}

const AddressRegistrationForm = async (
  locationsData: locationsData,
  onSuccess: () => void, // 성공 시 실행할 콜백 함수
  onError: (error: any) => void // 오류 시 실행할 콜백 함수
): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/locations`,
      locationsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    onSuccess(); // 성공 콜백 호출
  } catch (error) {
    onError(error); // 오류 콜백 호출
  }
};

export default AddressRegistrationForm;
