import logo from "/icons/main-icon-192.png";
import camera from "../../assets/addphoto.png";
import React from "react";
import { InputFoodType } from "../../types/foods/InputFoodType.ts";
import TotalButton from "../ui/TotalButton.tsx";

const RegisterFood: React.FC<InputFoodType> = (props) => {

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      props.onChangeImg(event.target.files[0])
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 음식 이미지 추가 */}
      {!props.image ?
        <div>
          <label htmlFor="input-file" className="w-[240px]" >
            <img src={logo} alt="음식사진" className="w-[200px]" />
            <img
              src={camera}
              alt="사진 추가"
              className="w-[35px] relative z-10 -top-12 left-[145px]"
            />
          </label>
          <input name="image" id="input-file" type="file" accept="image/*" className="hidden" onChange={handleImage} />
        </div> :
        <img src={URL.createObjectURL(props.image)} alt="음식사진" className="w-[290px] h-[240px] rounded-lg" />
      }

      {/* 음식명 입력칸 */}
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">음식명</p>
        <input
          name="name"
          type="text"
          placeholder="음식명을 입력하세요."
          className="w-[290px] border-b-[3px]"
          value={props.name}
          onChange={props.onChangeInput}
        />
      </div>

      {/* 원가 입력칸 */}
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-xl font-bold">원가</p>
        <div className="flex flex-row">
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
      </div>

      {/* 판매가 입력칸 */}
      <div className="flex flex-col p-2 mt-4">
        <p className="text-xl font-bold">판매가</p>
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
