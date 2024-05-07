import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("accessToken");

const AddressCirrectionForm = async (
  addressId: number,
  alias: string,
  onSuccess: () => void,
  onError: (error: any) => void
): Promise<void> => {
  const aliasData = { alias }; // 별칭 데이터 구성
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/locations/${addressId}`,
      aliasData,
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

export default AddressCirrectionForm;
