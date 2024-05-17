import React, { useEffect, useState } from "react";
import camera from "../../assets/addphoto.png";
import TotalButton from "../ui/TotalButton";
import DaumPostcodeEmbed from "react-daum-postcode";
import { MapDataType } from "../../types/shop/MapDataType";
import { InputRegisterShop } from "../../types/shop/InputRegisterShop";

declare global {
  interface Window {
    kakao: any;
  }
}

const RegisterShop: React.FC<InputRegisterShop> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<number[]>([]);
  const [selectImg, setSelectImg] = useState<File | undefined>();

  useEffect(() => {
    console.log("useEffect 카테고리: ", categoryId);
  }, [categoryId]);

  // input type file로 가게 사진 받아올 때
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectImg(event.target.files[0]);
      props.onUpdateShopStore?.("shopImage", event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  };

  // 입력하는 가게 정보를 store에 저장 및 관리
  const handleChangeInfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    // 입력값을 store에 전달. 데이터 관리
    props.onUpdateShopStore?.(name as keyof InputRegisterShop, value);
    console.log(`${name}: ${value}`);
  };

  // 다음 주소 찾기 api 를 통한 주소데이터 얻는 함수
  // 얻은 데이터 중, 지번주소, 도로명주소를 store에서 관리
  const handleAboutAddr = (data: MapDataType) => {
    props.onUpdateShopStore?.("shopzibunAddr", data.jibunAddress);
    props.onUpdateShopStore?.("shoproadAddr", data.roadAddress);
    console.log(data.jibunAddress);
    console.log(data.roadAddress);

    // 찾은 주소를 이용하여 좌표정보 얻기
    // Kakao 객체가 로드된 후에 지번주소 또는 도로명주소를 통해 좌표 검색
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        data.jibunAddress || data.roadAddress,
        (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log(result);
            props.onUpdateShopStore("shopLat", result[0].y);
            props.onUpdateShopStore("shopLon", result[0].x);
          }
        }
      );
    });

    // 주소검색 다 하면 모달창 닫음
    setIsOpen(false);
  };

  // 상태 업데이트 로직 내부
  const handleCategoryId = (cateId: number) => {
    if (categoryId.includes(cateId)) {
      const updateId = categoryId.filter((id) => id !== cateId);
      setCategoryId(updateId);
    } else {
      const updateId = [...categoryId, cateId];
      setCategoryId(updateId);
    }
  };

  // categoryId 상태가 변경될 때마다 실행될 useEffect
  // 최신 업데이트된 categoryId 값을 사용
  // categoryId가 변경될 때마다 이 효과를 재실행
  useEffect(() => {
    props.onUpdateShopStore("shopCategoryId", categoryId);
  }, [categoryId]);

  return (
    <div className="flex flex-col items-center w-screen h-full gap-3">
      {/* 사진 등록하기 */}
      {!selectImg ? (
        <label htmlFor="input-file" className="text-2xl font-bold flex flex-col items-center justify-center w-full h-[360px] bg-gray-300">
          <img src={camera} alt="" className="m-2" />
          사진 등록하기
          <input
            name="shopImage"
            type="file"
            accept="image/*"
            id="input-file"
            className="hidden"
            onChange={handleChangeImg}
          />
        </label>
      ) : (
        <img
          src={URL.createObjectURL(selectImg!)}
          className="w-full h-[360px]"
        />
      )}

      <div className="flex flex-col items-center justify-center">
        {/* 가게 카테고리 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">카테고리</p>
          <div className="grid grid-cols-3">
            {props.categoryList?.map((category) => (
              <div
                key={category.categoryId}
                className={`grid grid-cols-2 gap-4 m-1 border-2 p-2 rounded-[15px] ${categoryId.includes(category.categoryId!) ? "bg-orange-300" : ""}`}
                onClick={() => handleCategoryId(category.categoryId!)}
              >
                {category.name}
                <img
                  src={category.imageURL}
                  alt="카테고리 이미지"
                  className="w-[30px]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            {/* 가게명 입력하기 */}
            <div className="flex flex-col gap-2">
              <p className="mt-10 text-xl font-bold">가게명</p>
              <input
                name="shopName"
                type="text"
                placeholder="소비자에게 보이는 가게명입니다."
                className="register-input-tag"
                value={props.shopName}
                onChange={handleChangeInfo}
              />
            </div>

            {/* 상호명 입력하기 */}
            <div className="flex flex-col gap-2">
              <p className="mt-10 text-xl font-bold">상호명</p>
              <input
                name="shopRegisteredName"
                type="text"
                placeholder="사업자등록증상 상호명입니다."
                className="register-input-tag"
                value={props.shopRegisteredName}
                onChange={handleChangeInfo}
              />
            </div>
            {/* 대표자명 입력하기 */}
            <div className="flex flex-col gap-2">
              <p className="mt-10 text-xl font-bold">대표자명</p>
              <input
                name="shopOwner"
                type="text"
                placeholder="대표자명을 입력해주세요."
                className="register-input-tag"
                value={props.shopOwner}
                onChange={handleChangeInfo}
              />
            </div>
          </div>

          <div className="flex flex-col">
            {/* 가게 전화번호 */}
            <div className="flex flex-col gap-2">
              <p className="mt-10 text-xl font-bold">가게 전화번호</p>
              <input
                name="shopNumber"
                type="text"
                placeholder="가게 전화번호를 입력해주세요."
                className="register-input-tag"
                value={props.shopNumber}
                onChange={handleChangeInfo}
              />
            </div>

            {/* 주소 검색 */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <p className="mt-10 text-xl font-bold">주소</p>
              </div>
              <input
                name="shopzibunAddr"
                type="text"
                placeholder="여기를 눌러 주소를 검색해주세요."
                className="register-input-tag"
                value={props.shopzibunAddr}
                onChange={handleChangeInfo}
                onClick={() => setIsOpen(true)}
                readOnly
              />
              <input
                name="shoproadAddr"
                type="text"
                placeholder="지번 주소"
                className="hidden register-input-tag"
                value={props.shoproadAddr}
                onChange={handleChangeInfo}
                readOnly
              />
              <input name="shopDetailAddr" type="text" value={props.shopDetailAddr} onChange={handleChangeInfo} placeholder="상세주소를 입력해주세요" className="register-input-tag" />
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {/* 가게 소개 */}
          <div className="flex flex-col gap-2">
            <p className="mt-10 text-xl font-bold">가게 소개</p>
            <textarea
              name="shopIntro"
              placeholder="가게 소개를 입력해주세요."
              className="resize-none register-textarea-tag"
              value={props.shopIntro}
              onChange={handleChangeInfo}
            />
          </div>

          {/* 재료 및 원산지 */}
          <div className="flex flex-col gap-2">
            <p className="mt-10 text-xl font-bold">재료 / 원산지</p>
            <textarea
              name="FoodOrigin"
              placeholder="재료 및 원산지를 입력해주세요."
              className="resize-none register-textarea-tag"
              value={props.FoodOrigin}
              onChange={handleChangeInfo}
            />
          </div>
        </div>

        {/* 영업시간 및 휴무일 */}
        <div className="flex flex-row gap-4 mt-10">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">영업시간</p>
            <textarea
              name="shopWorkday"
              placeholder="영업시간을 입력해주세요."
              className="resize-none register-textarea-tag"
              value={props.shopWorkday}
              onChange={handleChangeInfo}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">휴무일</p>
            <textarea
              name="shopHoliday"
              placeholder="휴무일을 입력해주세요."
              className="resize-none register-textarea-tag"
              value={props.shopHoliday}
              onChange={handleChangeInfo}
            />
          </div>
        </div>
      </div>

      <TotalButton title="가게 등록하기" onClick={props.onRegisterShop} />

      {isOpen && (
        <>
          <div className="fixed z-10 w-screen h-screen bg-black bg-opacity-50"></div>
          <div className="fixed z-50 top-[135px] w-[360px] flex flex-col items-center">
            <DaumPostcodeEmbed onComplete={handleAboutAddr} autoClose />
            <TotalButton title="닫기" onClick={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterShop;
