import search from "../../assets/footer/search.png";
import like from "../../assets/footer/like.png";
import map from "../../assets/footer/map.png";
import order from "../../assets/footer/order.png";
import profile from "../../assets/footer/profile.png";

const Footer = () => {
  return (
    <div className="fixed bottom-0 z-20 flex w-full p-2 bg-white border-t-2">
      <footer>
        <img className="pl-0.5" src={search} alt="검색" />
        <div className="footer-div">검색</div>
      </footer>
      <footer>
        <img className="pl-0.5" src={like} alt="찜" />
        <div className="footer-div">찜</div>
      </footer>
      <footer>
        <img className="pl-0.5" src={map} alt="홈" />
        <div className="footer-div">홈</div>
      </footer>
      <footer>
        <img className="pl-0.5" src={order} alt="주문내역" />
        <div className="footer-div">주문내역</div>
      </footer>
      <footer>
        <img src={profile} alt="마이페이지" />
        <div className="footer-div">마이페이지</div>
      </footer>
    </div>
  );
};

export default Footer;