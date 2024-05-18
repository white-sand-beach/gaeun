import axiosInstance from "../authentication/AxiosSet";

const PopularSearchListService = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get('/api/search-keywords');
    console.log(response.data);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export default PopularSearchListService;