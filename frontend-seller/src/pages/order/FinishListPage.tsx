import { useEffect, useState } from "react";
import FinishList from "../../components/order/FinishList";
import { FinishOrderType } from "../../types/order/FinishOrderType";
import FinishOrderListAPI from "../../service/order/FinishOrderListAPI";

const FinishListPage = () => {
  const [finishList, setFinishList] = useState<FinishOrderType>({
    orderInfo: [
      {
        orderInfoId: 0,
        orderNo: "",
        orderContents: "",
        orderPrice: 0,
        orderStatus: "",
        orderDate: ""
      },
    ],
    page: 0,
    hasNext: false,
  })

  // 판매 종료된 목록 불러오는 useEffect
  useEffect(() => {
    const fetchFinishData = async () => {
      try {
        const response = await FinishOrderListAPI(finishList.page, 10);
        setFinishList(response)
      }
      catch (err) {
        console.error(err)
      }
    };
    fetchFinishData()
  }, [finishList.hasNext])

  // 무한 스크롤 관련 useEffect
  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (scrollT + clientH >= scrollH && finishList.hasNext) {
        setFinishList((prevState) => ({
          ...prevState,
          page: finishList.page + 1,
        }));
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [finishList.hasNext])

  return (
    <div className="yes-footer top-[60px] gap-3">
      {finishList.orderInfo.map((order) => (
        <div key={order.orderInfoId}>
          <FinishList orderInfoId={order.orderInfoId}
            orderNo={order.orderNo}
            orderContents={order.orderContents}
            orderPrice={order.orderPrice}
            orderStatus={order.orderStatus}
            orderDate={order.orderDate} />
        </div>
      ))}
    </div>
  );
};

export default FinishListPage;