import ProfileUpdateService from "../../services/ProfileUpdateService";

const SignUpButton = () => {
  const { mutate, isLoading } = ProfileUpdateService();

  const handleSignUp = () => {
    mutate();
  }
  return (
    <button
      className="footer-button text-center"
      onClick={handleSignUp}
      disabled={isLoading}
    >
      {isLoading ? "회원가입 중..." : "회원가입"}
    </button>
  )
}

export default SignUpButton;