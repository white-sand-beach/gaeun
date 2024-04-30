// 컴포넌트 import
import NotificationList from "../../components/notification/NotificationList";

const NotificationPage = () => {
    const alarmlists = [
        {
            orderNum: "test-1",
            orderDate: "24-04-24",
            foodName: "햄버거1",
            price: 13900
        },
        {
            orderNum: "test-2",
            orderDate: "24-04-24",
            foodName: "햄버거2",
            price: 23900
        },
        {
            orderNum: "test-3",
            orderDate: "24-04-24",
            foodName: "햄버거3",
            price: 33900
        },
        {
            orderNum: "test-4",
            orderDate: "24-04-24",
            foodName: "햄버거4",
            price: 43900
        },
        {
            orderNum: "test-5",
            orderDate: "24-04-24",
            foodName: "햄버거5",
            price: 53900
        },
        {
            orderNum: "test-6",
            orderDate: "24-04-24",
            foodName: "햄버거6",
            price: 63900
        },
    ]

    return (
        <div className="absolute flex flex-col items-center w-full max-h-[calc(100vh-60px)] h-full overflow-y-scroll top-[60px]">
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