import logo from "../../assets/logo/logo.png";
import React from "react";
import TotalButton from "../ui/TotalButton";
import { InputSignupType } from "../../types/user/InputSignupType";

const SignUp: React.FC<InputSignupType> = (props) => {
  return (
    <div className="gap-3 no-footer top-[50px]">
      <img src={logo} alt="로고" className="w-[300px]" />

      {/* 이메일 입력 */}
      <div className="mt-10">
        <p className="text-3xl font-bold mb-4 pl-2">이메일</p>
        <input
          name="email"
          type="text"
          placeholder="이메일을 입력하세요."
          className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
          value={props.email}
          onChange={props.onChangeInfo}
        />

        <button
          className="detail-btn h-[65px] ml-2 w-[100px] text-lg rounded-xl"
          onClick={props.onCheckEmail}
        >
          중복 확인
        </button>
        {props.isValidEmail ? (
          <p className="font-bold pl-2 text-green-500 py-1">{props.validEmail}</p>
        ) : (
          <p className="font-bold pl-2 text-red-300 py-1">{props.validEmail}</p>
        )}
      </div>

      {/* 비밀번호 입력 */}
      <div className="pt-6">
        <p className="text-3xl font-bold mb-4 pl-2">비밀번호</p>
        <div className="flex flex-col">
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            className="w-[508px] p-4 text-lg border-[3px] rounded-xl mb-2"
            value={props.password}
            onChange={props.onChangeInfo}
          />
          <input
            name="passwordCheck"
            type="password"
            placeholder="비밀번호 확인"
            className="w-[508px] p-4 text-lg border-[3px] rounded-xl"
            value={props.passwordCheck}
            onChange={props.onChangeInfo}
          />
          {props.password && props.password.length < 8 && (
            <p className="font-bold pl-2 text-red-300 py-1">
              비밀번호가 너무 짧습니다!
            </p>
          )}
          {props.password.length > 20 && (
            <p className="font-bold pl-2 text-red-300 py-1">
              비밀번호가 너무 깁니다!
            </p>
          )}
          {props.password.length > 0 &&
            props.passwordCheck.length > 0 &&
            props.password !== props.passwordCheck && (
              <p className="font-bold pl-2 text-red-300 py-1">
                비밀번호를 다시 확인해주세요!
              </p>
            )}
        </div>
      </div>

      {/* 전화번호 인증 */}
      <div className="pt-6">
        <p className="text-3xl font-bold mb-4 pl-2">전화번호 인증</p>
        {/* 인증 요청하기 */}
        {/* 어떤 방식으로 인증을 요청할지 아직 미정 */}
        <div className="mb-2">
          <input
            name="phoneNumber"
            type="text"
            placeholder="전화번호를 입력하세요."
            className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
            value={props.phoneNumber}
            onChange={props.onChangeInfo}
          />
          <button className="detail-btn h-[65px] ml-2 w-[100px] text-lg rounded-xl">
            인증
          </button>
          {/* 10자리 미만, 11자리 초과일 경우 안내문 출력 */}
        </div>

        {props.phoneNumber &&
          (props.phoneNumber.length < 10 || props.phoneNumber.length > 11) && (
            <p className="font-bold pl-2 text-red-300 py-1">
              핸드폰번호를 확인해주세요
            </p>
          )}

        {/* 받은 인증번호 입력칸 */}
        {/* 인증 방식에 따라서 없어질 수 있음 */}
        <div>
          <input
            type="text"
            placeholder="인증번호를 입력하세요."
            className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
          />
          <button className="detail-btn h-[65px] ml-2 w-[100px] text-lg rounded-xl">
            인증확인
          </button>
        </div>
      </div>

      {/* 사업자 등록번호 인증 */}
      <div className="pt-6">
        <p className="text-3xl font-bold mb-4 pl-2">사업자 등록번호</p>
        <div>
          <input
            name="registeredNo"
            type="text"
            placeholder="사업자등록번호를 입력하세요."
            className="w-[400px] p-4 text-lg border-[3px] rounded-xl"
            value={props.registeredNo}
            onChange={props.onChangeInfo}
          />
          <button
            className="detail-btn h-[65px] ml-2 w-[100px] text-lg rounded-xl"
            onClick={props.onCheckRegisteredNo}
          >
            인증
          </button>
        </div>
        {props.registeredNo.length > 10 && (
          <p className="font-bold pl-2 text-red-300 py-1">
            등록번호는 최대 10자리 수 입니다!
          </p>
        )}
        {props.isValidRegisteredNo ? (
          <p className="font-bold pl-2 text-green-500 py-1">
            {props.validRegisteredNo}
          </p>
        ) : (
          <p className="font-bold pl-2 text-red-300 py-1">
            {props.validRegisteredNo}
          </p>
        )}
      </div>

      {/* 가입하기 */}
      <div className="pt-6 pb-[100px]">
        <TotalButton title="회원가입" onClick={props.onSignup} />
      </div>
      {props.isValidSignup ? (
        <p className="font-bold pl-2 text-green-500 py-1">{props.validSignup}</p>
      ) : (
        <p className="font-bold pl-2 text-red-300 py-1">{props.validSignup}</p>
      )}
    </div>
  );
};

export default SignUp;
