import SalesList from "../../components/sales/FinishSalesList";

const SaleslistPage = () => {
  const saleslists = [
    {
      orderNum: "1",
      orderDate: "2024-05-03",
      orderState: "판매완료",
      foodName: "두툼 연어초밥",
      price: "17,900",
    },
  ];
  return (
    <div className="yes-footer top-[70px] overflow-y-scroll gap-">
      {saleslists.map((saleslist, index) => (
        <div key={index}>
          <SalesList
            orderNum={saleslist.orderNum}
            orderDate={saleslist.orderDate}
            orderState={saleslist.orderState}
            foodName={saleslist.foodName}
            price={saleslist.price}
          />
        </div>
      ))}
    </div>
  );
};

export default SaleslistPage;
