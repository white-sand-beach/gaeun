import React, { useEffect, useRef, useState } from "react";
import useUserLocation from "../../store/UserLocation";
import firefighter from "../../assets/maker/firefighter.png";
import { StoreList } from "../../types/StoreList";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/icons/main-icon-512.png";
import shopmaker from "../../assets/maker/shopmaker.png";
import person from "../../assets/maker/person.png";

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
  isDonated: boolean;
}

const KakaoMap: React.FC<KakaoMapProps> = ({
  lat,
  lng,
  height,
  updateCounter,
  storeList,
  isShop,
  isDonated,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);
  const [currentPosition, setCurrentPosition] = useState({ lat, lng });
  const navigate = useNavigate(); // useNavigate 훅 사용

  const update = useUserLocation.getState().updateUserState; // 스토어의 상태 업데이트 함수를 가져옵니다.
  const { lati, lngi } = useUserLocation((state) => ({
    lati: state.latitude,
    lngi: state.longitude,
  })); // 스토어에서 위치 데이터 가져오기

  useEffect(() => {
    if (!lati || !lngi) {
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

  useEffect(() => {
    if (
      currentPosition.lat !== undefined &&
      currentPosition.lng !== undefined
    ) {
      initMap(currentPosition.lat, currentPosition.lng);
    }
  }, [currentPosition, updateCounter, storeList]); // currentPosition의 변경을 감지합니다.

  const initMap = (latitude: number, longitude: number) => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 6,
    };

    const map = new window.kakao.maps.Map(container, options);
    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    // isDonated가 true인 경우와 그렇지 않은 경우에 대한 마커 이미지 URL 정의
    const markerImageUrl = isDonated ? firefighter : person;
    // 커스텀 마커 이미지를 위한 설정
    // 마커 이미지의 크기를 설정합니다.
    const imageSize = isDonated
      ? new window.kakao.maps.Size(34, 37)
      : new window.kakao.maps.Size(38, 42); // 마커 이미지의 크기

    // 마커 이미지의 옵션을 설정합니다.
    const imageOption = {
      offset: new window.kakao.maps.Point(
        imageSize.width / 2,
        imageSize.height / 2
      ),
    }; // 마커의 위치를 조정합니다.

    // 마커 이미지 객체를 생성합니다.
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageUrl, // 이미지 소스를 사용합니다.
      imageSize,
      imageOption
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: markerImage, // 커스텀 이미지 사용
    });

    // 가게일 때는 가게 이모티콘을 사용합니다.
    if (isShop) {
      // 가게 이모티콘 이미지 설정
      const shopMarkerImage = new window.kakao.maps.MarkerImage(
        shopmaker, // 가게 이모티콘 이미지 주소
        new window.kakao.maps.Size(32, 32) // 이미지 크기
      );

      // 가게 마커 이미지 적용
      marker.setImage(shopMarkerImage);
    }

    // 마커 클릭 시 이벤트 처리 등 추가 작업...

    // 일반 마커에 대한 참조를 설정합니다.
    markerRef.current = marker;
    map.setCenter(markerPosition);

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
              <div style="
                  padding: 3.5px 8px;
                  border-radius: 4px;
                  border: 3px solid orange;
                  background-color: #fff;
                  color: #333;
                  font-size: 16px;
                  font-weight: bold; /* 글자 굵게 *
                  min-width: 180px; /* 최소 너비 설정 */
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  display: flex; /* 메인 컨테이너를 flex로 설정 */
                  align-items: center; /* 내용을 세로 중앙 정렬 */
                  align-items: stretch; /* Stretch items to fill the container */
              ">
                  <div style="
                      flex-grow: 1; /* 좌측 내용 영역을 자동으로 확장 */
                      padding-right: 10px; /* 버튼과의 간격 */
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: flex-start; /* 왼쪽 정렬 */
                      margin : auto;
                  ">
                      <div style="
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          margin-bottom: 4px;
                          margin : auto;
                      ">
                          <div style="
                              width: 40px;
                              height: 40px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                          ">
                              <img src="${logo}" alt="로고 이미지" style="width: 100%; height: 100%; object-fit: cover;"/>
                          </div>
                          <div style="margin-left: 1px; white-space: nowrap;">${item.name}</div> <!-- 로고 옆에 텍스트 추가 -->
                      </div>
      
                  </div>
                  <!-- 오른쪽 빨간 버튼 -->
                  <button style="
                      padding: 8px; /* 패딩 조정 */
                      background-color: red;
                      color: white;
                      cursor: pointer;
                      border: none;
                      border-radius: 4px;
                      font-size: 16px; /* 폰트 크기 조정 */
                      font-weight: bold; /* 글자 굵게 */
                  ">
                      &gt; <!-- HTML 엔티티 사용 -->
                  </button>
              </div>
          `;

          // button 요소 선택
          const button = infoWindowContent.querySelector("button");
          // 버튼에 이벤트 리스너 추가

          // button 요소가 존재하는 경우에만 이벤트 리스너 추가
          if (button) {
            button.addEventListener("click", () => {
              navigate(`/shop/${item.storeId}`);
            });
          } else {
            console.log("버튼이 DOM에 존재하지 않습니다.");
          }

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
          // 지도에 클릭 이벤트 추가하여 정보 창 닫기
          window.kakao.maps.event.addListener(map, "click", () => {
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
          });
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
