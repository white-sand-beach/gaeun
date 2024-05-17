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
    <div className="yes-footer top-[70px]">
      <div className="flex flex-row justify-around w-full text-3xl font-bold">
        <div onClick={() => handleChangeTap(1)}>총 판매량</div>
        <div onClick={() => handleChangeTap(2)}>주간 판매량</div>
        <div onClick={() => handleChangeTap(3)}>월간 판매량</div>
      </div>

      {listTap === 1 && <TotalStat />}
      {listTap === 2 && <WeekStat />}
      {listTap === 3 && <MonthStat />}
    </div>
  );
};

export default StatisticsPage;
