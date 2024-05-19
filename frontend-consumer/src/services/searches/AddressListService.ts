import axiosInstance from "../authentication/AxiosSet";
import AddressData from "../../types/AdressDataType";

const AddressListForm = async (
  setAddresses: (addresses: AddressData[]) => void
): Promise<void> => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API_URL}/api/locations`,
    );
    setAddresses(response.data.data.locations);
  } catch (error: any) {
    console.log("주소리스트 에러");
  }
};

export default AddressListForm;
