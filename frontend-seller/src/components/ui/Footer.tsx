import ChartIcon from "../../assets/chart.png";
import SellListIcon from "../../assets/sell-list.png";
import OrderListIcon from "../../assets/order-list.png";
import AddProductIcon from "../../assets/add-product.png";
import ProfileIcon from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Footer = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const handleIconClick = (path: string) => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <footer>
      <button className="flex flex-col items-center justify-center">
        <img src={ChartIcon} alt="통계" />
        <p>통계</p>
      </button>

      <button className="flex flex-col items-center justify-center" onClick={() => handleIconClick("/order-finished")}>
        <img src={SellListIcon} alt="판매내역" />
        <p>판매내역</p>
      </button>

      <button className="flex flex-col items-center justify-center" onClick={() => handleIconClick("/order")}>
        <img src={OrderListIcon} alt="주문현황" />
        <p>주문현황</p>
      </button>

      <button className="flex flex-col items-center justify-center" onClick={() => handleIconClick("/register-food")}>
        <img src={AddProductIcon} alt="물품등록" />
        <p>등록하기</p>
      </button>

      <button className="flex flex-col items-center justify-center" onClick={() => handleIconClick("/mystore")}>
        <img src={ProfileIcon} alt="프로필" />
        <p>프로필</p>
      </button>
    </footer>
  );
};

export default Footer;
