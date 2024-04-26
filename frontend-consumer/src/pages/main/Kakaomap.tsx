import React, { useEffect, useRef } from "react";

// 전역(window) 객체의 타입 확장
declare global {
  interface Window {
    kakao: any; // kakao 객체의 타입을 any로 정의
  }
}

interface KakaoMapProps {
  lat?: number;
  lng?: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkKakaoMapAPI = () => {
      if (window.kakao && window.kakao.maps) {
        if (lat && lng) {
          initMap(lat, lng);
        } else {
          // 지오로케이션을 사용하여 사용자의 현재 위치를 가져옴
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                initMap(userLat, userLng);
              },
              (error) => {
                console.error("Error getting user location:", error);
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }
      } else {
        setTimeout(checkKakaoMapAPI, 100);
      }
    };

    checkKakaoMapAPI();
  }, [lat, lng]);

  const initMap = (lat: number, lng: number) => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    // 사용자의 현재 위치에 마커 추가
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      verticalAlign: "TOP", // 마커를 지도의 윗 부분에 위치하도록 설정
    });
    marker.setMap(map);

    // 지도를 이동하여 사용자의 위치가 윗 부분에 표시되도록 함
    const mapHeight = map.getCenter().getLat() - lat;
    map.panBy(0, mapHeight * -1);
  };

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
