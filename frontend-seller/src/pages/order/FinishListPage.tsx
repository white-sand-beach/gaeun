import { useEffect, useState } from "react";
import { FinishOrderType } from "../../types/order/FinishOrderType";
import FinishOrderList from "../../service/order/FinishOrderList";

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
      }
    ],
    page: 0,
    hasNext: false,
  });

  useEffect(() => {
    const fetchFinishList = async () => {
      try {
        const response = await FinishOrderList(finishList.page, 10);
        console.log(response)
        setFinishList(response)
      }
      catch (err) {
        console.error(err)
      }
    };
    fetchFinishList()
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default FinishSalesList;