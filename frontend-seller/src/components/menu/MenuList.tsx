import React from "react";
import { MenuListType } from "../../types/menu/MenuListType";
import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton";
import DeleteMenuAPI from "../../service/menu/DeleteMenuAPI";

const MenuList: React.FC<MenuListType> = (props) => {
  const navigate = useNavigate()
  const { DeleteMenu } = DeleteMenuAPI();

  return (
    <div>
      <h1>메뉴 보여줄 페이지 입니다.</h1>
      <h1>여기서 바로 음식 수량을 결정, 판매를 등록합니다.</h1>

      <div className="flex flex-col items-center mt-10 gap-4">
        {props.menusInfo.map((menu) => (
          <div key={menu.menuId} className="border-2 rounded-lg gap-3 flex flex-col">
            <h1>메뉴이름 : {menu.name}</h1>
            <h1>원가 : {menu.originalPrice}원</h1>
            <h1>판매가 : {menu.sellPrice}원</h1>
            <h1>할인율 : {menu.discountRate}%</h1>
              <TotalButton title="메뉴 수정하기" onClick={() => navigate(`/update/food/${menu.menuId}`)} />
              <TotalButton title="메뉴 삭제하기" onClick={() => DeleteMenu(menu.menuId)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
