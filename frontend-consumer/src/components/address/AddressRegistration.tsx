import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import KakaoMap from "../../pages/main/Kakaomap";
import left from "../../assets/navbar/back.png";
import speech from "../../assets/search/speech.png";
import { useNavigate } from "react-router-dom";
import company from "../../assets/search/company.png";
import home from "../../assets/search/home.png";
import point_white from "../../assets/search/point_white.png";
import AddressRegistrationForm from "../../services/searchs/AddressRegistrationService";

const AddressRegistration = () => {
  const location = useLocation();
  const mapHeight = "500px";
  const [showBalloon, setShowBalloon] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [alias, setAlias] = useState("");
  const { address, latitude, longitude, roadAddress } = location.state;
  const [activeAlias, setActiveAlias] = useState(alias);

  const navigate = useNavigate();

  const goAddressSearchPage = () => {
    navigate("/address-search");
  };

  const goBack = () => {
    navigate(-1);
  };

  const homeAlias = () => {
    setAlias("우리집");
    setActiveAlias("우리집"); // 'activeAlias' 상태 업데이트
    setShowInput(false);
    console.log("우리집으로 변경되었습니다.");
  };

  const companyAlias = () => {
    setAlias("회사");
    setActiveAlias("회사"); // 'activeAlias' 상태 업데이트
    setShowInput(false);
    console.log("회사로 변경되었습니다.");
  };

  const showInputButton = () => {
    setShowInput(!showInput);
    setActiveAlias("직접"); // 'activeAlias' 상태를 빈 문자열로 설정하여 직접 입력 활성화
    console.log("직접 입력 모드로 변경되었습니다.");
  };

  const handleAliasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setAlias(text);
  };

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
    console.log(address);
    // 말풍선을 보여주고 5초 후에 숨깁니다.
    setShowBalloon(true);
    setTimeout(() => {
      setShowBalloon(false);
    }, 5000);
  }, []);

  const locationsComplete = () => {
    const locationsData = {
      latitude: latitude,
      longitude: longitude,
      address: address,
      alias: alias,
      roadAddress: roadAddress,
    };

    AddressRegistrationForm(
      locationsData,
      () => {
        alert("위치 등록이 완료되었습니다.");
        goAddressSearchPage();
      },
      (error) => {
        console.error("위치 등록 중 오류 발생:", error);
        alert("위치 등록 중 오류가 발생했습니다.");
      }
    );
  };

  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={goBack} className="w-6 h-6">
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
      <div className="absolute z-10 w-full h-[300px] bg-white bottom-0 rounded-t-2xl border border-gray-400">
        <div className="mt-5 ml-4 text-xl font-bold">{roadAddress}</div>
        <div className="ml-4 text-base font-semibold text-gray-500">
          {address}
        </div>

        <div className="flex justify-between mx-4 mt-5 text-center">
          <div
            onClick={homeAlias}
            className={`w-24 py-3 text-gray-600 border border-gray-400 rounded-md ${activeAlias === "우리집" ? "bg-myColor text-white" : "bg-gray-200 text-black"}`}
          >
            <div className="flex items-center">
              <div className="flex items-center mx-auto">
                <img className="w-4 h-4 mr-1" src={home} alt="home" />
                <span className="text-sm">우리집</span>
              </div>
            </div>
          </div>
          <div
            onClick={companyAlias}
            className={` w-24 py-3 text-gray-600 border border-gray-400 rounded-md ${activeAlias === "회사" ? "bg-myColor text-white" : "bg-gray-200 text-black"}`}
          >
            <div className="flex items-center">
              <div className="flex items-center mx-auto">
                <img className="w-4 h-4 mr-1" src={company} alt="company" />
                <span className="text-sm">회사</span>
              </div>
            </div>
          </div>
          <div
            onClick={showInputButton}
            className={`w-24 py-3 text-gray-600 border border-gray-400 rounded-md ${activeAlias === "직접" ? "bg-myColor text-white" : "bg-gray-200 text-black"}`}
          >
            <div className="flex items-center">
              <div className="flex items-center mx-auto">
                <img
                  className="w-3 h-3.5 mr-1"
                  src={point_white}
                  alt="point_white"
                />
                <span className="text-sm">직접입력</span>
              </div>
            </div>
          </div>
        </div>
        {showInput && (
          <div className="w-[330px] mx-auto border border-gray-400 py-3 mt-4 rounded-md">
            <input
              onChange={handleAliasChange}
              className="w-full pl-2"
              type="text"
              id="aliasInput"
              name="aliasInput"
              placeholder="예) 학교, 진영이네"
            ></input>
          </div>
        )}
        <div className="w-[330px] mx-auto bg-myColor py-3 mt-4 rounded-md text-center">
          <div
            onClick={locationsComplete}
            className="text-base font-semibold text-white"
          >
            이 위치로 주소 등록
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressRegistration;
