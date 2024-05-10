import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginCallback = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const handleLoginCallback = async () => {
      try {
        const params = new URL(window.location.href);
        const nextPage = params.searchParams.get("next-page");
        const accessToken = params.searchParams.get("access-token");
        console.log(nextPage);

        if (accessToken) {
          cookies.set("accessToken", accessToken, { path: "/" });
        }

        console.log(cookies, nextPage, accessToken);

        if (nextPage === "login") {
          navigate("/"); // 로그인 페이지로 이동
        } else if (nextPage === "sign-up") {
          navigate("/sign-up"); // 회원가입 페이지로 이동
        }
      } catch (error) {
        console.error("로그인 콜백 처리 중 에러 발생:", error);
      }
    };

    handleLoginCallback();
  }, [navigate, cookies]);

  return <div>로그인 중...</div>;
};

export default LoginCallback;
