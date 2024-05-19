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
    <div className="flex flex-col items-center w-full gap-4 py-16">
      <button
        className="fixed right-4 bottom-[80px] z-10"
        onClick={() => navigate("/register-food")}
      >
        <img
          src={AddIcon}
          alt="메뉴 추가하기"
          className="w-[100px] h-[100px] z-20"
        />
      </button>

      {props.menusInfo.map((menu) => (
        <div
          key={menu.menuId}
          className="relative h-[300px] gap-3 border-2 bg-gray-100 shadow-2xl rounded-3xl p-2 w-full flex"
        >
          <div className="w-[400px] h-[280px] rounded-3xl shadow-lg">
            <img
              src={menu.imageUrl}
              alt="메뉴 사진"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="flex flex-col w-full gap-2 mb-3 ml-10">
            <p className="text-[80px] font-bold">{menu.name}</p>
            <h1 className="text-[50px] font-bold">
              원가 : {menu.originalPrice}원
            </h1>
            <h1 className="text-[50px] font-bold">
              판매가 : {menu.sellPrice}원
            </h1>
            <h1 className="text-[50px] font-bold text-red-600">
              할인율 : {menu.discountRate}%
            </h1>
          </div>

          <div className="absolute w-[70px] h-[70px] right-[95px] top-4">
            <img
              src={EditIcon}
              alt="메뉴 수정하기"
              onClick={() => navigate(`/update/food/${menu.menuId}`)}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute w-[77px] h-[77px] right-[12px] top-4">
            <img
              src={DeleteIcon}
              alt="메뉴 삭제하기"
              onClick={() => DeleteMenu(menu.menuId)}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute bottom-4 right-4">
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
        </div>
      ))}
    </div>
  );
};

export default MenuList;
