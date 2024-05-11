import right from "../../assets/store/right.png";
import sale from "../../assets/store/sale.png";

const ShopMenu = () => {
  return (
    <div>
      <div className="m-auto mt-5 center">
        <div className="w-[350px] h-[135px] border-2 rounded-xl px-4 pt-2">
          <div className="between">
            <div>
              <div className="flex items-center space-x-1">
                <img className="w-4" src={sale} alt="세일" />
                <p className="font-bold text-red-500 text-xxxs">
                  지금 36% 할인 중
                </p>
              </div>
              <h5 className="mt-1 text-sm font-bold">두툼 연어초밥</h5>
              <div className="h-10 text-xs">
                <p>연어초밥 + 양파무침 + 우동 1그릇</p>
              </div>
              <div className="text-xs">
                <div className="flex">
                  <p>가격</p>
                  <div className="flex items-center ml-2 space-x-2 ">
                    <span className="line-through">19900원</span>
                    <img className="w-4 h-4" src={right} alt="화살표" />
                    <span className="font-bold text-red-500">13900원</span>
                  </div>
                </div>
                <div>
                  <p>남은수량 : 얼마남지 않았어요!</p>
                </div>
              </div>
            </div>
            <div className="bg-myColor w-[112px] h-[112px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopMenu;
