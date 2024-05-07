import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import KakaoMap from "@/pages/main/Kakaomap";
import left from "@/assets/navbar/back.png";
import speech from "@/assets/search/speech.png";

const AddressRegistration = () => {
  const location = useLocation();
  const mapHeight = "500px";
  const [showBalloon, setShowBalloon] = useState(false);
  const { address, latitude, longitude, roadAddress } = location.state;

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
    console.log(address);
    // 말풍선을 보여주고 5초 후에 숨깁니다.
    setShowBalloon(true);
    setTimeout(() => {
      setShowBalloon(false);
    }, 3000);
  }, []);

  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button className="w-6 h-6">
          <img src={left} alt="left" />
        </button>
        <h1 className="flex-1 text-lg text-center">지도에서 위치 확인</h1>
        <div className="w-6 h-6">
          {/* 여기에 빈 공간을 유지하기 위해 추가 */}
        </div>
      </header>
      <div className="w-full">
        <KakaoMap
          height={mapHeight}
          lat={latitude}
          lng={longitude}
          updateCounter={0}
        />
        {showBalloon && (
          <div className="absolute z-20 transform -translate-y-14 -translate-x-28 left-1/2 top-1/4">
            <img
              src={speech}
              alt="speech"
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>
      <div className="absolute z-10 w-full h-[200px] bg-white bottom-0 rounded-t-2xl border border-gray-400">
        <div className="mt-10 ml-4 text-xl font-bold">{roadAddress}</div>
        <div className="ml-4 text-base font-semibold text-gray-500">
          {address}
        </div>
        <div className="w-[330px] mx-auto bg-myColor py-3 mt-6 rounded-md text-center">
          <div className="text-base font-semibold text-white">
            이 위치로 주소 등록
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressRegistration;
