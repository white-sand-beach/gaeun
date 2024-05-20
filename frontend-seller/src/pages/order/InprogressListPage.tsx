import { useEffect, useState } from "react";
import InprogressOrderListAPI from "../../service/order/InprogressOrderListAPI.ts";
import { OrderInfoType } from "../../types/order/OrderInfoType.ts";
import InprogressList from "../../components/order/InprogressList.tsx";

type InprogressState = {
  orderInfo: OrderInfoType[];
  page: number;
  hasNext: boolean;
};

const InprogressListPage = () => {
  const [inprogressOrderInfo, setInprogressOrderInfo] =
    useState<InprogressState>({
      orderInfo: [],
      page: 0,
      hasNext: false,
    });

  const { getOrderInprogress } = InprogressOrderListAPI();
  useEffect(() => {
    getOrderInprogress(inprogressOrderInfo.page.toString(), 3, (data) => {
      setInprogressOrderInfo((prevState) => ({
        ...prevState,
        orderInfo: [...prevState.orderInfo, ...data.orderInfo],
        hasNext: data.hasNext,
      }));
    });
  }, [inprogressOrderInfo.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (scrollT + clientH >= scrollH && inprogressOrderInfo.hasNext) {
        setInprogressOrderInfo((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inprogressOrderInfo.hasNext]);

  return (
    <div className="yes-footer top-[75px] gap-3 p-4">
      {inprogressOrderInfo.orderInfo.length === 0 ? (
        <div className="flex justify-center items-center w-screen h-screen">
          <p className="text-6xl">주문이 없어요 😢</p>
        </div>
      ) : (
        <InprogressList inprogressOrderInfo={inprogressOrderInfo.orderInfo} />
      )}
    </div>
  );
};

export default InprogressListPage;
