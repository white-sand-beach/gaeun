import axios from "axios";
import Cookies from "universal-cookie";
import TokenState from "../../types/TokenState ";

const ReissueService = async (): Promise<TokenState> => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/reissue`,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  cookies.remove("accessToken", { path: "/" });
  const NewAccessToken = response.headers["Authorization"];
  cookies.set("accessToken", NewAccessToken, { path: "/" });
  console.log("토큰 재발급에 성공하였습니다", NewAccessToken);
  return response.data;
};

export default ReissueService;
