const OrderDeleteButton = () => {
  return (
    <div className="w-[300px] mx-6 mt-4">
      <div>
        <p className="mx-2 font-bold text-gray-400 text-xxs">
          주문 내역 삭제 시 되돌릴 수 없습니다.
        </p>
        <button className="footer-button">주문내역 삭제</button>
      </div>
    </div>
  );
};

export default OrderDeleteButton;
