import TotalButton from "../../components/ui/TotalButton.tsx";

const OrderListPage = () => {
  

  return (
    <>
      <div className="gap-3 overflow-y-scroll yes-footer">
      </div>
      <div className="fixed bottom-[70px] flex justify-center w-full">
        <TotalButton title="마감 시작" />
      </div>
    </>
  );
};

export default OrderListPage;
