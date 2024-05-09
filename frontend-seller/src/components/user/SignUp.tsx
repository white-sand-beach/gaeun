import React from "react";
import TotalButton from "../ui/TotalButton";
import { InputSignupType } from "../../types/user/InputSignupType";

const SignUp: React.FC<InputSignupType> = (props) => {
    return (
        <div className="flex flex-col gap-3">
            {/* 이메일 입력 */}
            <p className="m-2 text-2xl font-bold">이메일</p>
            <div className="flex flex-row gap-3">
                <input name="email" type="text" placeholder="이메일을 입력하세요." className="w-[240px] border-b-2" value={props.email} onChange={props.onChangeInfo} />
                <button className="detail-btn w-[72px]" onClick={props.onCheckEmail}>중복확인</button>
            </div>
            {props.isValidEmail ? <p className="font-bold text-green-500">{props.validEmail}</p> : <p className="font-bold text-red-500">{props.validEmail}</p>}

            {/* 비밀번호 입력 */}
            <p className="m-2 text-2xl font-bold">비밀번호</p>
            <div className="flex flex-col gap-3">
                <input name="password" type="password" placeholder="비밀번호" className="w-full border-b-2" value={props.password} onChange={props.onChangeInfo} />
                <input name="passwordCheck" type="password" placeholder="비밀번호 확인" className="w-full border-b-2" value={props.passwordCheck} onChange={props.onChangeInfo} />
            </div>
            {props.password.length < 8 && <p className="font-bold text-red-500">비밀번호가 너무 짧습니다!</p>}
            {props.password.length > 20 && <p className="font-bold text-red-500">비밀번호가 너무 깁니다!</p>}
            {(props.password !== props.passwordCheck) && <p className="font-bold text-red-500">비밀번호를 다시 확인해주세요!</p>}

            {/* 전화번호 인증 */}
            <p className="m-2 text-2xl font-bold">전화번호 인증</p>
            <div className="flex flex-col gap-3">

                {/* 인증 요청하기 */}
                {/* 어떤 방식으로 인증을 요청할지 아직 미정 */}
                <div className="flex flex-row gap-3">
                    <input name="phoneNumber" type="text" placeholder="전화번호를 입력하세요." className="w-[240px] border-b-2" value={props.phoneNumber} onChange={props.onChangeInfo} />
                    <button className="detail-btn w-[72px]">인증</button>
                </div>
                {/* 10자리 미만, 11자리 초과일 경우 안내문 출력 */}

                {(props.phoneNumber && (props.phoneNumber.length < 10 || props.phoneNumber.length > 11)) && <p className="font-bold text-red-500">핸드폰번호를 확인해주세요</p>}

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
                <input name="registeredNo" type="text" placeholder="사업자등록번호를 입력하세요." className="w-[240px] border-b-2" value={props.registeredNo} onChange={props.onChangeInfo} />
                <button className="detail-btn w-[72px]" onClick={props.onCheckRegisteredNo}>인증</button>
            </div>
            {props.registeredNo.length > 10 && <p className="font-bold text-red-500">등록번호는 최대 10자리 수 입니다!</p>}
            {props.isValidRegisteredNo ? <p className="font-bold text-green-500">{props.validRegisteredNo}</p> : <p className="font-bold text-red-500">{props.validRegisteredNo}</p>}

            {/* 가입하기 */}
            <TotalButton
                title="가입하기"
                onClick={props.onSignup} />
            {props.isValidSignup ? <p className="font-bold text-green-500">{props.validSignup}</p> : <p className="font-bold text-red-500">{props.validSignup}</p>}
        </div>
    );
};

export default SignUp;