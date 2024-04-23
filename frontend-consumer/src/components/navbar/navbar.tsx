
import cart from "../../assets/navbar/cart.png";
import ring from "../../assets/navbar/ring.png";
import back from "../../assets/navbar/back.png";

const NavBar = () => {

  return (
    <div className="fixed flex justify-between items-center bg-myColor w-full p-4">
      <div className="w-20">
        <img src={back} alt="뒤로가기" />
      </div>
      <div className="font-extrabold">현재위치</div>
      <div className="flex w-20 justify-end">
        <img src={ring} alt="알림" />
        <img src={cart} alt="장바구니" className="ml-6" />
      </div>
    </div>
  );
};

export default NavBar;
