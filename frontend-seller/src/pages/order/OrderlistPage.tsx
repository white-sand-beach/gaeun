import OrderList from "../../components/list/OrderList.tsx";
import TotalButton from "../../components/ui/TotalButton.tsx";

const OrderListPage = () => {
  const orderLists = [
    {
      orderNum: "1",
      orderDate: "2024-04-26",
      foodName: "햄버거1",
      price: "13,900",
    },
    {
      orderNum: "2",
      orderDate: "2024-04-26",
      foodName: "햄버거2",
      price: "23,900",
    },
    {
      orderNum: "3",
      orderDate: "2024-04-26",
      foodName: "햄버거3",
      price: "33,900",
    },
    {
      orderNum: "4",
      orderDate: "2024-04-26",
      foodName: "햄버거4",
      price: "33,900",
    },
    {
      orderNum: "5",
      orderDate: "2024-04-26",
      foodName: "햄버거5",
      price: "33,900",
    },
    {
      orderNum: "6",
      orderDate: "2024-04-26",
      foodName: "햄버거6",
      price: "33,900",
    },
    {
      orderNum: "5",
      orderDate: "2024-04-26",
      foodName: "햄버거5",
      price: "33,900",
    },
    {
      orderNum: "6",
      orderDate: "2024-04-26",
      foodName: "햄버거6",
      price: "33,900",
    },
  ];

  return (
    <>
      <div className="yes-footer gap-3 normal-order-flex top-[70px] xl:xl-order-flex overflow-y-scroll">
        {orderLists.map((orderlist, index) => (
          <div key={index}>
            <OrderList
              orderNum={orderlist.orderNum}
              orderDate={orderlist.orderDate}
              foodName={orderlist.foodName}
              price={orderlist.price}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-[70px] flex justify-center w-full">
        <TotalButton title="마감 시작" />
      </div>
    </>
  );
};

export default OrderListPage;
