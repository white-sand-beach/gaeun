import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MenuInfoType } from "../../types/menu/MenuInfoType";
import GetMenuAPI from "../../service/menu/GetMenuAPI";
import logo from "/icons/main-icon-192.png";
import camera from "../../assets/addphoto.png";
import { PutMenuAPIType } from "../../types/menu/PutMenuAPIType";
import TotalButton from "../ui/TotalButton";
import PutMenuAPI from "../../service/menu/PutMenuAPI";

const UpdateFood = () => {
  // 메뉴 상세보기를 위한 menuId를 useParams를 통해 구함
  const { menuId } = useParams();
  const [menuInfo, setMenuInfo] = useState<MenuInfoType | null>(null);
  const [updateMenuInfo, setUpdateMenuInfo] = useState<PutMenuAPIType>({
    image: "",
    name: "",
    originalPrice: 0,
    sellPrice: 0
  })

  useEffect(() => {
    if (menuInfo) {
      setUpdateMenuInfo({
        image: menuInfo.imageUrl,
        name: menuInfo.name,
        originalPrice: menuInfo.originalPrice,
        sellPrice: menuInfo.sellPrice
      })
    }
  }, [menuInfo])

  const imgRef = useRef<HTMLInputElement>(null);
  const handleImage = () => {
    imgRef.current && imgRef.current.click();
  };

  const handleChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUpdateMenuInfo({
      ...updateMenuInfo,
      [name]: value,
    });
    console.log(`${name} : ${value}`)
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
      storeId: 12
    })
  };

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
      <input type="file" className="hidden" ref={imgRef} />

      {/* 음식명 입력칸 */}
      <input
        name="name"
        type="text"
        placeholder="음식명을 입력하세요."
        className="w-[290px] border-b-[3px]"
        value={updateMenuInfo.name}
        onChange={handleChangeInfo}
      />

      {/* 원가 입력칸 */}
      <div className="flex flex-row mt-10">
        <input
          name="originalPrice"
          type="number"
          placeholder="상품의 원가를 입력하세요."
          className="w-[270px] border-b-[3px]"
          value={updateMenuInfo.originalPrice}
          onChange={handleChangeInfo}
          onFocus={(event) =>
            event.target.value === "0" && (event.target.value = "")
          }
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
            value={updateMenuInfo.sellPrice}
            onChange={handleChangeInfo}
            onFocus={(event) =>
              event.target.value === "0" && (event.target.value = "")
            }
          />
          <p className="text-xl font-bold">원</p>
        </div>
        <p className="text-[12px] text-gray-500 mt-2 font-bold"></p>
      </div>
      <TotalButton title="수정 요청" onClick={handleUpdateMenu} />
    </div>
  );
};

export default UpdateFood;
