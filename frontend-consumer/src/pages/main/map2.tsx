import React, { useState } from "react";
// import list from "../../assets/map/list.png";
// import gps from "../../assets/map/gps.png";

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
    // 아래로 드래그: 닫힘 처리
    if (deltaY > 50) {
      if (isExpanded) {
        // 현재 패널이 확장된 상태라면 중간 크기로 줄이기
        setIsExpanded(false);
      } else {
        // 이미 중간 크기라면 패널을 완전히 닫기
        setIsOpen(false);
      }
    }
    // 위로 드래그: 확장 처리
    else if (deltaY < -50) {
      setIsOpen(true);
      setIsExpanded(!isExpanded); // 확장 상태 토글
    }
  };

  // 이 값은 실제 높이를 계산하거나 CSS에서 지정한 높이값을 사용해야 합니다.
  const topContainerHeight = 116; // 예시 높이값

  // 패널 스타일을 계산하는 함수
  const getPanelStyle = () => {
    if (!isOpen) {
      // 패널이 완전히 닫혔을 때, 화면 아래에 숨기기
      return { top: "100vh" };
    } else if (isExpanded) {
      // 패널이 확장됐을 때, 상단 컨테이너 바로 아래에 위치시키기
      return { top: `${topContainerHeight}px` };
    } else {
      // 패널이 축소됐을 때, 화면 하단에 위치시키기
      return { top: "50vh" }; // 화면의 중간부터 시작
    }
  };

  return (
    <div>
      <div className="pt-14">
        <div className="flex justify-between px-1 pt-3 pb-3 bg-slate-400 ">
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
      <div className="w-full h-screen border border-black bg-emerald-300"></div>
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
          <div className="p-4 overflow-hidden bg-white rounded-t-lg shadow h-svh">
            {/* 여기에 지도 아래 정보를 렌더링합니다. */}
            <div className="flex items-center justify-center w-64 h-14 m-auto mt-2 border border-darkgray rounded-xl bg-[skyblue]">
              <h2>음식물을 지키자!(이미지)</h2>
            </div>
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
