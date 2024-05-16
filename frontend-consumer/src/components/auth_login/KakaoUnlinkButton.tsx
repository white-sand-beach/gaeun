const API_BASE_URL = import.meta.env.VITE_API_URL;

const KakaoUnlinkButton = () => {
  const handleKakaoUnlink = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/consumer/login`
    );
    const loginUrl = `${API_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectUri}&mode=unlink`;
    window.location.href = loginUrl;
  };

  return <button onClick={handleKakaoUnlink}>회원탈퇴</button>;
};

export default KakaoUnlinkButton;
