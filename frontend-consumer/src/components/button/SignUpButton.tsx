// import ProfileUpdateService from "@/services/ProfileUpdateService";
import UpdateProfileForm from "@/services/accounts/ProfileUpdateService";
import UserState from "@/types/UserState";

const SignUpButton = ({ nickname, phoneNumber, profileImage }: UserState) => {
  // const { mutate, isLoading } = ProfileUpdateService();

  const handleSignUp = async (event: React.FormEvent<HTMLButtonElement>) => {
    // mutate();
    event.preventDefault();
    try {
      const response = await UpdateProfileForm({
        nickname,
        phoneNumber,
        profileImage,
      });
      console.log(response.data);
    } catch (error) {
      console.log("실패");
    }
  };

  return (
    <button
      className="footer-button text-center"
      onClick={handleSignUp}
      // disabled={isLoading}
    >
      회원가입
      {/* {isLoading ? "회원가입 중..." : "회원가입"} */}
    </button>
  );
};

export default SignUpButton;
