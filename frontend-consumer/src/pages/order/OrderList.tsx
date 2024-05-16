import { useEffect, useState } from "react";

import Ordertarget from "../../components/order/OrderTarget";
import searchIcon from "../../assets/search/searchIcon.png";
import OrderGetForm from "../../services/orders/OrderGetService";
import { OrderInfo, OrderListType } from "../../types/OrderType";

const OrderList = () => {
  const [orderData, setOrderData] = useState<OrderInfo[]>([]);
  const [order, setOrder] = useState<OrderListType>({
    page: 0,
    hasNext: false,
  });
  const [inputText, setInputText] = useState<string>("");
  const [isSearchInfo, setisSearchInfo] = useState<boolean>(true);

  useEffect(() => {
    if (isSearchInfo) {
      const fetchOrderList = async () => {
        try {
          const response = await OrderGetForm({
            page: String(order.page),
            size: "10",
            keyword: inputText,
          });
          if (order.page === 0) {
            setOrderData(response.orderInfoList);
          } else {
            setOrderData((prevOrderData) => [
              ...prevOrderData,
              ...response.orderInfoList,
            ]);
          }
          setOrder((prevOrder) => ({
            ...prevOrder,
            hasNext: response.hasNext,
          }));
          console.log("리스트 불러오기 성공");
        } catch (error) {
          console.log("리스트 불러오기 실패", error);
        }
      };

      setisSearchInfo(false);
      fetchOrderList();
    }
  }, [order.page, isSearchInfo]);

  const onUpdateText = (e: any) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight && order.hasNext) {
        setOrder((prevState) => ({
          ...prevState,
          page: prevState.page + 1,
        }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [order.hasNext]);

  const handleSearchSubmit = () => {
    setisSearchInfo(true);
  };

  return (
    <div className="py-14">
      {/* 가게 및 메뉴 검색 */}
      <div className="my-2 center">
        <div className="search w-screen mx-2">
          <input
            className="text-xs pl-2 w-11/12 py-2 rounded-xl"
            type="text"
            placeholder="가게 이름 검색"
            value={inputText}
            onChange={onUpdateText}
          />
          <button onClick={handleSearchSubmit}>
            <img className="mr-1" src={searchIcon} alt="검색" />
          </button>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="justify-center">
        {orderData.map((order, index) => (
          <Ordertarget key={index} orderData={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
