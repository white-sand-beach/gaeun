import cart from "../../assets/navbar/cart.png";
import ring from "../../assets/navbar/ring.png";
import back from "../../assets/navbar/back.png";

const NavBar = () => {
  return (
    <div className="fixed z-20 flex items-center justify-between w-full p-4 bg-myColor">
      <div className="w-20">
        <img src={back} alt="뒤로가기" />
      </div>
      <div className="font-extrabold">현재위치</div>
      <div className="flex justify-end w-20">
        <img src={ring} alt="알림" />
        <img src={cart} alt="장바구니" className="ml-6" />
      </div>
    </div>
  );
};

export default NavBar;
