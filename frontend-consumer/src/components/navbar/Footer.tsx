import { Link, useLocation } from "react-router-dom";

import search from "../../assets/footer/search.png";
import like from "../../assets/footer/like.png";
import map from "../../assets/footer/map.png";
import order from "../../assets/footer/order.png";
import profile from "../../assets/footer/profile.png";

// bg-gray-100 rounded-2xl 지우지마용 ㅠㅠ
const Footer = () => {
  const location = useLocation();

  const getLinkClassName = (path: string) => {
    return `footer ${location.pathname === path ? "bg-gray-100 rounded-full" : ""}`;
  };

  return (
    <div className="fixed bottom-0 z-20 flex w-full p-2 bg-white border-t-2 rounded-t-lg">
      <Link className={getLinkClassName("/search")} to="/search">
        <img src={search} alt="검색" />
        <div className="footer-div">검색</div>
      </Link>
      <Link className={getLinkClassName("/favorite")} to="/favorite">
        <img src={like} alt="찜" />
        <div className="footer-div">찜</div>
      </Link>
      <Link className={getLinkClassName("/")} to="/">
        <img src={map} alt="홈" />
        <div className="footer-div">홈</div>
      </Link>
      <Link className={getLinkClassName("/order-list")} to="/order-list">
        <img src={order} alt="주문내역" />
        <div className="footer-div">주문내역</div>
      </Link>
      <Link className={getLinkClassName("/profile")} to="/profile">
        <img src={profile} alt="마이페이지" />
        <div className="footer-div">마이페이지</div>
      </Link>
    </div>
  );
};

export default Footer;
