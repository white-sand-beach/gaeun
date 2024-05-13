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
        <div className="relative w-full h-56 pt-2 px-2 m-auto bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 설정 아이콘 */}
          <div className="absolute right-4 top-4">
            <Link to="/profile-setting">
              <img src={setting} alt="설정" />
            </Link>
          </div>
          {/* 프로필 이미지, 이름, 이메일 */}
          <div className="flex">
            <div className="relative flex justify-center items-center w-24 h-24 rounded-full border-[1px] border-gray-200 shadow-md">
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={
                  profileData.profileImage
                    ? profileData.profileImage
                    : defaultImg
                }
                alt="프로필 이미지"
              />
            </div>
            <div className="pl-4 pt-7 text-sm">
              <p className="font-serif">여기 뭐 하나 넣자! 어때!?</p>
              <p className="font-bold">
                <span className="font-serif">가은,</span> {profileData.nickname}
              </p>
              <p className="text-gray-400">{profileData.email}</p>
            </div>
          </div>
          {/* 아이콘들 */}
          <div className="between mx-6 pt-4">
            <div>
              <button className="items-center justify-center w-10 h-10 rounded-lg">
                <img src={order} alt="주문 내역" />
                <p className="text-xs">주문 내역</p>
              </button>
            </div>

            <div>
              <button className="items-center justify-center w-10 h-10 rounded-lg">
                <img src={heart} alt="찜 목록" />
                <p className="text-xs">찜 목록</p>
              </button>
            </div>
            <div>
              <button className="items-center justify-center w-10 h-10 rounded-lg">
                <img src={review} alt="리뷰 목록" />
                <p className="text-xs">내 리뷰</p>
              </button>
            </div>
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
