import { Link } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import TotalButton from "../../components/ui/TotalButton.tsx";
import LoginAPI from "../../service/user/LogInAPI.ts";
import { useState } from "react";

const LogIn = () => {
  // 로그인에 필요한 정보
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

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
  const { postSellerLogin } = LoginAPI();
  const onSellerLogin = () => {
    postSellerLogin(loginInfo);
  };
  return (
    <div className="gap-3 no-footer top-[150px]">
      <img src={Logo} alt="메인로고" className="w-[300px] mb-[20px]" />

      <div>
        <p className="text-3xl font-bold mb-4 pl-2">이메일</p>
        <input
          name="email"
          type="text"
          placeholder="example@eamil.com"
          className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
          value={loginInfo.email}
          onChange={onChangeInfo}
        />
      </div>
      <div className="py-4">
        <p className="text-3xl font-bold mb-4 pl-2">비밀번호</p>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
          value={loginInfo.password}
          onChange={onChangeInfo}
        />
      </div>
      <div className="flex flex-row min-w-[400px] py-2 pl-1 gap-2">
        <input type="checkbox" className="w-[24px]" />
        <p>아이디 저장하기</p>
      </div>
      <TotalButton title="로그인" onClick={onSellerLogin} />
      <Link to={"/signup"}>
        <p className="text-[#7F7F7F] font-semibold underline">
          아직 아이디가 없으신가요?
        </p>
      </Link>
      <p className="text-[#7F7F7F] font-semibold underline">
        계정을 잃어버리셨나요?
      </p>
    </div>
  );
};

export default LogIn;
