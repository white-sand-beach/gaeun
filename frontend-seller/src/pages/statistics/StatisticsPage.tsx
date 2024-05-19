import { useState } from "react";
import WeekStat from "../../components/statistics/WeekStat";
import MonthStat from "../../components/statistics/MonthStat";
import TotalStat from "../../components/statistics/TotalStat";

const StatisticsPage = () => {
  const [listTap, setListTap] = useState(1);
  const handleChangeTap = (num: number) => {
    setListTap(num);
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col items-center justify-center h-full p-12 bg-gray-100">
        <div className="flex flex-col gap-4 text-xl font-bold">
          <button
            className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleChangeTap(1)}
            style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          >
            <p className="text-[35px]">총판매량</p>
          </button>
          <button
            className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleChangeTap(2)}
            style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          >
            <p className="text-[35px]">주간판매량</p>
          </button>
          <button
            className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 3 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => handleChangeTap(3)}
            style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
          >
            <p className="text-[35px]">월별판매량</p>
          </button>
        </div>
      </div>

      <div className="flex-grow p-12 bg-gray-100 md:p-32">
        <div className="flex items-center justify-center max-w-screen-lg mx-auto">
          {listTap === 1 && <TotalStat />}
          {listTap === 2 && <WeekStat />}
          {listTap === 3 && <MonthStat />}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
