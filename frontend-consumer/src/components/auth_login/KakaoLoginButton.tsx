import kakao from "../../assets/kakao/kakao.png";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/consumer/login-callback`
    );
    const loginUrl = `${API_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}&mode=login`;
    window.location.href = loginUrl;
  };

  return (
    <button onClick={handleKakaoLogin}>
      <img src={kakao} alt="카카오 로그인 버튼" />
    </button>
  );
};

export default KakaoLoginButton;
