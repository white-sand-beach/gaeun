import loginpage from "../../assets/kakao/loginpage.png";
import KakaoLoginButton from "../../components/auth_login/KakaoLoginButton";

const Login = () => {
  return (
    <div className="relative">
      <img className="w-full" src={loginpage} alt="로그인 페이지 배경화면" />
      <div className="absolute bottom-28 mx-4">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
