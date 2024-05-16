import { useEffect, useState } from "react";
import InprogressOrderListAPI from "../../service/order/InprogressOrderListAPI.ts";
import { OrderInfoType } from "../../types/order/OrderInfoType.ts";
import InprogressList from "../../components/order/InprogressList.tsx";

type InprogressState = {
  orderInfo: OrderInfoType[];
  page: number;
  hasNext: boolean;
  loading: boolean;
  scrollPosition: number;
};

const InprogressListPage = () => {
  const [inprogressOrderInfo, setInprogressOrderInfo] = useState<InprogressState>({
    orderInfo: [],
    page: 0,
    hasNext: false,
    loading: false,
    scrollPosition: 0
  });

  const { getOrderInprogress } = InprogressOrderListAPI();
  useEffect(() => {
    const getMyInfo = async () => {
       await getOrderInprogress(inprogressOrderInfo.page.toString(), 10, (data) => {
        setInprogressOrderInfo((prevState) => ({
          ...prevState,
          orderInfo: [...prevState.orderInfo, ...data.orderInfo],
          hasNext: data.hasNext
        }))
      })
    }
    getMyInfo()
  }, [inprogressOrderInfo.page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollH = document.documentElement.scrollHeight;
      const scrollT = document.documentElement.scrollTop;
      const clientH = document.documentElement.clientHeight;

      if (!inprogressOrderInfo.loading && scrollT + clientH >= scrollH && inprogressOrderInfo.hasNext) {
        setInprogressOrderInfo((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [inprogressOrderInfo.hasNext, inprogressOrderInfo.loading])


  return (
    <div className="gap-3 overflow-y-scroll yes-footer top-[70px]">
      <InprogressList
        inprogressOrderInfo={inprogressOrderInfo.orderInfo} />
    </div>
  );
};

export default InprogressListPage;
