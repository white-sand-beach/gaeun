import React, { useState } from "react";
import camera from "../../assets/addphoto.png";
import TotalButton from "../ui/TotalButton";
import { RegisterShopType } from "../../types/shop/RegisterShopType";
import DaumPostcodeEmbed from "react-daum-postcode";
import { MapDataType } from "../../types/shop/MapDataType";

const RegisterShop: React.FC<RegisterShopType> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectImg, setSelectImg] = useState<File | null>(
    props.shopImage ? props.shopImage : null
  );

  
  // useEffect(() => {
  //   // selectImg가 변경될 때마다 실행
  //   if (selectImg) {
  //     const objectUrl = URL.createObjectURL(selectImg); // selectImg로부터 URL 생성

  //     // 컴포넌트가 언마운트될 때 URL 해제
  //     return () => URL.revokeObjectURL(objectUrl);
  //   }
  // }, [selectImg]);

  // input type file로 가게 사진 받아올 때
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectImg(event.target.files[0]);
      props.onUpdateShopStore?.("shopImage", event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  };

  const handleChangeInfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    // 입력값을 store에 전달. 데이터 관리
    props.onUpdateShopStore?.(name as keyof RegisterShopType, value);
    console.log(`${name}: ${value}`);
  };

  // 다음 주소 찾기 api 를 통한 주소데이터 얻는 함수
  // 얻은 데이터 중, 지번주소, 도로명주소를 store에서 관리
  const handleAboutAddr = (data: MapDataType) => {
    console.log(data);
    props.onUpdateShopStore?.("shopzibunAddr", data.jibunAddress);
    props.onUpdateShopStore?.("shoproadAddr", data.roadAddress);
    props.onUpdateShopStore?.("shopLat", 33.450701);
    props.onUpdateShopStore?.("shopLon", 126.570667);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-screen h-full gap-3">
      {/* 사진 등록하기 */}
      {selectImg === null ? (
        <div className="flex flex-col items-center justify-center w-full h-[360px] bg-gray-300">
          <img src={camera} alt="" className="m-2" />
          <label htmlFor="input-file" className="text-2xl font-bold">
            사진 등록하기
          </label>
          <input
            name="shopImage"
            type="file"
            accept="image/*"
            id="input-file"
            className="hidden"
            onChange={handleChangeImg}
          />
        </div>
      ) : (
        <img
          src={URL.createObjectURL(selectImg)}
          className="w-full h-[360px]"
        />
      )}

      <div className="flex flex-col items-center justify-center">
        {/* 가게(상호)명 입력하기 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">가게(상호명)</p>
          <input
            name="shopName"
            type="text"
            placeholder="가게(상호)명을 입력해주세요."
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shopName}
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
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shopOwner}
            onChange={handleChangeInfo}
          />
        </div>

        {/* 주소 검색 */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <p className="mt-10 text-xl font-bold">주소</p>
            <button className="detail-btn" onClick={() => setIsOpen(true)}>
              주소 검색
            </button>
          </div>
          <input
            name="shopzibunAddr"
            type="text"
            placeholder="도로명 주소"
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shopzibunAddr}
            onChange={handleChangeInfo}
            readOnly
          />
          <input
            name="shoproadAddr"
            type="text"
            placeholder="지번 주소"
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shoproadAddr}
            onChange={handleChangeInfo}
            readOnly
          />
        </div>

        {/* 가게 전화번호 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">가게 전화번호</p>
          <input
            name="shopNumber"
            type="text"
            placeholder="가게 전화번호를 입력해주세요."
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shopNumber}
            onChange={handleChangeInfo}
          />
        </div>

        {/* 가게 소개 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">가게 소개</p>
          <input
            name="shopIntro"
            type="text"
            placeholder="가게 소개를 입력해주세요."
            className="w-[320px] border-b-2 bg-orange-50"
            value={props.shopIntro}
            onChange={handleChangeInfo}
          />
        </div>

        {/* 영업시간 및 휴무일 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">영업시간 / 휴무일</p>
          <textarea
            name="shopWorkday"
            placeholder="영업시간을 입력해주세요."
            className="border-b-2 bg-orange-50 w-[320px] h-[200px]"
            value={props.shopWorkday}
            onChange={handleChangeInfo}
          />
          <textarea
            name="shopHoliday"
            placeholder="휴무일을 입력해주세요."
            className="border-b-2 bg-orange-50 w-[320px] h-[200px]"
            value={props.shopHoliday}
            onChange={handleChangeInfo}
          />
        </div>

        {/* 재료 및 원산지 */}
        <div className="flex flex-col gap-2">
          <p className="mt-10 text-xl font-bold">재료 / 원산지</p>
          <textarea
            name="FoodOrigin"
            placeholder="재료 및 원산지를 입력해주세요."
            className="border-b-2 bg-orange-50 w-[320px] h-[200px]"
            value={props.FoodOrigin}
            onChange={handleChangeInfo}
          />
        </div>
      </div>

      <TotalButton title="가게 등록하기" onClick={props.onRegisterShop} />

      {isOpen && (
        <>
          <div className="bg-black bg-opacity-50 z-10 w-screen h-screen fixed"></div>
          <div className="fixed z-50">
            <DaumPostcodeEmbed onComplete={handleAboutAddr} autoClose />
            <TotalButton title="닫기" onClick={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterShop;
