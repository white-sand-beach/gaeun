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
    <div className="flex flex-col items-center gap-4">
      <button className="common-btn" onClick={() => navigate("/register/food")}>
        메뉴 등록
      </button>
      <h1>메뉴 보여줄 페이지 입니다.</h1>
      <h1>여기서 바로 음식 수량을 결정, 판매를 등록합니다.</h1>

      <div className="grid grid-cols-2 gap-4">
        {props.menusInfo.map((menu) => (
          <div
            key={menu.menuId}
            className="flex flex-col gap-3 border-2 rounded-lg"
          >
            <img src={menu.imageUrl} alt="" className="w-[40px] h-[40px]" />
            <h1>메뉴이름 : {menu.name}</h1>
            <h1>원가 : {menu.originalPrice}원</h1>
            <h1>판매가 : {menu.sellPrice}원</h1>
            <h1>할인율 : {menu.discountRate}%</h1>
            {/* <input type="text" value={menu.content} onChange={(e) => handleChangeContent(menu.menuId, e.target.value)} placeholder="상세설명 설정"/>
            <input type="number" value={menu.stock} onChange={(e) => handleChangeStock(menu.menuId, Number(e.target.value))} placeholder="재고 설정"/> */}
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
                  storeId: 29,
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
