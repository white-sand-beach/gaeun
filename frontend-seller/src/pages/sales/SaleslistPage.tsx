import SalesList from "@/components/sales/SalesList";

const SaleslistPage = () => {
  const saleslists = [
    {
      orderNum: "1",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "17,900"
    },
    {
      orderNum: "2",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "27,900"
    },
    {
      orderNum: "3",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "37,900"
    },
    {
      orderNum: "4",
      orderDate: "2024-05-03",
      orderState: "주문취소",
      foodName: "두툼 연어초밥",
      price: "47,900"
    },
    {
      orderNum: "5",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "57,900"
    },
    {
      orderNum: "6",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "67,900"
    },
  ]
  return (
    <div className="yes-footer top-[70px] overflow-y-scroll gap-3">
      {saleslists.map((saleslist, index) => (
        <div key={index}>
          <SalesList 
          orderNum={saleslist.orderNum}
          orderDate={saleslist.orderDate}
          orderState={saleslist.orderState}
          foodName={saleslist.foodName}
          price={saleslist.price}/>
        </div>
      ))}
    </div>
  );
};

export default SaleslistPage;