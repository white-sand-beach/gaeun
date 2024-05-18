import React from "react";
import { MenuListType } from "../../types/menu/MenuListType";
import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton";
import DeleteMenuAPI from "../../service/menu/DeleteMenuAPI";
import RegisterSalesAPI from "../../service/sales/RegisterSalesAPI";
import Cookies from "universal-cookie";
import EditIcon from "../../assets/mypage-change-info.png";
import DeleteIcon from "../../assets/trash-can-slash.png";
import AddIcon from "../../assets/add-button.png";

const MenuList: React.FC<MenuListType> = (props) => {
  const cookies = new Cookies();
  const storeId = cookies.get("storeId");
  const navigate = useNavigate();
  const { DeleteMenu } = DeleteMenuAPI();
  const { postSales } = RegisterSalesAPI();

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <button
        className="fixed right-4 bottom-[80px]"
        onClick={() => navigate("/register-food")}
      >
        <img src={AddIcon} alt="메뉴 추가하기" className="w-[80px] h-[80px]" />
      </button>

      {props.menusInfo.map((menu) => (
        <div
          key={menu.menuId}
          className="relative h-[300px] gap-3 border-2 rounded-3xl p-2 w-[680px] flex flex-col"
        >
          <div className="flex flex-row w-[600px] justify-between items-center gap-6">
            <img
              src={menu.imageUrl}
              alt="메뉴 사진"
              className="w-[200px] h-[200px] rounded-3xl"
            />
            <div className="flex flex-col gap-3 w-full">
              <p className="text-5xl font-bold">{menu.name}</p>
              <h1>원가 : {menu.originalPrice}원</h1>
              <h1>판매가 : {menu.sellPrice}원</h1>
              <h1>할인율 : {menu.discountRate}%</h1>
            </div>
          </div>
          <img
            src={EditIcon}
            alt="메뉴 수정하기"
            onClick={() => navigate(`/update/food/${menu.menuId}`)}
            className="absolute w-[50px] h-[50px] right-[80px] top-4"
          />
          <img
            src={DeleteIcon}
            alt="메뉴 삭제하기"
            onClick={() => DeleteMenu(menu.menuId)}
            className="absolute w-[50px] h-[50px] right-[12px] top-4"
          />
          <TotalButton
            title="판매 등록"
            onClick={() =>
              postSales({
                storeId: storeId,
                saleList: [
                  {
                    sellPrice: menu.sellPrice,
                    content: "테스트 신청",
                    stock: 10,
                    menuId: menu.menuId,
                  },
                ],
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default MenuList;
