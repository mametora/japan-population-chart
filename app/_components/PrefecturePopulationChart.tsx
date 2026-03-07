"use client";

import { useEffect, useState } from "react";
import { Chart, Series, Title, setHighcharts } from "@highcharts/react";
import Highcharts from "highcharts/highcharts";

type SeriesData = {
  name: string;
  data: number[];
};

type Props = {
  years: number[];
  seriesData: SeriesData[];
};

let initialized = false;

const initHighcharts = async () => {
  if (initialized) return;
  await import("highcharts/themes/adaptive");
  setHighcharts(Highcharts);
  initialized = true;
}

export default function PrefecturePopulationChart({
  years,
  seriesData,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initHighcharts().then(() => setReady(true));
  }, []);

  if (!ready) return null;

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
