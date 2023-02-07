import { useState, useEffect } from "react";
import ReactApexChart, { Props } from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { youtubeHistoryState } from "../store/recoilState";

type TSelectedYear = {
  selectedYear: number;
};

const Chart = ({ selectedYear }: TSelectedYear) => {
  const history = useRecoilValue(youtubeHistoryState);
  const [monthlyChartData, setMonthlyChartData] = useState<Props>();

  useEffect(() => {
    if (!history) return;
    setMonthlyChartData({
      series: [
        {
          name: "시청 횟수",
          data: Object.entries(history[selectedYear]).reduce((acc, cur) => {
            return [...acc, cur[1].length];
          }, [] as number[]),
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {
          title: {
            text: "시청 횟수",
          },
        },
        fill: {
          opacity: 1,
        },
      },
    });
  }, [history]);

  if (!monthlyChartData || !history) {
    return <div>로딩</div>;
  }

  return (
    <ReactApexChart
      options={monthlyChartData?.options}
      series={monthlyChartData?.series}
      type="bar"
      height={350}
    />
  );
};

export default Chart;
