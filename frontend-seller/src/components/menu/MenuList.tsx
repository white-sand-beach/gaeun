import React from "react";
import { MenuListType } from "../../types/menu/MenuListType";
import { useNavigate } from "react-router-dom";
import TotalButton from "../ui/TotalButton";
import DeleteMenuAPI from "../../service/menu/DeleteMenuAPI";
import RegisterSalesAPI from "../../service/sales/RegisterSalesAPI";

const MenuList: React.FC<MenuListType> = (props) => {
  const navigate = useNavigate();
  const { DeleteMenu } = DeleteMenuAPI();
  const { postSales } = RegisterSalesAPI();
  // // 각 메뉴 아이템의 stock와 content 값을 관리하기 위한 상태 변수
  // const [menuItems, setMenuItems] = useState(props.menusInfo.map(menu => ({
  //   ...menu,
  //   content: "",
  //   stock: 0
  // })));

  // // 물품 재고 설정
  // const handleChangeStock = (menuId: number, value: number) => {
  //   setMenuItems(prevMenuItems =>
  //     prevMenuItems.map(menu => {
  //       if (menu.menuId === menuId) {
  //         return {
  //           ...menu,
  //           stock: value
  //         };
  //       }
  //       return menu;
  //     })
  //   );
  // };

  // // 물품 상세설명
  // const handleChangeContent = (menuId: number, value: string) => {
  //   setMenuItems(prevMenuItems =>
  //     prevMenuItems.map(menu => {
  //       if (menu.menuId === menuId) {
  //         return {
  //           ...menu,
  //           content: value
  //         };
  //       }
  //       return menu;
  //     })
  //   );
  // };

  return (
    <div className="flex flex-col items-center gap-8">
      <button
        className="flex items-center justify-center w-32 h-12 mt-8 text-white bg-blue-500 rounded-lg"
        onClick={() => navigate("/register-food")}
      >
        메뉴 등록
      </button>
      <h1 className="text-2xl font-bold">메뉴 리스트</h1>
      <p className="text-lg">
        여기서 바로 음식 수량을 결정하고 판매를 등록할 수 있습니다.
      </p>

      <div className="grid w-full max-w-screen-lg grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.menusInfo.map((menu) => (
          <div
            key={menu.menuId}
            className="flex flex-col gap-3 p-4 bg-white border-2 rounded-lg shadow-lg"
          >
            <img
              src={menu.imageUrl}
              alt={menu.name}
              className="object-cover w-full h-32 rounded-lg"
            />
            <h2 className="text-xl font-semibold">{menu.name}</h2>
            <p className="text-gray-700">원가: {menu.originalPrice}원</p>
            <p className="text-gray-700">판매가: {menu.sellPrice}원</p>
            <p className="text-gray-700">할인율: {menu.discountRate}%</p>
            <TotalButton
              title="메뉴 수정하기"
              onClick={() => navigate(`/update/food/${menu.menuId}`)}
            />
            <TotalButton
              title="메뉴 삭제하기"
              onClick={() => DeleteMenu(menu.menuId)}
            />
            <TotalButton
              title="판매 등록"
              onClick={() =>
                postSales({
                  storeId: 1,
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
    </div>
  );
};

export default MenuList;
