import { Link, useNavigate } from "react-router-dom";

import cart from "../../assets/navbar/cart.png";
import ring from "../../assets/navbar/ring.png";
import back from "../../assets/navbar/back.png";

const NavBar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="fixed flex justify-between items-center bg-myColor w-full p-4">
      <img src={back} alt="뒤로가기" onClick={handleBackClick} />
      <div className="font-extrabold">현재위치</div>
      <div className="flex w-20 justify-end">
        <Link to="/alarm">
          <img src={ring} alt="알림" />
        </Link>
        <Link to="/cart">
          <img src={cart} alt="장바구니" className="ml-6" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
