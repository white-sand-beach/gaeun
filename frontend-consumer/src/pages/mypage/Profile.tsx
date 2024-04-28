const ProfileCard = () => {
  return (
    <div className="w-full h-screen bg-white border border-black">
      <div className="flex items-center justify-center w-11/12 pt-16 m-auto">
        <div className="relative w-full h-56 p-6 m-auto bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 설정 아이콘 */}
          <div className="absolute right-4 top-4">
            <button className="flex items-center justify-center w-6 h-6 text-gray-600 bg-gray-200 rounded-full">
              ⚙️
            </button>
          </div>
          {/* 프로필 이미지, 이름, 이메일 */}
          <div className="flex items-center ml-4 space-x-4 mb-9 mt-9">
            <div className="w-16 h-16 overflow-hidden bg-blue-100 rounded-full">
              <img
                src="/path/to/profile-image.jpg"
                alt="프로필 이미지"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                음식지킴이, 팽둔
              </p>
              <p className="text-sm text-gray-500">kimyoung100@naver.com</p>
            </div>
          </div>
          {/* 아이콘들 */}
          <div className="flex justify-around">
            <button className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-lg">
              🔍
            </button>
            <button className="flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 rounded-lg">
              ❤️
            </button>
            <button className="flex items-center justify-center w-8 h-8 text-yellow-600 bg-yellow-100 rounded-lg">
              📅
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
