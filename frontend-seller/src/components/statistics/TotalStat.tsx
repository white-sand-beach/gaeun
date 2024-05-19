import { useEffect, useState } from "react";
import TotalStatisticsAPI from "../../service/statistics/TotalStatisticsAPI";

const TotalStat = () => {
  const [totalInfo, setTotalInfo] = useState(0);

  useEffect(() => {
    const fetchTotalInfo = async () => {
      try {
        const response = await TotalStatisticsAPI();
        setTotalInfo(response.data.data.receiptAll);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalInfo();
  }, []);
  return (
    <div className="flex items-center justify-center w-[880px] h-[770px] pr-32">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[100px] mb-8">총 판매량은</p>
        <h1 className="text-[200px] mb-8">{totalInfo}개</h1>
        <p className="text-[100px] mb-8">입니다!</p>
      </div>
    </div>
  );
};

export default TotalStat;
