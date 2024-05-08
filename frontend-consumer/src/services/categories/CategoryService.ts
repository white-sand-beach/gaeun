import axios from "axios";
import Cookies from "universal-cookie";
import { CategoryResponse } from "../../types/CategoryType";

const CategoryForm = async (): Promise<CategoryResponse> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/categories`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data.data;
}

export default CategoryForm;