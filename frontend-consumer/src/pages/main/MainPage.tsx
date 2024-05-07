import React, { useState, useEffect } from "react";
import list from "@/assets/map/list.png";
import gps from "@/assets/map/gps.png";
import KakaoMap from "./Kakaomap";
import Shops from "./Shops";
import ServiceBanner from "@/components/navbar/ServiceBanner";

interface LocationState {
  lat: number | undefined;
  lng: number | undefined;
  updateCounter: number; // 변경 횟수를 추적
}

const Main: React.FC = () => {
  // 패널이 열려있는지 여부를 관리하는 상태
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 패널이 확장된 상태인지 여부를 관리하는 상태
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // 터치 시작의 Y좌표를 기록하는 상태
  const [startTouchY, setStartTouchY] = useState<number>(0);
  // 현재 터치의 Y좌표를 기록하는 상태
  const [currentTouchY, setCurrentTouchY] = useState<number>(0);
  // 지도의 높이를 패널 상태에 따라 결정
  const mapHeight = isOpen ? "300px" : "100%";
  const gpsButtonClass = isOpen
    ? "absolute p-3 transform -translate-y-full bg-white rounded-full shadow-xl left-4 bottom-4 mb-80 z-10"
    : "absolute p-3 transform -translate-y-full bg-white rounded-full shadow-xl left-4 bottom-4 mb-7 z-10";
  const listButtonClass = isOpen
    ? "absolute p-3 transform -translate-y-full bg-white rounded-full shadow-xl right-4 bottom-4 mb-80 z-10"
    : "absolute p-3 transform -translate-y-full bg-white rounded-full shadow-xl right-4 bottom-4 mb-7 z-10";
  const [location, setLocation] = useState<LocationState>({
    lat: undefined,
    lng: undefined,
    updateCounter: 0,
  });

  const handleGPSButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(location);
          // 강제 업데이트를 트리거하려면 상태를 갱신할 때마다 updateCounter를 증가시키기
          setLocation((prev) => ({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            updateCounter: prev.updateCounter + 1, // 항상 증가시키기
          }));
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation((prev) => ({
            ...prev,
            updateCounter: prev.updateCounter + 1, // 오류가 발생하면 updateCounter만 증가
          }));
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation((prev) => ({
        ...prev,
        updateCounter: prev.updateCounter + 1, // 지원하지 않을 때도 updateCounter 증가
      }));
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤을 막습니다.
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 스크롤을 원상복구합니다.
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const listButtonClick = () => {
    if (isOpen && !isExpanded) {
      // isOpen은 true이고, isExpanded는 false일 때
      setIsExpanded(true); // 패널을 확장시킵니다.
    } else if (!isOpen) {
      // isOpen이 false일 때
      setIsOpen(true); // 패널을 반 틈 엽니다.
    }
  };

  // 사용자가 터치를 시작했을 때 호출되는 함수
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartTouchY(e.touches[0].clientY);
  };

  // 사용자가 터치하고 움직일 때 호출되는 함수
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setCurrentTouchY(e.touches[0].clientY);
  };

  // 사용자가 터치를 끝냈을 때 호출되는 함수
  const handleTouchEnd = () => {
    const deltaY = currentTouchY - startTouchY;
    // 아래로 드래그: 닫힘 처리
    if (deltaY > 250) {
      if (isExpanded) {
        // 현재 패널이 확장된 상태라면 중간 크기로 줄이기
        setIsExpanded(false);
      } else {
        // 이미 중간 크기라면 패널을 완전히 닫기
        setIsOpen(false);
      }
    }
    // 위로 드래그: 확장 처리
    else if (deltaY < -250) {
      setIsOpen(true);
      setIsExpanded(!isExpanded); // 확장 상태 토글
    }
  };

  // 이 값은 실제 높이를 계산하거나 CSS에서 지정한 높이값을 사용해야 합니다.
  const topContainerHeight = 116; // 예시 높이값

  // 패널 스타일을 계산하는 함수에서 maxHeight 설정을 수정합니다.
  const getPanelStyle = () => {
    if (!isOpen) {
      return { top: "100vh" }; // 패널이 완전히 닫혔을 때
    } else if (isExpanded) {
      // 패널이 확장됐을 때, 이전보다 더 많은 영역을 커버하도록 조정합니다.
      return {
        top: `${topContainerHeight}px`,
        maxHeight: `calc(100vh - ${topContainerHeight}px)`, // 이전의 maxHeight 설정이 잘못되었습니다.
      };
    } else {
      // 패널이 축소됐을 때
      return {
        top: "50vh",
        maxHeight: `calc(50vh - ${topContainerHeight}px)`, // 높이 계산 방식을 조정합니다.
      };
    }
  };

  return (
    <div>
      <div className="pt-14">
        <div className="flex justify-between px-1 pt-3 pb-3 font-bold bg-gray-100">
          <div className="p-1 px-3 bg-white border-2 border-white shadow-xl rounded-xl">
            가까운 순
          </div>
          <div className="p-1 px-3 bg-white border-2 border-white shadow-xl rounded-xl">
            리뷰 많은 순
          </div>
          <div className="p-1 px-3 bg-white border-2 border-white shadow-xl rounded-xl">
            찜 많은 순
          </div>
        </div>
      </div>
      <div className="w-full h-screen">
        <KakaoMap
          key={isOpen ? "large-map" : "small-map"}
          height={mapHeight}
          lat={location.lat}
          lng={location.lng}
          updateCounter={location.updateCounter}
        />
        {/* 왼쪽 버튼 */}
        <button className={gpsButtonClass} onClick={handleGPSButtonClick}>
          <div className="flex items-center justify-center w-5 h-5 rounded-full">
            <img src={gps} alt="Gps Icon" className="object-cover" />
          </div>
        </button>

        {/* 오른쪽 버튼 */}
        <button className={listButtonClass} onClick={listButtonClick}>
          <div className="flex items-center justify-center w-5 h-5 rounded-full">
            <img src={list} alt="List Icon " className="object-cover w-3 h-3" />
          </div>
        </button>
      </div>
      {/* 슬라이드 업 패널 */}
      <div
        className={`absolute inset-x-0 transform transition-transform ${isOpen ? "z-10" : "z-0"}`}
        style={{
          ...getPanelStyle(),
          maxHeight: isExpanded ? "calc(100vh - 50px)" : "50vh",
          touchAction: "none",
        }}
      >
        {/* 핸들러 부분 */}
        <div
          className="w-full p-2 bg-gray-200 cursor-pointer rounded-t-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-8 h-1 m-auto bg-gray-500 rounded-full"></div>
          {/* 슬라이드 업되는 패널 내용 */}
          <div className="pt-2 bg-white rounded-t-lg shadow h-svh">
            {/* 여기에 지도 아래 정보를 렌더링합니다. */}
            <div className="flex items-center justify-center w-64 m-auto my-1 border border-orange-400 h-14 rounded-xl">
              <ServiceBanner />
            </div>

            {/* 패널 내부 스크롤 부분 */}
            <div
              className="flex flex-col gap-2 py-2 pl-2 overflow-y-auto "
              style={{ maxHeight: isExpanded ? "467px" : "212px" }}
            >
              <Shops />
              <Shops />
              <Shops />
              <Shops />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
