import right from "../../assets/right.png";
import sale from "../../assets/store/sale.png";

const CartInfo = () => {
  return (
    <div>
        <h1 className="text-2xl text-center font-bold">
          음식명(음식이름)
        </h1>
        <div className="center mt-4">
          <div className="w-[330px] border-2 rounded-3xl px-4 py-2 space-y-2 shadow-xl">
            <div className="flex items-center space-x-1">
              <img className="w-4" src={sale} alt="세일" />
              <p className="text-red-500 text-xs font-bold">지금 36% 할인 중</p>
            </div>
            <div className="text-sm">
              <p>연어초밥 + 우동 1그릇 + 밑 반찬</p>
            </div>
            <div className="between font-bold">
              <p>가격</p>
              <div className="flex items-center space-x-2">
                <span className="line-through">19900원</span>
                <img className="w-4 h-4" src={right} alt="화살표" />
                <span className="text-red-500">13900원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CartInfo;