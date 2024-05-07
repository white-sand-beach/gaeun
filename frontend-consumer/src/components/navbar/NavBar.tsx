import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserLocation from "../../store/UserLocation";
import cart from "../../assets/navbar/cart.png";
import ring from "../../assets/navbar/ring.png";
import back from "../../assets/navbar/back.png";

const NavBar = () => {
  const { alias } = useUserLocation((state) => ({
    alias: state.alias,
  })); // 스토어에서 별명 가져오기

  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleUpdateAddress = () => {
    navigate("/address-search");
  };

  let title = "";
  switch (location.pathname) {
    case "/":
      title = "";
      break;
    case "/login":
      title = "로그인";
      break;
    case "/login-callback":
      title = "";
      break;
    case "/sign-up":
      title = "회원가입";
      break;
    case "/alarm":
      title = "알림";
      break;
    case "/cart":
      title = "장바구니";
      break;
    case "/add-cart":
      title = "장바구니 추가";
      break;
    case "/search":
      title = "검색";
      break;
    case "/favorite":
      title = "찜 목록";
      break;
    case "/order-state":
      title = "주문현황";
      break;
    case "/order-detail":
      title = "주문상세";
      break;
    case "/order-list":
      title = "주문내역";
      break;
    case "/profile":
      title = "마이페이지";
      break;
    case "/profile-setting":
      title = "프로필 설정";
      break;
    case "/shop":
      title = "";
      break;
    case "/address-search":
      title = "";
      break;
    case "/address-search-registration":
      title = "";
      break;
    case "/my-review":
      title = "나의 리뷰 목록";
      break;
    default:
      title = "";
  }

  const showHomeAddress =
    location.pathname === "/" ||
    location.pathname === "/search" ||
    location.pathname === "/search-result";

  const showCartAndAlarm = location.pathname !== "/sign-up";

  return (
    <div className="fixed z-20 w-full p-4 rounded-b-lg between bg-myColor">
      <div className="w-[33%]">
        {showHomeAddress ? (
          <p className="font-bold" onClick={handleUpdateAddress}>
            {alias} ▼
          </p>
        ) : (
          <img src={back} alt="뒤로가기" onClick={handleBackClick} />
        )}
      </div>
      <div className="w-[34%] text-center font-extrabold">{title}</div>
      {showCartAndAlarm ? (
        <div className="flex w-[33%] justify-end">
          <Link to="/alarm">
            <img src={ring} alt="알림" />
          </Link>
          <Link to="/cart">
            <img src={cart} alt="장바구니" className="ml-6" />
          </Link>
        </div>
      ) : (
        <div className="w-[33%]">{""}</div>
      )}
    </div>
  );
};

export default NavBar;
