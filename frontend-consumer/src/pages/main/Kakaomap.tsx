import React, { useEffect, useRef } from "react";
import useUserLocation from "../../store/UserLocation";

// 전역(window) 객체의 타입 확장
declare global {
  interface Window {
    kakao: any; // kakao 객체의 타입을 any로 정의
  }
}

interface KakaoMapProps {
  lat?: number | undefined;
  lng?: number | undefined;
  height: string;
  updateCounter?: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  lat,
  lng,
  height,
  updateCounter,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const update = useUserLocation.getState().updateUserState; // 스토어의 상태 업데이트 함수를 가져옵니다.
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      if (update) {
        update("latitude", lat);
        update("longitude", lng);
      }
      initMap(lat, lng);
    } else {
      getCurrentLocation();
    }
  }, [lat, lng, updateCounter]);

  const initMap = (latitude: number, longitude: number) => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
    });

    markerRef.current = marker;

    // 지도 중심을 마커 위치로 이동
    map.setCenter(markerPosition);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          initMap(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return <div ref={mapRef} style={{ width: "100%", height: height }}></div>;
};

export default KakaoMap;
