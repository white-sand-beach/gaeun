import React, { useEffect, useRef, useState } from "react";
import useUserLocation from "../../store/UserLocation";

// 전역(window) 객체의 타입 확장
declare global {
  interface Window {
    kakao: any; // kakao 객체의 타입을 any로 정의
  }
}

interface KakaoMapProps {
  lat?: number;
  lng?: number;
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
  const [currentPosition, setCurrentPosition] = useState({ lat, lng });

  const update = useUserLocation.getState().updateUserState; // 스토어의 상태 업데이트 함수를 가져옵니다.

  useEffect(() => {
    if (
      currentPosition.lat !== undefined &&
      currentPosition.lng !== undefined
    ) {
      initMap(currentPosition.lat, currentPosition.lng);
    }
  }, [currentPosition, updateCounter]); // currentPosition의 변경을 감지합니다.

  useEffect(() => {
    if (!lat || !lng) {
      getCurrentLocation();
    } else {
      setCurrentPosition({ lat, lng });
      if (update) {
        update("latitude", lat);
        update("longitude", lng);
      }
    }
  }, [lat, lng]); // lat, lng props의 변경을 감지합니다.

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
    map.setCenter(markerPosition);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          if (update) {
            update("latitude", latitude);
            update("longitude", longitude);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setCurrentPosition({ lat: 37.5665, lng: 126.978 }); // 서울 시청 위치로 대체
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCurrentPosition({ lat: 37.5665, lng: 126.978 }); // 서울 시청 위치로 대체
    }
  };

  return <div ref={mapRef} style={{ width: "100%", height: height }}></div>;
};

export default KakaoMap;
