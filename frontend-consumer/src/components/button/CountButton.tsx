import { useEffect, useState } from "react";
import deleteBtn from "../../assets/btn/deleteBtn.png";
import minusBtn from "../../assets/btn/minusBtn.png";
import plusBtn from "../../assets/btn/plusBtn.png";

import CartAmountService from "../../services/carts/CartAmountService";
import CartDeleteService from "../../services/carts/CartDeleteService";
import { CartItem } from "../../types/CartType";

interface CheckOrderProps {
  menuData: CartItem;
  onDelete: (cartId: string) => void;
}

const CountButton = ({ menuData, onDelete }: CheckOrderProps) => {
  const [quantity, setQuantity] = useState<number>(menuData.quantity);
  const [showBtn, setShowBtn] = useState<boolean>(true);

  const handlePlusClick = async () => {
    const newQuantity =
      Number(quantity) < menuData.restStock
        ? Number(quantity) + 1
        : menuData.restStock;

    try {
      const response = await CartAmountService({
        quantity: newQuantity,
        cartId: menuData.cartId,
      });
      setQuantity(newQuantity);
      newQuantity == 1 ? setShowBtn(false) : setShowBtn(true);
      console.log("수량 변경 응답:", response);
    } catch (error) {
      console.error(newQuantity, "수량 변경 오류:", error);
    }
  };

  const handleMinusClick = async () => {
    const newQuantity = Number(quantity) > 2 ? Number(quantity) - 1 : 1;

    try {
      const response = await CartAmountService({
        quantity: newQuantity,
        cartId: menuData.cartId,
      });
      setQuantity(newQuantity);
      newQuantity == 1 ? setShowBtn(false) : setShowBtn(true);
      console.log("수량 변경 응답:", response);
    } catch (error) {
      console.error(newQuantity, "수량 변경 오류:", error);
    }
  };

  useEffect(() => {
    if (quantity == 1) {
      setShowBtn(false);
    }
  }, []);

  const handleDeleteClick = async () => {
    try {
      // Cart를 삭제하는 요청을 보내고 응답을 받음
      const response = await CartDeleteService(menuData.cartId);
      onDelete(menuData.cartId);
      console.log("Cart 삭제 응답:", response);
    } catch (error) {
      console.error("Cart 삭제 오류:", error);
    }
  };

  return (
    <div className="between px-3 border-gray-200 border-2 rounded-xl w-[80px] font-bold text-sm py-1 ">
      {!showBtn && (
        <img
          className="w-3 h-[14px] cursor-pointer"
          src={deleteBtn}
          alt="삭제 버튼"
          onClick={handleDeleteClick}
        />
      )}
      {showBtn && (
        <img
          onClick={handleMinusClick}
          className="w-2"
          src={minusBtn}
          alt="빼기"
        />
      )}
      <span className="font-bold">{quantity.toString()}</span>
      <img
        onClick={handlePlusClick}
        className="w-2"
        src={plusBtn}
        alt="더하기"
      />
    </div>
  );
};

export default CountButton;
