import UserState from "../../types/UserState";

const PhoneCheck: React.FC<UserState> = ({ phoneNumber, headerText }) => {

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
          maxLength={11}
        />
        <button className="orange-hover-button w-[70px] h-[40px] border-2 rounded-xl ml-4">
          인증
        </button>
      </div>
    </div>
  );
};

export default PhoneCheck;
