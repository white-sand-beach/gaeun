// 내부 import
import React from "react";

// 컴포넌트 import
import { Order } from "../../types/Order.ts";

const AlarmPage: React.FC<Order> = (props) => {
    return (
        <div className="fixed flex flex-col items-center w-full max-h-[calc(100vh-60px)] h-full overflow-y-scroll top-[60px]">
            {alarms.map((alarm, id) => (
                <div key={id} className="flex flex-col w-[400px] h-[200px] border-b-2 p-3">
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
    );
};

export default AlarmPage;