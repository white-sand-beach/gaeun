import React, { useState } from "react";
import { postEmailCheck, postCheckRegisterNo, postSignUp } from "../../service/user/SignupAPI.ts";
import SignUp from "../../components/user/SignUp.tsx";

const SignupPage = () => {
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 중복 확인 ( 중복이면 false )
    const [validEmail, setValidEmail] = useState(""); // 이메일 중복에 따른 문구 출력

    const [isValidRegisteredNo, setIsValidRegisteredNo] = useState(true) // 사업자 등록번호 사용 가능 여부 ( 불가면  false )
    const [validRegisteredNo, setValidRegisteredNo] = useState("") // 사업자 등록번호 사용 가능 여부에 따른 문구 출력

    const [isValidSignup, setIsValidSignup] = useState(true) // 회원가입 성공 여부 ( 실패시 false )
    const [validSignup, setValidSignup] = useState("") // 회원가입 실패 시 문구 출력

    // 회원가입 관련 정보
    const [sellerInfo, setSellerInfo] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        phoneNumber: "",
        registeredNo: "",
    });

    // useState를 이용, 여러개의 input 상태관리
    // name은 input 태그의 name 옵션
    // value는 input 태그의 value 옵션
    const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setSellerInfo({
            ...sellerInfo,
            [name]: value,
        });
    };

    // 이메일 유효 확인 api 요청
    const handleCheckEmail = () => {
        postEmailCheck({
            email: sellerInfo.email, 
            setValid: setIsValidEmail, 
            setComment: setValidEmail
        });
    };

    // 사업자 등록번호 확인 api 요청
    const handleCheckRegisteredNo = () => {
        postCheckRegisterNo({
            registeredNo: sellerInfo.registeredNo,
            setValid: setIsValidRegisteredNo,
            setComment: setValidRegisteredNo
        });
    };

    // 회원가입 api 요청
    const handleSignup = () => {
        postSignUp({
            email: sellerInfo.email,
            password: sellerInfo.password,
            phoneNumber: sellerInfo.phoneNumber,
            registeredNo: sellerInfo.registeredNo,
            setValid: setIsValidSignup,
            setComment: setValidSignup
        })
    }

    return (
        <div className="no-footer top-[60px]">
            <SignUp 
            email={sellerInfo.email}
            password={sellerInfo.password}
            passwordCheck={sellerInfo.passwordCheck}
            phoneNumber={sellerInfo.phoneNumber}
            registeredNo={sellerInfo.registeredNo}
            isValidEmail={isValidEmail}
            validEmail={validEmail}
            isValidRegisteredNo={isValidRegisteredNo}
            validRegisteredNo={validRegisteredNo}
            isValidSignup={isValidSignup}
            validSignup={validSignup}
            onChangeInfo={handleChangeInfo}
            onCheckEmail={handleCheckEmail}
            onCheckRegisteredNo={handleCheckRegisteredNo}
            onSignup={handleSignup}/>
        </div>
    );
};

export default SignupPage;