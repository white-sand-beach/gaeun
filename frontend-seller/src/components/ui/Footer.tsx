// 이미지 import
import ChartIcon from "../../assets/chart.png"
import SellListIcon from "../../assets/sell-list.png"
import OrderListIcon from "../../assets/order-list.png"
import AddProductIcon from "../../assets/add-product.png"
import ProfileIcon from "../../assets/profile.png"

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col items-center justify-center">
                <img src={ChartIcon} alt="통계" />
                <p className="text-[16px] text-gray-500">통계</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <img src={SellListIcon} alt="판매내역" />
                <p className="text-[16px] text-gray-500">판매내역</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <img src={OrderListIcon} alt="주문현황" />
                <p className="text-[16px] text-gray-500">주문현황</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <img src={AddProductIcon} alt="물품등록" />
                <p className="text-[16px] text-gray-500">등록하기</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <img src={ProfileIcon} alt="프로필" />
                <p className="text-[16px] text-gray-500">프로필</p>
            </div>
        </footer>
    );
};

export default Footer;