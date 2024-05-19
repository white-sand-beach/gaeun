import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GotoBack from "../../assets/back.png";
import NotiIcon from "../../assets/notification.png";
import SellerNotiCount from "../../service/notification/SellerNotiCount";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notiCount, setNotiCount] = useState<number>(0);

  useEffect(() => {
    const fetchCountInfo = async () => {
      try {
        const response = await SellerNotiCount();
        setNotiCount(response.data.data.count);
        return response;
      } catch (err) {
        console.error(err);
      }
    };
    fetchCountInfo();
  }, []);

  // 주소에 따른 Header의 title변경
  let title = "";
  switch (location.pathname) {
    case "/":
      title = "메인";
      break;
    case "/login":
      title = "로그인";
      break;
    case "/signup":
      title = "회원가입";
      break;
    case "/order":
      title = "주문현황";
      break;
    case "/notification":
      title = "알림";
      break;
    case "/register-shop":
      title = "가게등록";
      break;
    case "/order-finished":
      title = "판매내역";
      break;
    case "/statistics":
      title = "통계";
      break;
    case "/register-food":
      title = "메뉴등록";
      break;
    case "/menus":
      title = "메뉴";
      break;
  }

  return (
    <header>
      <button onClick={() => navigate(-1)}>
        <img src={GotoBack} alt="뒤로가기" className="w-[40px] h-[40px]" />
      </button>
      <h1>{title}</h1>
      <button onClick={() => navigate("/notification")}>
        <p className="">{notiCount}</p>
        <img src={NotiIcon} alt="알림" className="w-[40px] h-[40px]" />
      </button>
    </header>
  );
};

export default Header;
