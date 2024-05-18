import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MenuInfoType } from "../../types/menu/MenuInfoType";
import GetMenuAPI from "../../service/menu/GetMenuAPI";
import camera from "../../assets/addphoto.png";
import { PutMenuAPIType } from "../../types/menu/PutMenuAPIType";
import TotalButton from "../ui/TotalButton";
import PutMenuAPI from "../../service/menu/PutMenuAPI";
import Cookies from "universal-cookie";

const UpdateFood = () => {
  const cookies = new Cookies();
  const storeId = cookies.get("storeId");
  // 메뉴 상세보기를 위한 menuId를 useParams를 통해 구함
  const { menuId } = useParams();
  const [menuInfo, setMenuInfo] = useState<MenuInfoType | null>(null);
  const [updateMenuInfo, setUpdateMenuInfo] = useState<PutMenuAPIType>({
    image: null,
    name: "",
    originalPrice: 0,
    sellPrice: 0,
  });

  useEffect(() => {
    if (menuInfo) {
      setUpdateMenuInfo({
        image: null,
        name: menuInfo.name,
        originalPrice: menuInfo.originalPrice,
        sellPrice: menuInfo.sellPrice
      })
    }
  }, [menuInfo])
  

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null
    if (selectedFile) {
      setUpdateMenuInfo((prev) => ({
        ...prev,
        image: selectedFile
      }))
    }
  };

  const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUpdateMenuInfo({
      ...updateMenuInfo,
      [name]: value,
    });
    console.log(`${name} : ${value}`);
  };

  // 메뉴 id의 변화에 따른 메뉴 상세보기 페이지 rendering
  useEffect(() => {
    const { getMenu } = GetMenuAPI();

    // 메뉴 리스트 전체 받아온 후
    getMenu((menus: MenuInfoType[]) => {
      // 요청으로 얻은 menuId랑 useParams로 받은 menuId랑 같은거 찾기
      const findMenuInfo = menus.find(
        (menu) => menu.menuId?.toString() === menuId
      );
      // 찾았으면 setMenuInfo 에 해당 menuId에 대한 정보를 할당
      if (findMenuInfo) {
        setMenuInfo(findMenuInfo);
      }
    });
  }, [menuId]);

  const { putMenu } = PutMenuAPI();
  const handleUpdateMenu = () => {
    putMenu({
      menuId: menuId,
      name: updateMenuInfo.name,
      image: updateMenuInfo.image,
      originalPrice: updateMenuInfo.originalPrice,
      sellPrice: updateMenuInfo.sellPrice,
      storeId: storeId,
    });
  };

  return (
    <div className="flex flex-col items-center top-[50px] gap-3">
      {/* 음식 이미지 추가 */}
      <label htmlFor="input-file">
        <div className="relative flex justify-center items-center">
          {!updateMenuInfo?.image ? (
            <div className="border-[5px] rounded-full border-white p-2 bg-gray-50 shadow-lg">
              <img
                src={menuInfo?.imageUrl}
                alt="음식사진"
                className="w-[300px] h-[300px] rounded-full"
              />
            </div>
          ) : (
            <div className="border-[5px] rounded-3xl border-white p-2 bg-gray-100 shadow-lg">
              <img
                src={updateMenuInfo.image instanceof File ? URL.createObjectURL(updateMenuInfo.image) : updateMenuInfo.image}
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

      {/* 음식명 입력칸 */}
      <div className="py-14">
        <div>
          <p className="text-3xl font-bold mb-4 pl-2">음식명</p>
          <input
            name="name"
            type="text"
            placeholder="음식명을 입력하세요."
            className="w-[400px] p-4 text-lg border-b-[3px]"
            value={updateMenuInfo.name}
            onChange={handleChangeInfo}
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
              // value={menuInfo?.originalPrice}
              onChange={handleChangeInfo}
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
              // value={menuInfo?.sellPrice}
              onChange={handleChangeInfo}
              onFocus={(event) =>
                event.target.value === "0" && (event.target.value = "")
              }
            />
            <p className="text-xl font-bold">원</p>
          </div>
        </div>
      </div>
      <TotalButton title="수정 요청" onClick={handleUpdateMenu} />
    </div>
  );
};

export default UpdateFood;
