import { useNavigate } from "react-router-dom";

import CartPostService from "../../services/carts/CartPostService";

import { MenuItem } from "../../types/ShopMenuType"

interface CartInfoProps {
  menu: MenuItem;
  quantity: number;
  storeId: number;
}

const AddCartButton = ({ menu, quantity, storeId }: CartInfoProps) => {
  const navigate = useNavigate();
  const totalPrice = menu.sellPrice * quantity
  // 1000원부터 1,000원 이렇게 보이게 설정하는 것 
  const formattedTotalPrice = new Intl.NumberFormat('ko-KR').format(totalPrice);

  const handleAddCart = async () => {
    try {
      await CartPostService({ quantity, storeId, saleId: menu.saleId})
      navigate(-1)
      console.log("카트 담기 성공")
    } catch {
      console.log("카트 담기 실패")
    }
  }

  return (
    <div className="py-4 fixed bottom-10">
      <div className="text-gray-400 text-xxs mb-2">
        <p>메뉴 사진과 실제 조리된 음식은 상이할 수 있습니다.</p>
        <p>음식에 문제가 있다면 바로 말씀해주세요.</p>
      </div>

      <button onClick={handleAddCart} className="footer-button">{formattedTotalPrice}원 장바구니 담기</button>
    </div>
  );
};

export default AddCartButton;
