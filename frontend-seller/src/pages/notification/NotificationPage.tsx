const NotificationPage = () => {
    const alarmlists = [
        {
            id: 1,
            orderNum: "test-1",
            orderDate: "24-04-24",
            orderFoodName: "햄버거1",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 2,
            orderNum: "test-2",
            orderDate: "24-04-24",
            orderFoodName: "햄버거2",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 3,
            orderNum: "test-3",
            orderDate: "24-04-24",
            orderFoodName: "햄버거3",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 4,
            orderNum: "test-4",
            orderDate: "24-04-24",
            orderFoodName: "햄버거4",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 5,
            orderNum: "test-5",
            orderDate: "24-04-24",
            orderFoodName: "햄버거5",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 6,
            orderNum: "test-6",
            orderDate: "24-04-24",
            orderFoodName: "햄버거6",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 7,
            orderNum: "test-7",
            orderDate: "24-04-24",
            orderFoodName: "햄버거7",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 8,
            orderNum: "test-8",
            orderDate: "24-04-24",
            orderFoodName: "햄버거8",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
        {
            id: 9,
            orderNum: "test-9",
            orderDate: "24-04-24",
            orderFoodName: "햄버거9",
            orderShopName: "로얄캐슬",
            orderPrice: "13,900"
        },
    ]

    return (
        <div className="fixed flex flex-col items-center w-full max-h-[calc(100vh-60px)] h-full overflow-y-scroll top-[60px]">
            {alarmlists.map((alarmlist, index) => (
                
            ))}
        </div>
    );
};

export default NotificationPage;