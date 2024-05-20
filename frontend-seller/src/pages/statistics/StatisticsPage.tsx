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
    <div className="flex flex-row justify-center items-center top-[75px] h-screen gap-4">
      <div className="flex flex-col justify-center items-center p-4">
        <button
          className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 1 ? "bg-mainColor text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleChangeTap(1)}
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          <p className="text-[35px]">총판매량</p>
        </button>
        <button
          className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 2 ? "bg-mainColor text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleChangeTap(2)}
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          <p className="text-[35px]">주간판매량</p>
        </button>
        <button
          className={`cursor-pointer p-10 rounded-lg w-full ${listTap === 3 ? "bg-mainColor text-white" : "bg-gray-200 text-gray-600"}`}
          onClick={() => handleChangeTap(3)}
          style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
        >
          <p className="text-[35px]">월별판매량</p>
        </button>
      </div>
      {listTap === 1 && <TotalStat />}
      {listTap === 2 && <WeekStat />}
      {listTap === 3 && <MonthStat />}
    </div>
  );
};

export default StatisticsPage;
