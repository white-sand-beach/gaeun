import logo from "../../assets/kakao/logo.png";
import KakaoLoginButton from "../../components/auth_login/KakaoLoginButton";

const Login = () => {
  return (
    <div className="center h-screen bg-myColor">
      <p className="absolute top-32 text-[60px] font-bold font-serif text-white">가은<span className="text-3xl">,</span></p>
      <img src={logo} alt="로그인 페이지 배경화면" />
      <div className="absolute bottom-28 mx-4">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
