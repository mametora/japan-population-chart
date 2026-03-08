"use client";

import { useState, useEffect, useRef } from "react";
import {
  Prefecture,
  PrefecturePopulation,
} from "@/lib/external/prefecture-population/types";
import {
  POPULATION_GROUP_LABEL,
  PopulationGroupLabel,
} from "@/lib/external/prefecture-population/constants";
import Radio from "@/components/ui/Radio";
import PrefecturePopulationChart from "@/app/_components/PrefecturePopulationChart";
import Card from "@/components/ui/Card";
import convertPopulationToChartData, {
  type Population,
} from "@/app/_components/convertPopulationToChartData";

type Props = {
  prefectures: Prefecture[];
};

const fetchPopulation = async (id: number) => {
  const response = await fetch(`/api/prefecture-population/${id}`);

  if (!response.ok)
    throw new Error(`Failed to fetch population for prefecture ${id}`);

  return response.json() as Promise<PrefecturePopulation>;
};

export default function PrefecturePopulationGraph({ prefectures }: Props) {
  const [population, setPopulation] = useState<Population>({});
  const fetchedRef = useRef<Set<number>>(new Set());

  const [selectedLabel, setSelectedLabel] = useState<PopulationGroupLabel>(
    POPULATION_GROUP_LABEL[0],
  );

  useEffect(() => {
    prefectures.forEach(async ({ id }) => {
      if (fetchedRef.current.has(id)) return;

      try {
        const data = await fetchPopulation(id);
        setPopulation((prev) => ({ ...prev, [id]: data }));
        fetchedRef.current.add(id);
      } catch (error) {
        console.error(
          `Failed to fetch population for prefecture ${id}:`,
          error,
        );
      }
    });
  }, [prefectures]);

  const options = POPULATION_GROUP_LABEL.map((label) => ({
    value: label,
    label: label,
  }));

  const { years, chartData } = convertPopulationToChartData(
    prefectures,
    population,
    selectedLabel,
  );

  return (
    <Card className="flex flex-col gap-4">
      {chartData.length !== 0 ? (
        <PrefecturePopulationChart years={years} seriesData={chartData} />
      ) : (
        <div className="flex items-center justify-center py-16 text-gray-400 dark:text-gray-600">
          <p>都道府県を選択してください</p>
        </div>
      )}
      <Radio
        name="prefecture-population-group"
        options={options}
        value={selectedLabel}
        onValueChange={setSelectedLabel}
        direction="horizontal"
      />
    </Card>
  );
}
