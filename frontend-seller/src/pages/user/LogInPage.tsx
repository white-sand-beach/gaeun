import { Link } from "react-router-dom";
import Logo from "/icons/main-icon-192.png"
import TotalButton from "../../components/ui/TotalButton.tsx";
import LoginAPI from "../../service/user/LogInAPI.ts";
import { useState } from "react";

const LogIn = () => {
    // 로그인에 필요한 정보
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    // useState를 이용, 여러개의 input 상태관리
    // name은 input 태그의 name 옵션
    // value는 input 태그의 value 옵션
    const onChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value,
        });
    };

    // LoginAPI에서 return한 postSellerLogin 함수 불러오기
    const { postSellerLogin } = LoginAPI()
    const onSellerLogin = () => {
        postSellerLogin(loginInfo)
    }
    return (
        <div className="gap-3 no-footer top-[100px]">
            <img src={Logo} alt="메인로고" width="200px" className="mb-[20px]" />
            <input name="email" type="text" placeholder="이메일" className="min-w-[300px] min-h-[50px] border border-[#7F7F7F] font-bold p-3 rounded-[5px]" value={loginInfo.email} onChange={onChangeInfo}/>
            <input name="password" type="password" placeholder="비밀번호" className="min-w-[300px] min-h-[50px] border border-[#7F7F7F] font-bold p-3 rounded-[5px]" value={loginInfo.password} onChange={onChangeInfo}/>
            <div className="flex flex-row min-w-[300px] gap-2">
                <input type="checkbox" className="w-[24px]" />
                <p>아이디 저장하기</p>
            </div>
            <TotalButton title="로그인" onClick={onSellerLogin}/>
            <Link to={"/signup"}>
                <p className="text-[#7F7F7F] font-semibold underline">아직 아이디가 없으신가요?</p>
            </Link>
            <p className="text-[#7F7F7F] font-semibold underline">계정을 잃어버리셨나요?</p>
        </div>
    );
};

export default LogIn;