import axiosInstance from "./AxiosSet";
import Cookies from "universal-cookie";
import TokenState from "../../types/TokenState ";

const ReissueService = async (): Promise<TokenState> => {
  const cookies = new Cookies();
  const response = await axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/api/reissue`,
    null,
  );
  cookies.remove("accessToken", { path: "/" });
  const accessToken = response.headers["Authorization"];
  cookies.set("accessToken", accessToken, { path: "/" });
  console.log(
    "토큰 재발급에 성공하였습니다",
    response.headers["authorization"]
  );
  return response.data;
};

export default ReissueService;
