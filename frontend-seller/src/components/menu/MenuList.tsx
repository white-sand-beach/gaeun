import React from "react";
import { MenuListType } from "../../types/menu/MenuListType";
import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton";
import DeleteMenuAPI from "../../service/menu/DeleteMenuAPI";
import RegisterSalesAPI from "../../service/sales/RegisterSalesAPI";
import Cookies from "universal-cookie";
import plus from "../../assets/order/plus.png";

const MenuList: React.FC<MenuListType> = (props) => {
  const cookies = new Cookies();
  const storeId = cookies.get("storeId");
  const navigate = useNavigate();
  const { DeleteMenu } = DeleteMenuAPI();
  const { postSales } = RegisterSalesAPI();

  return (
    <div className="flex flex-col items-center w-full gap-4 py-16">
      <button
        className="bg-white rounded-full border-gray-200 shadow-xl border-4 fixed right-4 bottom-[80px] z-10"
        onClick={() => navigate("/register-food")}
      >
        <img className="w-6 m-6" src={plus} alt="더하기" />
      </button>

      {props.menusInfo.map((menu) => (
        <div
          key={menu.menuId}
          className="relative w-full h-[300px] gap-3 border-2 shadow-2xl rounded-3xl p-2 flex"
        >
          <div className="flex justify-between w-screen mx-5">
            <div className="flex justify-center items-center w-[400px] h-full border-6 border-gray-200 rounded-3xl shadow-lg">
              <img
                src={menu.imageUrl}
                alt="메뉴 사진"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
            <div className="flex flex-col w-full gap-2 my-auto ml-10">
              <div className="flex justify-between items-center ">
                <p className="text-[60px] font-bold mb-10">{menu.name}</p>
                <div className="flex mb-12">
                  <button
                    onClick={() => navigate(`/update/food/${menu.menuId}`)}
                    className="hover:bg-mainColor hover:text-white mr-2 text-[25px] font-bold whitespace-nowrap border-4 border-mainColor text-mainColor bg-white rounded-3xl px-6 py-2"
                  >
                    메뉴 수정하기
                  </button>
                  <button
                    onClick={() => DeleteMenu(menu.menuId)}
                    className="hover:bg-mainColor hover:text-white text-[25px] font-bold whitespace-nowrap border-4 border-mainColor text-mainColor bg-white rounded-3xl px-6 py-2"
                  >
                    메뉴 삭제
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="pb-10">
                  <h1 className="text-[35px] font-bold">
                    원가: {menu.originalPrice.toLocaleString()} 원
                  </h1>
                  <h1 className="text-[35px] font-bold my-2">
                    판매가: {menu.sellPrice.toLocaleString()} 원
                  </h1>
                  <h1 className="text-[35px] font-bold text-red-600">
                    할인율: {menu.discountRate}%
                  </h1>
                </div>
                <TotalButton
                  title="판매 등록"
                  onClick={() =>
                    postSales({
                      storeId: storeId,
                      saleList: [
                        {
                          sellPrice: menu.sellPrice,
                          content: "맛있어요!",
                          stock: 100,
                          menuId: menu.menuId,
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
