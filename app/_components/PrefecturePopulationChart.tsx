"use client";

import { Chart, Series, Title, setHighcharts } from "@highcharts/react";
import Highcharts from "highcharts";
import "highcharts/themes/adaptive";
setHighcharts(Highcharts);

type SeriesData = {
  name: string;
  data: number[];
};

type Props = {
  years: number[];
  seriesData: SeriesData[];
};

export default function PrefecturePopulationChart({
  years,
  seriesData,
}: Props) {
  return (
    <div className="min-w-xl">
      <Chart
        options={{
          xAxis: {
            categories: years.map(String),
            title: { text: "年" },
          },
          yAxis: {
            title: { text: "人口（人）" },
          },
          tooltip: {
            shared: true,
            valueSuffix: " 人",
          },
          legend: {
            enabled: true,
          },
          plotOptions: {
            series: {
              marker: {
                enabled: true,
              },
            },
          },
        }}
      >
        <Title>都道府県別 人口推移</Title>
        {seriesData.map((s) => (
          <Series
            key={s.name}
            type="line"
            options={{
              name: s.name,
              data: s.data,
            }}
          />
        ))}
      </Chart>
    </div>
  );
}
