import React from "react";
import { MenuListType } from "../../types/menu/MenuListType";
import { Link } from "react-router-dom";

const MenuList: React.FC<MenuListType> = (props) => {
  return (
    <div>
      <h1>메뉴 보여줄 페이지 입니다.</h1>
      <h1>여기서 바로 음식 수량을 결정, 판매를 등록합니다.</h1>

      <div className="flex flex-col items-center mt-10">
        {props.menusInfo.map((menu) => (
          <div key={menu.menuId}>
            <h1>메뉴이름 : {menu.name}</h1>
            <h1>원가 : {menu.originalPrice}원</h1>
            <h1>판매가 : {menu.sellPrice}원</h1>
            <h1>할인율 : {menu.discountRate}%</h1>
            <Link to={`/menus/${menu.menuId}`}>
              <button className="common-btn">상세보기</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
