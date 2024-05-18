import { useEffect, useState } from "react";
import TotalStatisticsAPI from "../../service/statistics/TotalStatisticsAPI";

const TotalStat = () => {
  const [totalInfo, setTotalInfo] = useState(0)

  useEffect(() => {
    const fetchTotalInfo = async () => {
      try {
        const response = await TotalStatisticsAPI()
        setTotalInfo(response.data.data.receiptAll)
      }
      catch (err) {
        console.error(err)
      }
    };
    fetchTotalInfo()
  }, [])
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center gap-3">
      <p>총 판매량은</p>
      <h1 className="text-[100px]">{totalInfo}</h1>
      <p>입니다!</p>
    </div>
  );
};

export default TotalStat;