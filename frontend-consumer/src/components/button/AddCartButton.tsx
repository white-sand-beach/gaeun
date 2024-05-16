import { useNavigate } from "react-router-dom";

import { MenuItem } from "../../types/ShopMenuType";
import CartPostService from "../../services/carts/CartPostService";
import CartAllDeleteService from "../../services/carts/CartAllDeleteService";

interface CartInfoProps {
  menu: MenuItem;
  quantity: number;
  storeId: number;
}

const AddCartButton = ({ menu, quantity, storeId }: CartInfoProps) => {
  const navigate = useNavigate();
  const totalPrice = menu.sellPrice * quantity;
  // 1000원부터 1,000원 이렇게 보이게 설정하는 것
  const formattedTotalPrice = new Intl.NumberFormat("ko-KR").format(totalPrice);

  const handleAddCart = async () => {
    try {
      const result = await CartPostService({ quantity, storeId, saleId: menu.saleId });
      if ('status' in result) {
        if (result.status === 409) {
          if (window.confirm("이미 장바구니에 다른 가게 메뉴가 담겨 있습니다. 장바구니를 비우시겠습니까?")) {
             await CartAllDeleteService();
             if (window.confirm("장바구니를 비웠습니다! 해당 메뉴를 장바구니에 바로 담으시겠어요?")) {
              await CartPostService({ quantity, storeId, saleId: menu.saleId }); // 새로운 아이템 추가
              alert(`${menu.name}을(를) 장바구니에 담았어요!`);
              navigate(-1);
            }
          }
        } else if (result.status === 400) {
          alert("가게가 문을 닫았거나 해당 메뉴의 판매가 끝났습니다. 죄송합니다.");
          navigate(-1);
        }
      } else {
        alert(`${menu.name}을(를) 장바구니에 담았어요!`);
        navigate(-1);
        console.log("카트 담기 성공");
      }
    } catch (error) {
      console.log("카트 담기 실패", error);
    }
  };

  return (
    <div className="py-4 fixed bottom-10 w-[300px]">
      <div className="text-gray-400 text-xxs mb-2">
        <p>메뉴 사진과 실제 조리된 음식은 상이할 수 있습니다.</p>
        <p>음식에 문제가 있다면 바로 말씀해주세요.</p>
      </div>

      <button onClick={handleAddCart} className="footer-button">
        {formattedTotalPrice}원 장바구니 담기
      </button>
    </div>
  );
};

export default AddCartButton;
