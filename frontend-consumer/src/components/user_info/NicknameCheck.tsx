import React, { useState } from "react";
import UserState from "../../types/UserState";
import NicknameCheckForm from "../../services/accounts/NicknameCheckService";

const NicknameCheck: React.FC<UserState> = ({ nickname }) => {
  const [inputNickname, setInputNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputNickname(text);
    setIsNicknameValid(text.length >= 2 && text.length <= 10);
    setIsNicknameChecked(false);
    setIsNicknameAvailable(false);
  };

  const handleNicknameCheck = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setIsNicknameChecked(true);
    setIsNicknameAvailable(false); // 초기화 추가
    // 만약 닉네임이 2~10 글자라면
    setIsNicknameChecked(true);
    if (isNicknameValid) {
      try {
        setIsNicknameChecked(false); // 중복 확인 상태 초기화
        setIsNicknameAvailable(false); // 닉네임 사용 가능 여부 초기화
        const response = await NicknameCheckForm({ nickname: inputNickname });

        if (response.data.isValid === true) {
          setIsNicknameAvailable(true); // 닉네임이 사용 가능한 경우
        } else {
          setIsNicknameAvailable(false); // 닉네임이 이미 사용 중인 경우
        }
        setIsNicknameChecked(true);
      } catch (error) {
        console.log("실패");
        setIsNicknameChecked(true);
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
          placeholder={nickname ? nickname : "닉네임을 입력하세요."}
          maxLength={10}
          value={inputNickname}
          onChange={handleNicknameChange}
        />
        <button
          className="orange-hover-button w-[70px] h-[40px] border-2 rounded-xl ml-4"
          onClick={handleNicknameCheck}
        >
          중복 확인
        </button>
      </div>
      {!isNicknameValid && inputNickname.length > 0 && (
        <p className="ml-2 text-xxs text-red-400">
          2자 이상 10자 이내로 작성해주세요.
        </p>
      )}
      {isNicknameAvailable && (
        <p className="ml-2 text-xxs text-green-600">
          사용 가능한 닉네임 입니다!
        </p>
      )}
      {isNicknameValid && isNicknameChecked && !isNicknameAvailable && (
        <p className="ml-2 text-xxs text-red-400">
          이미 사용중인 닉네임 입니다.
        </p>
      )}
    </div>
  );
};

export default NicknameCheck;
