// 컴포넌트 import
import OrderList from "../../components/list/OrderList.tsx"

const OrderListPage = () => {
    const orderLists = [
        {
            orderNum: "1",
            orderDate: "2024-04-26",
            foodName: "햄버거1",
            price: 13900,
        },
        {
            orderNum: "2",
            orderDate: "2024-04-26",
            foodName: "햄버거2",
            price: 23900,
        },
        {
            orderNum: "3",
            orderDate: "2024-04-26",
            foodName: "햄버거3",
            price: 33900,
        },
        {
            orderNum: "4",
            orderDate: "2024-04-26",
            foodName: "햄버거4",
            price: 33900,
        },
        {
            orderNum: "5",
            orderDate: "2024-04-26",
            foodName: "햄버거5",
            price: 33900,
        },
        {
            orderNum: "6",
            orderDate: "2024-04-26",
            foodName: "햄버거6",
            price: 33900,
        },
        {
            orderNum: "5",
            orderDate: "2024-04-26",
            foodName: "햄버거5",
            price: 33900,
        },
        {
            orderNum: "6",
            orderDate: "2024-04-26",
            foodName: "햄버거6",
            price: 33900,
        },
    ];

    return (
        <div className="flex-col items-center justify-center lex ">
            <div className="overflow-y-scroll normal-list-view lg:lg-list-view">
                {orderLists.map((orderlist, index) => (
                    <div key={index}>
                        <OrderList
                            orderNum={orderlist.orderNum}
                            orderDate={orderlist.orderDate}
                            foodName={orderlist.foodName}
                            price={orderlist.price} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderListPage;