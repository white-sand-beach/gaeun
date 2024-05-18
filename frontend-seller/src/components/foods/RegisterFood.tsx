import logo from "../../assets/logo/logo.png";
import camera from "../../assets/addphoto.png";
import React from "react";
import { InputFoodType } from "../../types/foods/InputFoodType.ts";
// import TotalButton from "../ui/TotalButton.tsx";

const RegisterFood: React.FC<InputFoodType> = (props) => {
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      props.onChangeImg(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center top-[50px] gap-3">
      {/* 음식 이미지 추가 */}
      <>
        <div>
          <label htmlFor="input-file">
            <div className="relative flex justify-center items-center">
              {!props.image ? (
                <div className="border-[5px] rounded-full border-white p-2 bg-gray-50 shadow-lg">
                  <img
                    src={logo}
                    alt="음식사진"
                    className="w-[300px] rounded-full"
                  />
                </div>
              ) : (
                <div className="border-[5px] rounded-3xl border-white p-2 bg-gray-100 shadow-lg">
                  <img
                    src={URL.createObjectURL(props.image)}
                    alt="음식사진"
                    className="w-[300px] h-[300px] rounded-3xl object-cover"
                  />
                </div>
              )}
              <div>
                <img
                  src={camera}
                  alt="사진 추가"
                  className="w-[60px] bottom-0 right-0 absolute z-10"
                />
                <input
                  name="image"
                  id="input-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>
          </label>
        </div>
      </>

      {/* 음식명 입력칸 */}
      <div className="py-14">
        <div>
          <p className="text-3xl font-bold mb-4 pl-2">음식명</p>
          <input
            name="name"
            type="text"
            placeholder="음식명을 입력하세요."
            className="w-[400px] p-4 text-lg border-b-[3px]"
            value={props.name}
            onChange={props.onChangeInput}
          />
        </div>

        {/* 원가 입력칸 */}
        <div className="py-10">
          <p className="text-3xl font-bold mb-4 pl-2">음식 원가</p>
          <div className="flex items-center">
            <input
              name="originalPrice"
              type="number"
              placeholder="상품의 원가를 입력하세요."
              className="w-[400px] p-4 text-lg border-b-[3px] mr-2"
              // value={props.originalPrice}
              onChange={props.onChangeInput}
              onFocus={(event) =>
                event.target.value === "0" && (event.target.value = "")
              }
            />
            <p className="text-xl font-bold">원</p>
          </div>
        </div>

        {/* 판매가 입력칸 */}
        <div>
          <p className="text-3xl font-bold mb-4 pl-2">음식 판매가</p>
          <div className="flex items-center">
            <input
              name="sellPrice"
              type="number"
              placeholder="상품의 판매가를 입력하세요."
              className="w-[400px] p-4 text-lg border-b-[3px] mr-2"
              // value={props.sellPrice}
              onChange={props.onChangeInput}
              onFocus={(event) =>
                event.target.value === "0" && (event.target.value = "")
              }
            />
            <p className="text-xl font-bold">원</p>
          </div>
          <p className="text-sm pl-2 text-gray-400 mt-2 font-bold">
            최초 등록 이후에도 판매가는 수정할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterFood;
