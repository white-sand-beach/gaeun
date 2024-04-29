import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginCallback = async () => {
      try {
        const params = new URL(window.location.href);
        const nextPage = params.searchParams.get("next-page");

        // const acessToken = params.searchParams.get("Authorization");
        // localStorage.setItem("acessToken", acessToken)

        if (nextPage === "login") {
          navigate("/"); // 로그인 페이ll지로 이동
        } else if (nextPage === "sign-up") {
          navigate("/signup"); // 회원가입 페이지로 이동
        }
      } catch (error) {
        console.error("로그인 콜백 처리 중 에러 발생:", error);
      }
    };

    handleLoginCallback();
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default LoginCallback;
