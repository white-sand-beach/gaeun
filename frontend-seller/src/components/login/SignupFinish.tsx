import FinishLogo from "../../assets/signup-finish.gif"
import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton.tsx";

const SignupFinish = () => {
    const navigate = useNavigate()
    return (
        <div className="main-layout">
            <p className="font-bold">회원가입을 성공적으로 완료하였습니다!</p>
            <img src={FinishLogo} alt="회원가입 완료"/>
            <TotalButton title="로그인 하러가기" onClick={() => navigate("/login")} />
        </div>
    );
};

export default SignupFinish;