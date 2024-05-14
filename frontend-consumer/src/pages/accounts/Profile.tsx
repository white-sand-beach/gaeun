import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import setting from "../../assets/profile/setting.png";
import heart from "../../assets/profile/favorite.png";
import order from "../../assets/profile/order.png";
import review from "../../assets/profile/review.png";
import ProfileForm from "../../services/accounts/ProfileInformation";
import UserState from "../../types/UserState";
import ServiceBanner from "../../components/navbar/ServiceBanner";

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
  }, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 호출되도록 함

  return (
    <div className="w-full h-screen">
      <div className="flex items-center justify-center w-11/12 pt-20 m-auto">
        <div className="relative w-full h-56 pt-2 px-2 m-auto bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 설정 아이콘 */}
          <div className="absolute right-2 top-2">
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
            <div className="pl-4 pt-8 text-sm">
              <p className="font-serif">궁서체로 텍스트 넣고싶음</p>
              <p className="font-bold"> {profileData.nickname}</p>
              <p className="text-gray-400">{profileData.email}</p>
            </div>
          </div>

          <div className="between text-xxs mx-1 pt-6 font-bold">
            <div className="flex w-24 justify-center">
              <button className="justify-center items-center rounded-lg">
                <img
                  className="w-12 h-12 bg-white rounded-full"
                  src={order}
                  alt="주문 내역"
                />
                <p className="pt-1">주문 내역</p>
              </button>
            </div>

            <div className="flex w-24 justify-center">
              <button className="justify-center items-center rounded-lg">
                <img
                  className="w-12 h-12 bg-white rounded-full"
                  src={heart}
                  alt="찜 목록"
                />
                <p className="pt-1">찜 목록</p>
              </button>
            </div>

            <div className="flex w-24 justify-center">
              <button className="justify-center items-center rounded-lg">
                <img
                  className="w-12 h-12 bg-white rounded-full"
                  src={review}
                  alt="리뷰 목록"
                />
                <p className="pt-1">내 리뷰</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="center my-5 w-full m-auto border-2 border-orange-400 h-14 rounded-xl">
          <ServiceBanner />
        </div>

        <div className="relative h-64 p-4 bg-white border border-gray-500 rounded-lg shadow-lg"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
