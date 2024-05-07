import React, { useState } from "react";
import UserState from "@/types/UserState";
import NickNameCheckForm from "@/services/accounts/ProfileUpdateService";

const NickNameCheck: React.FC<UserState> = ({ nickName }) => {
  const [inputNickName, setInputNickName] = useState("");
  const [isNickNameValid, setIsNickNameValid] = useState(false);
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);
  const [isNickNameAvailable, setIsNickNameAvailable] = useState(false);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputNickName(text);
    setIsNickNameValid(text.length >= 2 && text.length <= 10);
    setIsNickNameChecked(false);
    setIsNickNameAvailable(false);
  };

  const handleNickNameCheck = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    console.log(inputNickName)
    // 만약 닉네임이 2~10 글자라면
    setIsNickNameChecked(true);
    if (isNickNameValid) {
      console.log(inputNickName)
      try {
        const response = await NickNameCheckForm({ nickName : inputNickName });
        console.log(response.data);

        if (response.data === true) {
          setIsNickNameAvailable(true); // 가정: 닉네임이 사용 가능한 경우
        }
      } catch (error) {
        console.log("실패");
      }
    }
  };

  return (
    <div className="w-[330px]">
      <h1 className="text-lg font-bold ml-2 mb-2">닉네임</h1>
      <div className="flex items-center mb-1">
        <input
          className="flex-grow p-3 pl-1.5 text-sm border-b-2 border-gray-300 focus:outline-none focus:border-myColor"
          type="text"
          id="nickname"
          name="nickname"
          placeholder={nickName ? nickName : "닉네임을 입력하세요."}
          maxLength={10}
          value={inputNickName}
          onChange={handleNickNameChange}
        />
        <button
          className="orange-hover-button w-[70px] h-[40px] border-2 rounded-xl ml-4"
          onClick={handleNickNameCheck}
        >
          중복 확인
        </button>
      </div>
      {!isNickNameValid && inputNickName.length > 0 && (
        <p className="ml-2 text-xxs text-red-400">
          2자 이상 10자 이내로 작성해주세요.
        </p>
      )}
      {isNickNameChecked && isNickNameAvailable && (
        <p className="ml-2 text-xxs text-green-600">
          사용 가능한 닉네임 입니다!
        </p>
      )}
      {isNickNameValid && isNickNameChecked && !isNickNameAvailable && (
        <p className="ml-2 text-xxs text-red-400">
          이미 사용중인 닉네임 입니다.
        </p>
      )}
    </div>
  );
};

export default NickNameCheck;
