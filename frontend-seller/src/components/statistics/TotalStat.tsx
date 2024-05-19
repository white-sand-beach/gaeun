import { useEffect, useState } from "react";
import TotalStatisticsAPI from "../../service/statistics/TotalStatisticsAPI";
import logo from "../../assets/logo/logo.png";

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

  if (totalInfo === 0) {
    return (
      <div className="flex items-center justify-center h-screen pb-56">
        <div>
          <div className="w-[450px] h-[450px]">
            <img
              className="object-cover w-full h-full rounded-full"
              src={logo}
              alt="로고"
            />
          </div>
          <h2 className="text-3xl font-bold text-center">
            사장님
            <span
              className="mx-2 text-6xl"
              style={{ fontFamily: "'MyFont', sans-serif" }}
            >
              나눔
            </span>
            해보시는건 어떠신가요?
          </h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-[880px] h-[770px] mx-auto">
        <div className="flex flex-col items-center justify-center">
          <p className="text-[100px] mb-8">총 판매량은</p>
          <h1 className="text-[200px] mb-8">{totalInfo}개</h1>
          <p className="text-[100px] mb-8">입니다!</p>
        </div>
      </div>
    );
  }
};

export default TotalStat;
