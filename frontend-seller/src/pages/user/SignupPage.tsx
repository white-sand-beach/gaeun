import React, { useState } from "react";
import TotalButton from "../../components/ui/TotalButton.tsx";
import { useNavigate } from "react-router-dom";
import { postEmailCheck, postCheckRegisterNo, postSignUp } from "../../service/user/SignupAPI.ts";

const SignUp = () => {
    const navigate = useNavigate()
    const [isValidEmail, setIsValidEmail] = useState(true); // 이메일 중복 확인 ( 중복이면 false )
    const [validEmail, setValidEmail] = useState(""); // 이메일 중복에 따른 문구 출력

    const [isValidRegisterNo, setIsValidRegisterNo] = useState(true) // 사업자 등록번호 사용 가능 여부 ( 불가면  false )
    const [validRegisterNo, setValidRegisterNo] = useState("") // 사업자 등록번호 사용 가능 여부에 따른 문구 출력

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
    const onChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setSellerInfo({
            ...sellerInfo,
            [name]: value,
        });
        console.log(`${[name]}: ${value}`);
    };

    // 이메일 유효 확인 api 요청
    const onCheckEmail = () => {
        postEmailCheck({
            email: sellerInfo.email, 
            setValid: setIsValidEmail, 
            setComment: setValidEmail
        });
    };

    // 사업자 등록번호 확인 api 요청
    const onCheckRegisterNo = () => {
        postCheckRegisterNo({
            registeredNo: sellerInfo.registeredNo,
            setValid: setIsValidRegisterNo,
            setComment: setValidRegisterNo
        });
    };

    // 회원가입 api 요청
    const onSignup = () => {
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
        <div className="no-footer top-[75px]">
            <div className="flex flex-col gap-3">
                {/* 이메일 입력 */}
                <p className="m-2 text-2xl font-bold">이메일</p>
                <div className="flex flex-row gap-3">
                    <input name="email" type="text" placeholder="이메일을 입력하세요." className="w-[240px] border-b-2" value={sellerInfo.email} onChange={onChangeInfo}/>
                    <button className="detail-btn w-[72px]" onClick={onCheckEmail}>중복확인</button>
                </div>
                {isValidEmail ? <p className="font-bold text-green-500">{validEmail}</p> : <p className="font-bold text-red-500">{validEmail}</p>}

                {/* 비밀번호 입력 */}
                <p className="m-2 text-2xl font-bold">비밀번호</p>
                <div className="flex flex-col gap-3">
                    <input name="password" type="password" placeholder="비밀번호" className="w-full border-b-2" value={sellerInfo.password} onChange={onChangeInfo} />
                    <input name="passwordCheck" type="password" placeholder="비밀번호 확인" className="w-full border-b-2" value={sellerInfo.passwordCheck} onChange={onChangeInfo} />
                </div>
                {(sellerInfo.password !== sellerInfo.passwordCheck) && <p className="font-bold text-red-500">비밀번호를 다시 확인해주세요!</p>}

                {/* 전화번호 인증 */}
                <p className="m-2 text-2xl font-bold">전화번호 인증</p>
                <div className="flex flex-col gap-3">
                    
                    {/* 인증 요청하기 */}
                    {/* 어떤 방식으로 인증을 요청할지 아직 미정 */}
                    <div className="flex flex-row gap-3">
                        <input name="phoneNumber" type="text" placeholder="전화번호를 입력하세요." className="w-[240px] border-b-2" value={sellerInfo.phoneNumber} onChange={onChangeInfo} />
                        <button className="detail-btn w-[72px]">인증</button>
                    </div>
                    {/* 10자리 미만, 11자리 초과일 경우 안내문 출력 */}

                    {(sellerInfo.phoneNumber && (sellerInfo.phoneNumber.length < 10 || sellerInfo.phoneNumber.length > 11)) && <p className="font-bold text-red-500">핸드폰번호를 확인해주세요</p>}
                    
                    {/* 받은 인증번호 입력칸 */}
                    {/* 인증 방식에 따라서 없어질 수 있음 */}
                    <div className="flex flex-row gap-3">
                        <input type="text" placeholder="인증번호를 입력하세요." className="w-[240px] border-b-2" />
                        <button className="detail-btn w-[72px]">인증확인</button>
                    </div>
                </div>

                {/* 사업자 등록번호 인증 */}
                <p className="m-2 text-2xl font-bold">사업자 등록번호</p>
                <div className="flex flex-row gap-3">
                    <input name="registeredNo" type="text" placeholder="사업자등록번호를 입력하세요." className="w-[240px] border-b-2" value={sellerInfo.registeredNo} onChange={onChangeInfo} />
                    <button className="detail-btn w-[72px]" onClick={onCheckRegisterNo}>인증</button>
                </div>
                {sellerInfo.registeredNo.length > 10 && <p className="font-bold text-red-500">등록번호는 최대 10자리 수 입니다!</p>}
                {isValidRegisterNo ? <p className="font-bold text-green-500">{validRegisterNo}</p> : <p className="font-bold text-red-500">{validRegisterNo}</p>}

                {/* 가입하기 */}
                <TotalButton
                    title="가입하기"
                    onClick={onSignup} />
                {isValidSignup ? <p className="font-bold text-green-500">{validSignup}</p> : <p className="font-bold text-red-500">{validSignup}</p>}
            </div>
        </div>
    );
};

export default SignUp;