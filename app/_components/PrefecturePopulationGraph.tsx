"use client";

import { useState, useEffect } from "react";
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
  const [selectedLabel, setSelectedLabel] = useState<PopulationGroupLabel>(
    POPULATION_GROUP_LABEL[0],
  );

  useEffect(() => {
    const missingPopulation = prefectures.filter(
      ({ id }) => !(id in population),
    );

    if (missingPopulation.length === 0) return;

    missingPopulation.forEach(async ({ id }) => {
      const prefecturePopulation = await fetchPopulation(id);

      setPopulation((prev) => ({
        ...prev,
        [id]: prefecturePopulation,
      }));
    });
  }, [prefectures, population]);

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
