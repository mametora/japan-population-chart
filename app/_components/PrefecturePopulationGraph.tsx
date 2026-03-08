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
import PrefecturePopulationChart from "@/app/_components/PrefecturePopulationChart";
import Card from "@/components/ui/Card";
import convertPopulationToChartData, {
  type Population,
} from "@/app/_components/convertPopulationToChartData";
import ToggleGroup from "@/components/ui/ToggleGroup";

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

  const handleValueChange = (value: PopulationGroupLabel) => {
    if (!value) return;

    setSelectedLabel(value);
  };

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

  const { years, chartData } = convertPopulationToChartData(
    prefectures,
    population,
    selectedLabel,
  );

  return (
    <Card className="flex flex-col items-center gap-4">
      <PrefecturePopulationChart years={years} seriesData={chartData} />
      <div>
        <ToggleGroup
          type="single"
          options={POPULATION_GROUP_LABEL}
          value={selectedLabel}
          onValueChange={handleValueChange}
        />
      </div>
    </Card>
  );
}
