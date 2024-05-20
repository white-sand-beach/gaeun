import React, { useState } from "react";
import UserState from "../../types/UserState";

const PhoneCheck: React.FC<
  UserState & { updatePhoneNumber: (newPhoneNumber: string) => void }
> = ({ phoneNumber, updatePhoneNumber, headerText }) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber || "");

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let text = e.target.value;
    // 숫자만 남기고 제거
    text = text.replace(/[^0-9]/g, '');
    // 길이를 11자로 제한
    if (text.length <= 11) {
      setInputPhoneNumber(text);
    }
  };

  const handlePhoneNumberCheck = () => {
    if (inputPhoneNumber.length >= 10 && inputPhoneNumber.length <= 11) {
      updatePhoneNumber(inputPhoneNumber);
      alert("확인되었습니다.");
    } else {
      alert("잘못된 전화번호 형식입니다.");
    }
  };

  return (
    <div className="w-[330px]">
      <h1 className="text-lg font-bold ml-2 mb-2">{headerText}</h1>
      <div className="flex items-center mb-4">
        <input
          className="flex-grow p-3 pl-1.5 text-sm border-b-2 border-gray-300 focus:outline-none focus:border-myColor"
          type="number"
          id="phoneNumber"
          name="phoneNumber"
          placeholder={phoneNumber ? phoneNumber : "전화번호를 입력하세요."}
          value={inputPhoneNumber}
          onChange={handlePhoneNumberChange}
          onInput={(e) => {
            // 입력값이 최대 길이를 초과하지 않도록 처리
            const target = e.target as HTMLInputElement;
            if (target.value.length > 11) {
              target.value = target.value.slice(0, 11);
              setInputPhoneNumber(target.value);
            }
          }}
        />
        <button onClick={handlePhoneNumberCheck} className="orange-hover-button w-[70px] h-[40px] border-2 rounded-xl ml-4">
          인증
        </button>
      </div>
    </div>
  );
};

export default PhoneCheck;
