import { useLocation, useNavigate } from "react-router-dom";
import UpdateProfileForm from "../../services/accounts/ProfileUpdateService";
import UserState from "../../types/UserState";

const ProfileUpdateButton = ({
  nickname,
  profileImage,
  imageUrl,
  phoneNumber,
  buttonText,
  isDonated,
}: UserState) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await UpdateProfileForm({
        nickname,
        phoneNumber,
        profileImage,
        imageUrl,
        isDonated,
      });
      console.log(response);
      alert("회원정보 수정을 성공하였습니다!");

      if (location.pathname === "/sign-up") {
        navigate("/");
      }
    } catch (error) {
      console.log("실패", error);
    }
  };

  return (
    <button
      className="w-[330px] footer-button text-center"
      onClick={handleSignUp}
    >
      {buttonText}
    </button>
  );
};

export default ProfileUpdateButton;
