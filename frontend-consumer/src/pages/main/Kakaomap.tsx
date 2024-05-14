import React, { useEffect, useRef, useState } from "react";
import useUserLocation from "../../store/UserLocation";
import firefighter from "../../assets/maker/firefighter.png";
import { StoreList } from "../../types/StoreList";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/icons/main-icon-512.png";

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
  storeList?: StoreList[] | undefined; // nearbyStores 속성의 타입 수정
  isShop?: boolean;
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  lat,
  lng,
  height,
  updateCounter,
  storeList,
  isShop,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const [currentPosition, setCurrentPosition] = useState({ lat, lng });
  const navigate = useNavigate(); // useNavigate 훅 사용

  const update = useUserLocation.getState().updateUserState; // 스토어의 상태 업데이트 함수를 가져옵니다.

  useEffect(() => {
    if (
      currentPosition.lat !== undefined &&
      currentPosition.lng !== undefined
    ) {
      initMap(currentPosition.lat, currentPosition.lng);
    }
  }, [currentPosition, updateCounter, storeList]); // currentPosition의 변경을 감지합니다.

  useEffect(() => {
    if (!lat || !lng) {
      getCurrentLocation();
    } else {
      setCurrentPosition({ lat, lng });
      if (update) {
        if (!isShop) {
          update("latitude", lat);
          update("longitude", lng);
        }
      }
    }
  }, [lat, lng]); // lat, lng props의 변경을 감지합니다.

  const initMap = (latitude: number, longitude: number) => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 6,
    };

    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    // 커스텀 마커 이미지를 위한 설정
    // 마커 이미지의 크기를 설정합니다.
    const imageSize = new window.kakao.maps.Size(32, 35); // 마커 이미지의 크기

    // 마커 이미지의 옵션을 설정합니다.
    const imageOption = {
      offset: new window.kakao.maps.Point(
        imageSize.width / 2,
        imageSize.height / 2
      ),
    }; // 마커의 위치를 조정합니다.

    // 마커 이미지 객체를 생성합니다.
    const markerImage = new window.kakao.maps.MarkerImage(
      firefighter, // 이미지 소스를 사용합니다.
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage, // 커스텀 이미지 사용
    });

    // 일반 마커 생성
    if (storeList) {
      console.log(storeList);
      storeList.forEach((item) => {
        const markerPosition = new window.kakao.maps.LatLng(
          item.latitude,
          item.longitude
        );

        // 일반 마커를 생성합니다.
        let marker: any;
        if (item.categoryList && item.categoryList[0]?.imageURL) {
          // 카테고리에 이미지 URL이 있는 경우 해당 이미지를 사용하여 마커를 생성합니다.
          const markerImage = new window.kakao.maps.MarkerImage(
            item.categoryList[0].imageURL, // 이미지 URL
            new window.kakao.maps.Size(32, 32) // 이미지 크기
          );

          marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            image: markerImage,
          });

          const infoWindowContent = document.createElement("div");
          infoWindowContent.innerHTML = `
          <div>
              <div style="
                  padding: 2px;
                  border-radius: 4px;
                  border: 3px solid orange;
                  background-color: #fff;
                  color: #333;
                  font-size: 14px;
                  text-align: center;
                  width: 200px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
              ">
                  <div style="margin-bottom: 4px; width: 100%; display: flex; justify-content: center; align-items: center;"> <!-- 로고와 가게명 중앙 정렬 -->
                      <div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
                          <img
                              src="${logo}"
                              alt="로고이미지"
                              style="width: 100%; height: 100%; object-fit: cover;"
                          />
                      </div>
                      <div>${item.name}</div>
                  </div>
                  <div style="margin: 0px 10px 5px 10px; background-color: #dcdcdc; border-radius: 10px; padding: 10px;">
                  <div style="
                      text-align: left; /* 중앙 정렬 */
                      width: 100%; /* 부모 컨테이너 크기에 맞춤 */
                  ">거리 : ${item.distance}m</div>
                  <div style="
                      text-align: left; /* 중앙 정렬 */
                      width: 100%; /* 부모 컨테이너 크기에 맞춤 */
                  ">영업시간 : ${item.operatingTime}</div>
                  </div>
                  <div>클릭시 이동합니다!</div>
              </div>
          </div>
      `;
          infoWindowContent.addEventListener("click", () => {
            navigate(`/shop/${item.storeId}`); // 가게 상세 페이지로 이동
          });

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: infoWindowContent,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            infoWindow.open(map, marker);
            infoWindowRef.current = infoWindow;
          });
          // // 마커 클릭 이벤트 추가
          // window.kakao.maps.event.addListener(marker, "click", () => {
          //   navigate(`/shop/${item.storeId}`); // 가게 상세 페이지로 라우팅
          // });
        } else {
          // 이미지 URL이 없는 경우 기본 마커를 생성합니다.
          marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
          });
        }

        // 일반 마커에 대한 참조를 설정합니다.
        markerRef.current = marker;
        map.setCenter(markerPosition);
      });
    }
    // 메인 마커에 대한 참조를 설정합니다.
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
