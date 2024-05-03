import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import left from "../../assets/left.png";
import { useNavigate } from "react-router-dom";

const AddressSearchPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(""); // 주소를 저장할 상태
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [roadAddress, setJibunAddress] = useState("");

  const goAddressRegistration = () => {
    navigate("/address-search-registration", {
      state: { address, latitude, longitude, roadAddress },
    });
  };

  // 우편번호와 주소를 store에 저장
  const handleAddress = (data: any) => {
    setAddress(data.address); // 선택된 주소를 상태에 저장
    setJibunAddress(data.roadAddress);
    console.log("도로명주소:", data.roadAddress);
    console.log("지번주소:", data.jibunAddress);
    console.log("우편번호:", data.zonecode);
    console.log(data);
    setIsOpen(false); // 모달 닫기

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(data.address, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setLatitude(result[0].y);
        setLongitude(result[0].x);
      } else {
        console.error("Failed to get latitude and longitude:", status);
      }
    });
  };

  const openAddress = () => {
    setIsOpen(true);
  };

  return (
    <div className="container max-w-md mx-auto">
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <button className="w-6 h-6">
          <img src={left} alt="left" />
        </button>
        <h1 className="text-lg">주소 선택</h1>
        <button>편집</button>
      </header>
      <div className="flex p-4">
        <input
          className="p-3 border rounded-lg w-[270px]"
          type="text"
          placeholder="지역, 도로명, 건물명으로 검색"
          onClick={openAddress}
          value={address} // 입력 필드에 주소 표시
          readOnly
        />
        <button
          onClick={goAddressRegistration}
          className="ml-3 border border-gray-200 rounded-lg w-[50px]"
        >
          등록
        </button>
      </div>

      {isOpen && (
        <div className="top-0 left-0 flex flex-col items-center justify-center max-w-[400px] w-full h-full border-2 gap-4 bg-white z-30">
          <div className="flex items-center justify-between w-full p-4 bg-gray-100 ">
            <span>주소 선택</span>
            <button onClick={handleAddress}>[닫기]</button>
          </div>
          <DaumPostcodeEmbed onComplete={handleAddress} autoClose />
        </div>
      )}

      <ul className="divide-y divide-gray-200">
        <li className="flex items-center justify-between p-4">
          <span>강남구 역삼동 진달래 317</span>
          <button>선택</button>
        </li>
        <li className="flex items-center justify-between p-4">
          <span>강남구 역삼동 진달래 21 빌라 205호</span>
          <button>선택</button>
        </li>
        {/* 더 많은 주소 항목을 추가하세요 */}
      </ul>
    </div>
  );
};

export default AddressSearchPage;