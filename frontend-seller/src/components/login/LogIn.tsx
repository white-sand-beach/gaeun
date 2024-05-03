import { Link } from "react-router-dom";
import Logo from "/icons/size-192.png"
import TotalButton from "../ui/TotalButton.tsx";

const LogIn = () => {
    return (
        <>
            <img src={Logo} alt="메인로고" width="200px" className="mb-[20px]" />
            <input type="text" placeholder="이메일" className="min-w-[300px] min-h-[50px] border border-[#7F7F7F] font-bold p-3 rounded-[5px]" />
            <input type="password" placeholder="비밀번호" className="min-w-[300px] min-h-[50px] border border-[#7F7F7F] font-bold p-3 rounded-[5px]" />
            <div className="flex flex-row min-w-[300px] gap-2">
                <input type="checkbox" className="w-[24px]" />
                <p>아이디 저장하기</p>
            </div>
            <TotalButton title="로그인"/>
            <Link to={"/signup"}>
                <p className="text-[#7F7F7F] font-semibold underline">아직 아이디가 없으신가요?</p>
            </Link>
            <p className="text-[#7F7F7F] font-semibold underline">계정을 잃어버리셨나요?</p>
        </>
    );
};

export default LogIn;