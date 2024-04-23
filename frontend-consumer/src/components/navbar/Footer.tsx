import search from "../../assets/footer/search.png";
import like from "../../assets/footer/like.png";
import map from "../../assets/footer/map.png";
import order from "../../assets/footer/order.png";
import profile from "../../assets/footer/profile.png";

const Footer = () => {
  return (
    <div className="fixed flex bg-white w-full p-2 bottom-0 border-t-2">
      <div className="flex flex-col justify-center items-center w-[20%]">
        <img className="pl-0.5" src={search} alt="검색" />
        <div className="text-xs text-gray-500 font-bold mt-2">검색</div>
      </div>
      <div className="flex flex-col justify-center items-center w-[20%]">
        <img className="pl-0.5" src={like} alt="찜" />
        <div className="text-xs text-gray-500 font-bold mt-2">찜</div>
      </div>
      <div className="flex flex-col justify-center items-center w-[20%]">
        <img className="pl-0.5" src={map} alt="홈" />
        <div className="text-xs text-gray-500 font-bold mt-2">홈</div>
      </div>
      <div className="flex flex-col justify-center items-center w-[20%]">
        <img className="pl-0.5" src={order} alt="주문내역" />
        <div className="text-xs text-gray-500 font-bold mt-2">주문내역</div>
      </div>
      <div className="flex flex-col justify-center items-center w-[20%]">
        <img src={profile} alt="마이페이지" />
        <div className="text-xs text-gray-500 font-bold mt-2">마이페이지</div>
      </div>
    </div>
  );
};

export default Footer;
