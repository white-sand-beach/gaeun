import logo from "/icons/main-icon-192.png";
import camera from "../../assets/addphoto.png";
import React, { useRef } from "react";
import { InputFoodType } from "../../types/foods/InputFoodType.ts";
import TotalButton from "../ui/TotalButton.tsx";

const RegisterFood: React.FC<InputFoodType> = (props) => {
    const imgRef = useRef<HTMLInputElement>(null);
    const handleImage = () => {
        imgRef.current && imgRef.current.click();
    }
  return (
    <div className="no-footer top-[100px] gap-3">
      {/* 음식 이미지 추가 */}
      <div onClick={handleImage}>
        <img src={logo} alt="음식사진" className="w-[120px]" />
        <img
          src={camera}
          alt="사진 추가"
          className="w-[35px] relative z-10 -top-6 left-[90px]"
        />
      </div>
      <input type="file" className="hidden" ref={imgRef}/>

      {/* 음식명 입력칸 */}
      <input
        name="name"
        type="text"
        placeholder="음식명을 입력하세요."
        className="w-[290px] border-b-[3px]"
        value={props.name}
        onChange={props.onChangeInput}
      />

      {/* 원가 입력칸 */}
      <div className="flex flex-row mt-10">
        <input
          name="originalPrice"
          type="number"
          placeholder="상품의 원가를 입력하세요."
          className="w-[270px] border-b-[3px]"
          value={props.originalPrice}
          onChange={props.onChangeInput}
          onFocus={(event) => event.target.value === "0" && (event.target.value = "")}
        />
        <p className="text-xl font-bold">원</p>
      </div>

      {/* 판매가 입력칸 */}
      <div className="flex flex-col mt-10">
        <div className="flex flex-row">
          <input
            name="sellPrice"
            type="number"
            placeholder="상품의 판매가를 입력하세요."
            className="w-[270px] border-b-[3px]"
            value={props.sellPrice}
            onChange={props.onChangeInput}
            onFocus={(event) => event.target.value === "0" && (event.target.value = "")}
          />
          <p className="text-xl font-bold">원</p>
        </div>
        <p className="text-[12px] text-gray-500 mt-2 font-bold">
          최초 등록 이후에도 판매가는 수정할 수 있습니다.
        </p>
      </div>

      <TotalButton title="메뉴 등록하기" onClick={props.onRegisterFood} />
    </div>
  );
};

export default RegisterFood;
