import FinishLogo from "../../assets/signup-finish.gif"
import { useNavigate } from "react-router-dom";

const SignupFinish = () => {
    const navigate = useNavigate()
    return (
        <div className="main-layout">
            <p className="font-bold">회원가입을 성공적으로 완료하였습니다!</p>
            <img src={FinishLogo} alt="회원가입 완료"/>
            <button className="common-btn" onClick={() => navigate("/login")}>로그인 하러가기</button>
        </div>
    );
};

export default SignupFinish;