import axios from "axios";
import Cookies from "universal-cookie";
import TokenState from "../../types/TokenState ";

const ReissueService = async (): Promise<TokenState> => {
  const cookies = new Cookies();

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/reissue`,
    null,
    {
      withCredentials: true,
    }
  );
  cookies.remove("accessToken", { path: "/" });
  const accessToken = response.headers["authorization"];
  cookies.set("accessToken", accessToken, { path: "/" });
  console.log("토큰 재발급에 성공하였습니다");
  return response.data;
};

export default ReissueService;