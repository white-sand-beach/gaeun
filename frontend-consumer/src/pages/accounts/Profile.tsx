import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import setting from "../../assets/profile/setting.png";
import heart from "../../assets/profile/heart.png";
import order from "../../assets/profile/order.png";
import review from "../../assets/profile/review.png";
import ProfileForm from "../../services/accounts/ProfileInformation";
import UserState from "../../types/UserState";

import defaultImg from "../../assets/profile/defaultImg.png";

const ProfileCard: React.FC = () => {
  const [profileData, setProfileData] = useState<UserState>({
    profileImage: "",
    nickname: "",
    socialType: "",
    email: "",
  });

  useEffect(() => {
    ProfileForm()
      .then((data) => {
        setProfileData(data); // 이 부분에서 data 타입이 ProfileInfoProps와 일치해야 합니다.
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch profile data", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 호출되도록 함

  return (
    <div className="w-full h-screen bg-white border border-black">
      <div className="flex items-center justify-center w-11/12 pt-20 m-auto">
        <div className="relative w-full h-56 p-6 m-auto bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 설정 아이콘 */}
          <div className="absolute right-4 top-4">
            <Link to="/profile-setting">
              <img src={setting} alt="설정" />
            </Link>
          </div>
          {/* 프로필 이미지, 이름, 이메일 */}
          <div className="flex items-center ml-4 space-x-4 mb-9 mt-9">
            <div className="w-16 h-16 overflow-hidden bg-blue-100 rounded-full">
              <img
                src={
                  profileData.profileImage
                    ? profileData.profileImage
                    : defaultImg
                }
                alt="프로필 이미지"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                음식지킴이, {profileData.nickname}
              </p>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>
          {/* 아이콘들 */}
          <div className="flex justify-around">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg">
              <img src={order} alt="" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg">
              <img src={heart} alt="" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg">
              <img src={review} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mt-5">
        <div className="p-4 mb-5 text-center bg-white border border-gray-500 rounded-lg shadow-lg">
          <span className="text-sm text-gray-800">
            음식을 지키고 식물을 키워주세요!!
          </span>
        </div>
        <div className="relative h-64 p-4 bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 왼쪽 상단 문구 */}
          <span className="absolute text-sm text-gray-800 top-4 left-4">
            {profileData.nickname}님이 지금까지 지킨 음식은?
          </span>
          {/* 중앙 아래 식물 이미지 */}
          <div className="absolute transform -translate-x-1/2 bottom-4 left-1/2">
            <div className="inline-block p-2 bg-green-100 rounded-full">
              {/* 아이콘 또는 이미지 */}
              <span className="text-green-800">식물</span>
            </div>
          </div>
          {/* 오른쪽 하단 금액 */}
          <span className="absolute text-lg text-blue-600 bottom-4 right-4">
            10,000원
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
