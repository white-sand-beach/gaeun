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
    <div className="gap-3 yes-footer top-[70px] w-screen justify-center">
      {inprogressOrderInfo.orderInfo.length === 0 ? (
        <h1>
          주문내역이 없어요 😭
        </h1>
      ) : (
        <InprogressList inprogressOrderInfo={inprogressOrderInfo.orderInfo} />
      )}
    </div>
  );
};

export default InprogressListPage;
