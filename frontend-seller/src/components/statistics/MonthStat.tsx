import { useEffect, useState } from "react";
import { SaleStatisticList } from "../../types/statistics/SaleStatisticList";
import MonthStatisticAPI from "../../service/statistics/MonthStatisticsAPI";
import { Bar } from "react-chartjs-2";
import {
  ChartOptions,
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  BarController,
  Title,
} from "chart.js";

const MonthStat = () => {
  Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title);
  const [monthInfo, setMonthInfo] = useState<SaleStatisticList>({
    saleStatisticList: [
      {
        menuName: "",
        saleStatistic: 0,
      },
    ],
  });

  useEffect(() => {
    const fetchMonthInfo = async () => {
      try {
        const response = await MonthStatisticAPI();
        setMonthInfo(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthInfo();
  }, []);

  // Chart.js 에 넣을 데이터
  const monthChartData = {
    labels: monthInfo?.saleStatisticList.map((stat) => stat.menuName),
    datasets: [
      {
        label: "통계",
        backgroundColor: "#FFAF38", // 두 번째 막대 그래프 색상
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
        borderRadius: 14,
        data: monthInfo?.saleStatisticList.map((stat) => stat.saleStatistic),
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // 그래프 항목 크기 조절
            weight: "bold", // X 축 글자 굵기
          },
        },
      },
      title: {
        display: true,
        text: "월별 통계", // 그래프 제목
        color: "black", // X 축 글자 색상
        font: {
          size: 38, // 제목 글자 크기 조절
          family: "prettyFont", // 그래프 항목 폰트 변경
          weight: "bold", // X 축 글자 굵기
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black", // X 축 글자 색상
          font: {
            size: 33, // x축 레이블 크기 조절
            family: "prettyFont", // 그래프 항목 폰트 변경
            weight: "bold", // X 축 글자 굵기
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "black", // X 축 글자 색상
          font: {
            size: 33, // y축 레이블 크기 조절
            family: "prettyFont", // 그래프 항목 폰트 변경
            weight: "bold", // X 축 글자 굵기
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-[880px] h-[770px] mx-auto">
      {monthInfo ? (
        <Bar data={monthChartData} options={chartOptions} />
      ) : (
        <h1>판매량 데이터가 없어요😭</h1>
      )}
    </div>
  );
};

export default MonthStat;
