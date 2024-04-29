import React from "react";

const AlarmPage: React.FC = () => {
    const alarms = [
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
        <div className="main-layout">
            {/* 알람 리스트 */}
            <div className="fixed flex flex-col items-center w-full max-h-[calc(100vh-120px)] overflow-y-scroll top-[60px]">
                {alarms.map((alarm, id) => (
                    <div key={id} className="flex flex-col w-[360px] h-[160px] border-b-2 p-3">
                        {/* 주문번호 및 주문날짜 */}
                        <div className="flex flex-row justify-between w-full">
                            <p className="text-gray-500">{alarm.orderNum}</p>
                            <p className="text-gray-500">{alarm.orderDate}</p>
                        </div>

                        <div className="flex flex-row items-center justify-between w-full mt-3">
                            <div className="flex flex-col">
                                {/* 음식명 */}
                                <p className="mt-1 font-bold text-[14px]">{alarm.orderFoodName}</p>

                                {/* 결제 금액 */}
                                <div className="flex flex-row justify-between w-[150px] font-bold text-[14px]">
                                    <p>결제 금액</p>
                                    <p className="text-red-500">{alarm.orderPrice}원</p>
                                </div>
                            </div>
                            {/* 상세내역 보러가기 */}
                            <button className="text-[14px] w-[160px] border-2 border-[#A3A3A3] p-2 rounded-lg font-bold">{"상세내역 보러가기 >"}</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlarmPage;