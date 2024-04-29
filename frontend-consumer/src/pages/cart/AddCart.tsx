import CartInfo from "../../components/cart/CartInfo";
import ServiceBanner from "../../components/navbar/ServiceBanner";
import CountButton from "../../components/button/CountButton";
import AddCartButton from "../../components/button/AddCartButton";

const AddCart = () => {
  return (
    <div>
      <div className="bg-black h-[150px] text-white center mb-8 ">
        사진 들어가는 곳 img 태그로 넣을거임
      </div>
      {/* 음식 정보 */}
      <CartInfo />
      <div className="center py-4 border-b-2">
        <div className="w-[330px] border-2 border-green-400 rounded-3xl">
          <ServiceBanner />
        </div>
      </div>
      <hr className="border-4 border-gray-100" />

      <div className="center py-2 border-b-2">
        <p className="font-extrabold mr-44">수량</p>
        <CountButton />
      </div>
      <hr className="border-4 border-gray-100" />
      <div className="center">
      <AddCartButton />
      </div>
    </div>
  );
};

export default AddCart;
