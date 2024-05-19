import { useEffect, useState } from "react";
import { SaleStatisticList } from "../../types/statistics/SaleStatisticList";
import MonthStatisticAPI from "../../service/statistics/MonthStatisticsAPI";
import { Bar } from "react-chartjs-2";
import { ChartOptions, CategoryScale, Chart, LinearScale, BarElement, BarController, Title } from "chart.js";

const MonthStat = () => {
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title)
  const [monthInfo, setMonthInfo] = useState<SaleStatisticList>({
    saleStatisticList: [
      {
        menuName: "",
        saleStatistic: 0,
      },
    ]
  });

  useEffect(() => {
    const fetchMonthInfo = async () => {
      try {
        const response = await MonthStatisticAPI();
        setMonthInfo(response)
      }
      catch (err) {
        console.log(err)
      }
    };
    fetchMonthInfo()
  }, [])

  // Chart.js 에 넣을 데이터
  const monthChartData = {
    labels: monthInfo?.saleStatisticList.map((stat) => stat.menuName),
    datasets: [
      {
        label: "통계",
        backgroundColor: "#FFAF38",
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
        borderRadius: 14,
        data: monthInfo?.saleStatisticList.map((stat) => stat.saleStatistic),
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
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
      {monthInfo ? (
        <Bar data={monthChartData} options={chartOptions} />
      ) : (
        <h1>판매량 데이터가 없어요😭</h1>
      )}
    </div>
  );
};

export default MonthStat;