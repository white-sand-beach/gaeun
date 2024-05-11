import { MenuItem } from "../../types/ShopMenuType"

interface CartInfoProps {
  menu: MenuItem;
  quantity: number;
}

const AddCartButton = ({ menu, quantity }: CartInfoProps) => {
  const totalPrice = menu.sellPrice * quantity

  // 1000원부터 1,000원 이렇게 보이게 설정하는 것 
  const formattedTotalPrice = new Intl.NumberFormat('ko-KR').format(totalPrice);

  return (
    <div className="py-4 fixed bottom-10">
      <div className="text-gray-400 text-xxs mb-2">
        <p>메뉴 사진과 실제 조리된 음식은 상이할 수 있습니다.</p>
        <p>음식에 문제가 있다면 바로 말씀해주세요.</p>
      </div>

      <button className="footer-button">{formattedTotalPrice}원 장바구니 담기</button>
    </div>
  );
};

export default AddCartButton;
