import axiosInstance from "../authentication/AxiosSet";
import { CategoryResponse } from "../../types/CategoryType";

const CategoryForm = async (): Promise<CategoryResponse> => {

  const response = await axiosInstance.get(
    `${import.meta.env.VITE_API_URL}/api/categories`);
  return response.data.data;
}

export default CategoryForm;