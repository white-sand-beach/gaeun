import loginpage from "../../assets/kakao/ic.png";
import KakaoLoginButton from "../../components/auth_login/KakaoLoginButton";

const Login = () => {
  return (
    <div className="center h-screen bg-myColor">
      <p className="absolute top-40 text-[40px] font-bold text-white">빨리드셔</p>
      <img src={loginpage} alt="로그인 페이지 배경화면" />
      <div className="absolute bottom-28 mx-4">
        <KakaoLoginButton />
      </div>
    </div>
  );
};

export default Login;
