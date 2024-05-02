import NotificationList from "../../components/notification/NotificationList";

const NotificationPage = () => {
    const alarmlists = [
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
    ]

    return (
        <div className="fixed flex flex-col items-center w-full max-h-[calc(100vh-60px)] h-full overflow-y-scroll top-[60px]">
            {alarmlists.map((alarmlist, index) => (
                <div key={index}>
                    <NotificationList
                        orderNum={alarmlist.orderNum}
                        orderDate={alarmlist.orderDate}
                        foodName={alarmlist.foodName}
                        price={alarmlist.price} />
                </div>
            ))}
        </div>
    );
};

export default NotificationPage;