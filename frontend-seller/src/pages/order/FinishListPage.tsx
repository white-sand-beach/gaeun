import { useEffect, useState } from "react";
import { FinishOrderType } from "../../types/order/FinishOrderType";
import FinishOrderList from "../../service/order/FinishOrderList";
import FinishList from "../../components/order/FinishList";

const FinishSalesList = () => {
  const [finishList, setFinishList] = useState<FinishOrderType>({
    orderInfo: [],
    page: 0,
    hasNext: false,
  });

  // 페이지 바뀔 때 마다 데이터 최신화
  useEffect(() => {
    const fetchFinishList = async () => {
      try {
        const response = await FinishOrderList(finishList.page, 10);
        console.log(response.data.data);
        setFinishList((prev) => ({
          ...prev,
          orderInfo: [...prev.orderInfo, ...response.data.data.orderInfo],
          hasNext: response.data.data.hasNext,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFinishList();
  }, [finishList.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (scrollT + clientH >= scrollH && finishList.hasNext) {
        setFinishList((prev) => ({
          ...prev,
          page: prev.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [finishList.hasNext]);

  return (
    <div className="yes-footer top-[75px] gap-3">
      {finishList.orderInfo.length > 0 ? (
        <div>
          {finishList.orderInfo.map((list) => (
            <div key={list.orderInfoId}>
              <FinishList
                orderContents={list.orderContents}
                orderDate={list.orderDate}
                orderInfoId={list.orderInfoId}
                orderNo={list.orderNo}
                orderPrice={list.orderPrice}
                orderStatus={list.orderStatus}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-screen h-screen">
          <p className="text-6xl">판매 완료된 물품이 없어요😢</p>
        </div>
      )}
    </div>
  );
};

export default FinishSalesList;
