import { useEffect, useState } from "react";
import { FinishOrderType } from "../../types/order/FinishOrderType";
import FinishOrderList from "../../service/order/FinishOrderList";
import FinishList from "../../components/order/FinishList";

const FinishSalesList = () => {
  const [ finishList, setFinishList ] = useState<FinishOrderType>({
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
  });

  useEffect(() => {
    const fetchFinishList = async () => {
      try {
        const response = await FinishOrderList(finishList.page, 10);
        console.log(response.data.data)
        setFinishList(response.data.data)
      }
      catch (err) {
        console.error(err)
      }
    };
    fetchFinishList()
  }, []);

  return (
    <div className="yes-footer top-[75px] gap-3">
      {finishList.orderInfo.map(list => (
        <div key={list.orderInfoId}>
          <FinishList
          orderContents={list.orderContents}
          orderDate={list.orderDate}
          orderInfoId={list.orderInfoId}
          orderNo={list.orderNo}
          orderPrice={list.orderPrice}
          orderStatus={list.orderStatus} />
        </div>
      ))}
    </div>
  );
};

export default FinishSalesList;