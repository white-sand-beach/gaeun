import { useState } from "react";
import useUserStore from "../../store/UserStore";
import UserState from "../../types/UserState";

const ProfileSetting = () => {
  // 닉네임에 대한 힌트 가시성 상태를 관리하는 state
  const [isHintVisible, setHintVisible] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  const { nickName } = useUserStore((state: UserState) => ({
    nickName: state.nickName,
  }));

  // 닉네임 변경 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewNickname(value);
    console.log(newNickname);

    // 입력된 값의 길이가 2보다 작거나 10보다 클 경우 힌트를 보여줌
    setHintVisible(value.length > 0 && (value.length < 2 || value.length > 10));
  };

  return (
    <div className="pt-16 bg-white">
      {/* 프로필 이미지 창 */}

      <div className="flex flex-col items-center mt-7">
        <div className="bg-gray-200 rounded-full w-28 h-28"></div>
        <div className="mt-4 text-xl font-semibold">닉네임</div>
      </div>

      {/* Nickname Change Section */}
      <div className="px-4 mt-4">
        <div className="mb-2 ml-1 text-xl font-semibold">닉네임</div>
        <div className="flex items-center mb-5">
          <div className="flex-grow mr-3">
            <input
              className="flex-grow w-full p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none focus:border-orange-500"
              type="text"
              id="nickname"
              name="nickname"
              placeholder={nickName}
              value={newNickname}
              onChange={handleInputChange}
              maxLength={10}
            />

            {/* Hint Message */}
            <div
              className={`text-red-500 text-xs ml-1 mt-1 ${isHintVisible ? "visible" : "invisible"}`}
            >
              2~10 글자로 작성해주세요
            </div>
          </div>
          <div className="px-5 py-2 text-sm text-white rounded-full shadow bg-myColor">
            중복확인
          </div>
        </div>
      </div>

      {/* Phone Number Reset Section */}
      <div className="px-4 mt-12">
        <div className="mb-2 ml-1 text-lg font-semibold">전화번호 재설정</div>
        <div className="flex items-center mb-5">
          <div className="flex-grow mr-3">
            <input
              className="w-full p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none  focus:border-orange-500"
              placeholder="전화번호를 입력하세요."
            />
          </div>
          <button className="flex-shrink-0 px-5 py-2 text-sm text-white rounded-full shadow bg-myColor">
            인증
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex-grow mr-3">
            <input
              className="w-full p-3 pl-1.5 border-b-2 border-gray-300 focus:outline-none  focus:border-orange-500"
              placeholder="인증번호를 입력하세요."
            />
          </div>
          <button className="flex-shrink-0 px-5 py-2 text-sm text-white rounded-full shadow bg-myColor">
            검색
          </button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-4 mt-10">
        <button className="w-full py-3 text-white rounded-lg shadow-lg bg-myColor">
          확인
        </button>
      </div>

      {/* Footer Navigation Placeholder */}
      <div className="fixed bottom-0 flex items-center justify-between w-full p-4 bg-white border-t-2 border-gray-200">
        {/* Footer icons would go here */}
      </div>
    </div>
  );
};

export default ProfileSetting;
