const ListOrder = () => {
    return (
        <div className="main-layout">
            <div className="fixed flex flex-col items-center gap-4 overflow-y-scroll top-[60px] max-h-[calc(100vh-60px)] h-full p-2">
                {/* 주문 현황 내역 */}
                <div className="flex flex-col w-[360px] h-[160px] border-2 p-4 rounded-[5px] shadow-lg">
                    {/* 주문번호 및 주문일자 */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">No.6842-42J45H12</p>
                        <p className="text-gray-500">24.04.18 17:04</p>
                    </div>

                    {/* 음식명 */}
                    <p className="mt-1 text-xl font-bold">음식명(치킨나라 피자공주)</p>

                    {/* 결제 금액 및 상세내역 보러가기 */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-row justify-between items-center w-[175px]">
                            <p className="text-gray-500 text-[16px]">결제 금액</p>
                            <p className="text-xl font-bold text-red-500">13,900 원</p>
                        </div>
                        <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
                    </div>
                </div>
                <div className="flex flex-col w-[360px] h-[160px] border-2 p-4 rounded-[5px] shadow-lg">
                    {/* 주문번호 및 주문일자 */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">No.6842-42J45H12</p>
                        <p className="text-gray-500">24.04.18 17:04</p>
                    </div>

                    {/* 음식명 */}
                    <p className="mt-1 text-xl font-bold">음식명(치킨나라 피자공주)</p>

                    {/* 결제 금액 및 상세내역 보러가기 */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-row justify-between items-center w-[175px]">
                            <p className="text-gray-500 text-[16px]">결제 금액</p>
                            <p className="text-xl font-bold text-red-500">13,900 원</p>
                        </div>
                        <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
                    </div>
                </div>
                <div className="flex flex-col w-[360px] h-[160px] border-2 p-4 rounded-[5px] shadow-lg">
                    {/* 주문번호 및 주문일자 */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">No.6842-42J45H12</p>
                        <p className="text-gray-500">24.04.18 17:04</p>
                    </div>

                    {/* 음식명 */}
                    <p className="mt-1 text-xl font-bold">음식명(치킨나라 피자공주)</p>

                    {/* 결제 금액 및 상세내역 보러가기 */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-row justify-between items-center w-[175px]">
                            <p className="text-gray-500 text-[16px]">결제 금액</p>
                            <p className="text-xl font-bold text-red-500">13,900 원</p>
                        </div>
                        <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
                    </div>
                </div>
                <div className="flex flex-col w-[360px] h-[160px] border-2 p-4 rounded-[5px] shadow-lg">
                    {/* 주문번호 및 주문일자 */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">No.6842-42J45H12</p>
                        <p className="text-gray-500">24.04.18 17:04</p>
                    </div>

                    {/* 음식명 */}
                    <p className="mt-1 text-xl font-bold">음식명(치킨나라 피자공주)</p>

                    {/* 결제 금액 및 상세내역 보러가기 */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-row justify-between items-center w-[175px]">
                            <p className="text-gray-500 text-[16px]">결제 금액</p>
                            <p className="text-xl font-bold text-red-500">13,900 원</p>
                        </div>
                        <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
                    </div>
                </div>
                <div className="flex flex-col w-[360px] h-[160px] border-2 p-4 rounded-[5px] shadow-lg">
                    {/* 주문번호 및 주문일자 */}
                    <div className="flex justify-between">
                        <p className="text-gray-500">No.6842-42J45H12</p>
                        <p className="text-gray-500">24.04.18 17:04</p>
                    </div>

                    {/* 음식명 */}
                    <p className="mt-1 text-xl font-bold">음식명(치킨나라 피자공주)</p>

                    {/* 결제 금액 및 상세내역 보러가기 */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-row justify-between items-center w-[175px]">
                            <p className="text-gray-500 text-[16px]">결제 금액</p>
                            <p className="text-xl font-bold text-red-500">13,900 원</p>
                        </div>
                        <button className="text-[14px] font-bold w-[140px] h-[30px] border-2 border-black rounded-[5px]">{"상세내역 보러가기 >"}</button>
                    </div>
                </div>

                {/* 마감 버튼 하단 고정 */}
                <button className="fixed common-btn bottom-[50px]">마감 시작</button>
            </div>
        </div>
    );
};

export default ListOrder;