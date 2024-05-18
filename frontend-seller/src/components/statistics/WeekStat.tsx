import React, { useEffect, useState } from "react";
import { SaleStatisticList } from "../../types/statistics/SaleStatisticList.ts";
import WeekStatisticsAPI from "../../service/statistics/WeekStatisticsAPI.ts";
import { Bar } from "react-chartjs-2";
import { ChartOptions, CategoryScale, Chart, LinearScale, BarElement, BarController, Title } from "chart.js";

const WeekStat: React.FC = () => {
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title)
  // 주간 데이터 받을 상태변수
  const [weekInfo, setWeekInfo] = useState<SaleStatisticList>({
    saleStatisticList: [
      {
        menuName: "",
        saleStatistic: 0,
      }
    ]
  });

  // 주간 데이터 할당 useEffect
  useEffect(() => {
    const fetchWeekInfo = async () => {
      try {
        const response = await WeekStatisticsAPI();
        setWeekInfo(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWeekInfo();
  }, []);

  // Chart.js 에 넣을 데이터
  const weekChartData = {
    labels: weekInfo.saleStatisticList.map((stat) => stat.menuName),
    datasets: [
      {
        label: "통계",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 2,
        data: weekInfo.saleStatisticList.map((stat) => stat.saleStatistic),
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: false,
    scales: {
      x: {
        type: "category",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      {weekInfo ? (
        <Bar data={weekChartData} options={chartOptions} />
      ) : (
        <h1>판매량 데이터가 없어요😭</h1>
      )}
    </div>
  );
};

export default WeekStat;
