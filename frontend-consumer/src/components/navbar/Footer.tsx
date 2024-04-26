import { Link } from "react-router-dom";

import search from "../../assets/footer/search.png";
import like from "../../assets/footer/like.png";
import map from "../../assets/footer/map.png";
import order from "../../assets/footer/order.png";
import profile from "../../assets/footer/profile.png";

const Footer = () => {
  return (
    <div className="fixed flex bg-white w-full p-2 bottom-0 border-t-2 rounded-t-lg">
        <Link className="footer" to="/search">
          <img src={search} alt="검색" />
          <div className="footer-div">검색</div>
        </Link>
        <Link className="footer" to="/favorite">
          <img src={like} alt="찜" />
          <div className="footer-div">찜</div>
        </Link>
        <Link className="footer" to="/">
          <img src={map} alt="홈" />
          <div className="footer-div">홈</div>
        </Link>
        <Link className="footer" to="/order-list">
          <img src={order} alt="주문내역" />
          <div className="footer-div">주문내역</div>
        </Link>
        <Link className="footer" to="/profile">
          <img src={profile} alt="마이페이지" />
          <div className="footer-div">마이페이지</div>
        </Link>
    </div>
  );
};

export default Footer;
