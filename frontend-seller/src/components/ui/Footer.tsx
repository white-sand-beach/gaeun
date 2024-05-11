import ChartIcon from "../../assets/chart.png";
import SellListIcon from "../../assets/sell-list.png";
import OrderListIcon from "../../assets/order-list.png";
import AddProductIcon from "../../assets/add-product.png";
import ProfileIcon from "../../assets/profile.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center">
        <img src={ChartIcon} alt="통계" />
        <p>통계</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={SellListIcon} alt="판매내역" />
        <p>판매내역</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <img src={OrderListIcon} alt="주문현황" />
        <p>주문현황</p>
      </div>
      <Link to={"/register/food"}>
        <div className="flex flex-col items-center justify-center">
          <img src={AddProductIcon} alt="물품등록" />
          <p>등록하기</p>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center">
        <img src={ProfileIcon} alt="프로필" />
        <p>프로필</p>
      </div>
    </footer>
  );
};

export default Footer;
