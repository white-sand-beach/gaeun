import React, { useState } from "react";
import list from "../../assets/map/list.png";
import gps from "../../assets/map/gps.png";

const Map: React.FC = () => {
  // 패널이 열려있는지 여부를 관리하는 상태
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 패널이 확장된 상태인지 여부를 관리하는 상태
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // 터치 시작의 Y좌표를 기록하는 상태
  const [startTouchY, setStartTouchY] = useState<number>(0);
  // 현재 터치의 Y좌표를 기록하는 상태
  const [currentTouchY, setCurrentTouchY] = useState<number>(0);

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
    // 사용자가 아래로 터치하여 슬라이드를 내렸을 때
    if (deltaY > 50) {
      setIsOpen(false);
      setIsExpanded(false);
    }
    // 사용자가 위로 터치하여 슬라이드를 올렸고, 패널이 아직 확장되지 않았을 때
    else if (deltaY < -50 && !isExpanded) {
      setIsOpen(true);
      setIsExpanded(true);
    }
    // 사용자가 위로 터치하여 슬라이드를 올렸고, 패널이 이미 확장되어 있을 때
    else if (deltaY < -50 && isExpanded) {
      setIsOpen(true);
      setIsExpanded(false); // 확장된 상태를 토글한다
    }
  };

  return (
    <div>
      <div className="pt-16 ">
        <div className="flex justify-between px-1">
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            가까운 순
          </div>
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            리뷰 많은 순
          </div>
          <div className="p-1 px-3 border-2 shadow-xl rounded-xl border-darkgray">
            찜 많은 순
          </div>
        </div>
      </div>
      <div className="w-full h-full border border-black">
        <div className="w-full mt-2 mb-2 border-2 border-black h-72">
          {/* 왼쪽 버튼 */}
          <button className="absolute p-3 transform -translate-y-1/2 bg-white rounded-full shadow-xl left-4 bottom-4">
            <div className="flex items-center justify-center w-5 h-5 rounded-full">
              <img src={gps} alt="Gps Icon" className="object-cover" />
            </div>
          </button>

          {/* 오른쪽 버튼 */}
          <button className="absolute p-3 transform -translate-y-1/2 bg-white rounded-full shadow-xl right-4 bottom-4">
            <div className="flex items-center justify-center w-5 h-5 rounded-full">
              <img src={list} alt="List Icon " className="object-cover" />
            </div>
          </button>
        </div>
        {/* 슬라이드 업 패널 */}
        <div
          className={`absolute inset-x-0 bottom-0 transform transition-transform ${isOpen ? (isExpanded ? "translate-y-0" : "translate-y-1/2") : "translate-y-full"} z-10`}
          style={{
            touchAction: "none",
            maxHeight: isExpanded ? "100vh" : "50vh",
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
          </div>

          {/* 슬라이드 업되는 패널 내용 */}
          <div className="p-4 overflow-hidden bg-white rounded-t-lg shadow">
            {/* 여기에 지도 아래 정보를 렌더링합니다. */}
            <div className="m-2 border border-black h-60 rounded-xl">
              <div>
                <h2 className="text-lg font-bold">음식점 이름</h2>
                <p className="text-sm text-gray-500">20:00까지 예약</p>
                <p className="text-sm">리뷰 121 · 가게 진행 86</p>
                <p className="text-xs text-gray-400">118m 거리 미만</p>
              </div>
              {/* 오른쪽 왼쪽으로 슬라이딩 해야하는 것  */}
              <div className="mt-2 border border-black h-28 w-36"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
