import { useEffect, useState } from "react";
import InprogressOrderListAPI from "../../service/order/InprogressOrderListAPI.ts";
import { InprogressOrderType } from "../../types/order/InprogressOrderType.ts";
import InprogressList from "../../components/order/InprogressList.tsx";

const InprogressListPage = () => {
  const [inprogressOrderInfo, setInprogressOrderInfo] = useState<InprogressOrderType[]>([])
  const { getOrderInprogress } = InprogressOrderListAPI();
  const handleGetList = () => {
    getOrderInprogress(setInprogressOrderInfo)
  };

  useEffect(() => {
    handleGetList()
  }, []);

  return (
    <div className="gap-3 overflow-y-scroll yes-footer top-[70px]">
      <InprogressList 
      inprogressOrderInfo={inprogressOrderInfo}/>
    </div>
  );
};

export default InprogressListPage;
