import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import setting from "../../assets/profile/setting.png";
import heart from "../../assets/profile/favorite.png";
import order from "../../assets/profile/order.png";
import review from "../../assets/profile/review.png";
import ProfileForm from "../../services/accounts/ProfileInformation";
import UserState from "../../types/UserState";

import defaultImg from "../../assets/profile/defaultImg.png";
import sudal from "../../assets/profile/sudal.gif";
import sudalbg from "../../assets/profile/sudalbg.png";
import BannerSlider from "../../components/navbar/ServiceBanner";

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
        <div className="relative w-full h-56 px-2 pt-2 m-auto bg-white border border-gray-500 rounded-lg shadow-lg">
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
                className="object-cover w-20 h-20 rounded-full"
                src={
                  profileData.profileImage
                    ? profileData.profileImage
                    : defaultImg
                }
                alt="프로필 이미지"
              />
            </div>
            <div className="pt-8 pl-4 text-sm">
              <p className="font-serif">나누면 더 따뜻한 세상</p>
              <p className="font-bold"> {profileData.nickname}</p>
              <p className="text-gray-400">{profileData.email}</p>
            </div>
          </div>

          <div className="pt-6 mx-1 font-bold between text-xxs">
            <div className="flex justify-center w-24">
              <Link to="/order-list">
                <button className="items-center justify-center rounded-lg">
                  <img
                    className="w-12 h-12 bg-white rounded-full"
                    src={order}
                    alt="주문 내역"
                  />
                  <p className="pt-1">주문 내역</p>
                </button>
              </Link>
            </div>

            <div className="flex justify-center w-24">
              <Link to="/favorite">
                <button className="items-center justify-center rounded-lg">
                  <img
                    className="w-12 h-12 bg-white rounded-full"
                    src={heart}
                    alt="찜 목록"
                  />
                  <p className="pt-1">찜 목록</p>
                </button>
              </Link>
            </div>

            <div className="flex justify-center w-24">
              <Link to="/my-review">
                <button className="items-center justify-center rounded-lg">
                  <img
                    className="w-12 h-12 bg-white rounded-full"
                    src={review}
                    alt="리뷰 목록"
                  />
                  <p className="pt-1">감사 편지</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 mx-auto">
        <div className="w-full m-auto my-5 border-2 border-orange-400 center h-14 rounded-xl">
          <BannerSlider />
        </div>
        <div className="relative h-64 p-4 bg-white border border-gray-500 rounded-lg shadow-lg">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0 opacity-50">
            <img
              src={sudalbg}
              alt="배경 이미지"
              className="object-cover w-full h-full"
            />
          </div>
          {/* 왼쪽 상단 문구 */}
          <span className="absolute z-10 text-lg font-bold text-black top-4 left-4">
            {profileData.nickname}님, 수달을 지켜주세요!!
          </span>
          {/* 중앙 아래 식물 이미지 */}
          <div className="absolute z-10 transform -translate-x-1/2 bottom-4 left-1/2">
            {/* 아이콘 또는 이미지 */}
            <img src={sudal} alt="수달키우기" />
          </div>
          {/* 오른쪽 하단 금액 */}
          <span className="absolute text-lg font-bold text-black bottom-4 right-4">
            10,000원
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
