const NickNameCheck = () => {
  return (
    <div className="w-[330px]">
      <h1 className="text-lg font-bold ml-2 mb-2">닉네임</h1>
      <div className="flex items-center mb-1">
        <input
          className="flex-grow p-3 pl-1.5 text-sm border-b-2 border-gray-300 focus:outline-none focus:border-myColor"
          type="text"
          id="nickname"
          name="nickname"
          placeholder="닉네임을 입력하세요."
          maxLength={10}
        />
        <button className="orange-hover-button w-[70px] h-[40px] border-2 rounded-xl ml-4">
          중복 확인
        </button>
      </div>
      <p className="ml-2 text-xxs text-red-400">
        2자 이상 10자 이내로 작성해주세요.
      </p>
    </div>
  );
};

export default NickNameCheck;
