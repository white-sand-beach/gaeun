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
    <footer className="flex justify-around py-4 bg-mainColor">
      <button
        className="flex flex-col items-center justify-center gap-1 text-white"
        onClick={() => handleIconClick("/statistics")}
      >
        <div className="w-8 h-8">
          <img
            src={ChartIcon}
            alt="통계"
            className="object-cover w-full h-full"
          />
        </div>
        <p>통계</p>
      </button>

      <button
        className="flex flex-col items-center justify-center gap-1 text-white"
        onClick={() => handleIconClick("/menus")}
      >
        <div className="w-8 h-8">
          <img
            src={AddProductIcon}
            alt="물품등록"
            className="object-cover w-full h-full"
          />
        </div>
        <p>메뉴</p>
      </button>

      <button
        className="flex flex-col items-center justify-center gap-1 text-white"
        onClick={() => handleIconClick("/order")}
      >
        <div className="w-8 h-8">
          <img
            src={OrderListIcon}
            alt="주문현황"
            className="object-cover w-full h-full"
          />
        </div>
        <p>주문현황</p>
      </button>

      <button
        className="flex flex-col items-center justify-center gap-1 text-white"
        onClick={() => handleIconClick("/sales")}
      >
        <div className="w-8 h-8">
          <img
            src={SellListIcon}
            alt="판매내역"
            className="object-cover w-full h-full"
          />
        </div>
        <p>판매내역</p>
      </button>

      <button
        className="flex flex-col items-center justify-center gap-1 text-white"
        onClick={() => handleIconClick("/mystore")}
      >
        <div className="w-8 h-8">
          <img
            src={ProfileIcon}
            alt="프로필"
            className="object-cover w-full h-full"
          />
        </div>
        <p>프로필</p>
      </button>
    </footer>
  );
};

export default Footer;
