import OrderDetailButton from "../button/OrderDetailButton";

import phone from "../../assets/search/phone.png";

const Ordertarget = () => {
  return (
    <div>
      <div className="w-[300px] border-2 rounded-xl mb-2">
        <div className="flex items-center justify-between px-4 pt-2 text-xs font-bold text-gray-400">
          <p>4.18(목)</p>
          <p className="text-xxs">구매 상태</p>
        </div>
        <div className="items-center py-2 pl-4 font-bold">
          <h1>가게명</h1>
          <div className="flex items-center text-gray-400 text-xxs">
            <p className="">메뉴 1개, 메뉴 2개 혹은 메뉴 외 1개</p>
            <p className="ml-2 text-red-500">31,900원</p>
          </div>
        </div>
        <div className="flex items-center justify-between mx-4 mb-2">
          <button className="flex items-center">
            <img className="w-4" src={phone} alt="전화" />
            <p className="ml-1 font-bold text-gray-400 text-xxs">전화</p>
          </button>
          <OrderDetailButton />
        </div>
      </div>
    </div>
  );
};

export default Ordertarget;
