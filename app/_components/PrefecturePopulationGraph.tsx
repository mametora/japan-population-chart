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

type Props = {
  prefectures: Prefecture[];
};

type Population = {
  [year: number]: PrefecturePopulation;
};

const fetchPopulation = async (id: number) => {
  const response = await fetch(`/api/prefecture-population/${id}`);

  if (!response.ok)
    throw new Error(`Failed to fetch population for prefecture ${id}`);

  return response.json() as Promise<PrefecturePopulation>;
};

const convertPopulationToChartData = (
  prefectures: Prefecture[],
  population: Population,
  label: PopulationGroupLabel,
) => {
  const years = Array.from(
    new Set(
      prefectures.flatMap((prefecture) =>
        population[prefecture.id]?.populationGroups
          .find((group) => group.label === label)
          ?.populations.map((population) => population.year) ?? [],
      ),
    ),
  ).sort((a, b) => a - b);

  const chartData = prefectures.map((prefecture) => ({
    name: prefecture.name,
    data: population[prefecture.id]?.populationGroups
      .find((group) => group.label === label)
      ?.populations.map((population) => population.value) ?? [],
  }));

  return { years, chartData };
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
    selectedLabel
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Radio
        name="prefecture-population-group"
        options={options}
        value={selectedLabel}
        onValueChange={setSelectedLabel}
        direction="horizontal"
      />
      {chartData.length !== 0 && (
        <PrefecturePopulationChart years={years} seriesData={chartData} />
      )}
    </div>
  );
}
