import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LogoutService from "../../services/accounts/LogoutService";

const LogoutButton = () => {
  const cookies = new Cookies();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await LogoutService();
      cookies.remove("accessToken", { path: '/' })
      Navigate("/login")
    } catch (error) {
      console.log("로그아웃 실패", error)
    }
  }

  return(
    <button onClick={handleLogout}>
      로그아웃
    </button>
  )
}

export default LogoutButton;