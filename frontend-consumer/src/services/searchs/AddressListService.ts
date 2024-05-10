import axios from "axios";
import Cookies from "universal-cookie";
import AddressData from "../../types/AdressDataType";

const cookies = new Cookies();
const token = cookies.get("accessToken");

const AddressListForm = async (
  setAddresses: (addresses: AddressData[]) => void
): Promise<void> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/locations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setAddresses(response.data.data.locations);
  } catch (error: any) {
    console.log("주소리스트 에러");
  }
};

export default AddressListForm;
