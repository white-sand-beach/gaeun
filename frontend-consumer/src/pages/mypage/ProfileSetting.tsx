import React, { useState } from "react";
import useUserStore from "../../store/UserStore";
import UserState from "../../types/User.State";

const ProfileSetting = () => {
  const [isHintVisible, setHintVisible] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const { nickName } = useUserStore((state: UserState) => ({
    nickName: state.nickName,
  }));

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewNickname(value);
    // 입력된 값의 길이가 2보다 작거나 10보다 클 경우 힌트를 바로 보여줌
    setHintVisible(value.length < 2 || value.length > 10);
  };

  return (
    <div className="pt-16 bg-white">
      <div className="flex flex-col items-center mt-7">
        <div className="bg-gray-200 rounded-full w-28 h-28"></div>
        <div className="mt-4 text-xl font-semibold">닉네임</div>
      </div>

      <div className="px-4 mt-4">
        <div className="mb-2 ml-1 text-xl font-semibold">닉네임</div>
        <div className="flex items-center mb-5">
          <input
            className="flex-grow p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none focus:border-orange-500"
            type="text"
            id="nickname"
            name="nickname"
            placeholder={nickName || "닉네임 입력"}
            value={newNickname}
            onChange={handleInputChange}
            maxLength={10}
          />
          <div
            className={`text-red-500 text-xs ml-1 mt-1 ${isHintVisible ? "block" : "hidden"}`}
          >
            2~10 글자로 작성해주세요
          </div>
        </div>
      </div>

      <div className="px-4 mt-12">
        <div className="mb-2 ml-1 text-lg font-semibold">전화번호 재설정</div>
        <div className="flex items-center mb-5">
          <input
            className="w-full p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none"
            placeholder="전화번호를 입력하세요."
          />
        </div>
        <div className="flex items-center">
          <input
            className="w-full p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none"
            placeholder="인증번호를 입력하세요."
          />
        </div>
      </div>

      <div className="px-4 mt-10">
        <button className="w-full py-3 text-white rounded-lg shadow-lg bg-myColor">
          확인
        </button>
      </div>

      <div className="fixed bottom-0 flex items-center justify-between w-full p-4 bg-white border-t-2 border-gray-200">
        {/* Footer icons might go here */}
      </div>
    </div>
  );
};

export default ProfileSetting;
