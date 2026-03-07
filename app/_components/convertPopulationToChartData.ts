import {
  Prefecture,
  PrefecturePopulation,
} from "@/lib/external/prefecture-population/types";
import { PopulationGroupLabel } from "@/lib/external/prefecture-population/constants";

type Population = {
  [year: number]: PrefecturePopulation;
};

const convertPopulationToChartData = (
  prefectures: Prefecture[],
  population: Population,
  label: PopulationGroupLabel,
) => {
  const years = Array.from(
    new Set(
      prefectures.flatMap(
        (prefecture) =>
          population[prefecture.id]?.populationGroups
            .find((group) => group.label === label)
            ?.populations.map((population) => population.year) ?? [],
      ),
    ),
  ).sort((a, b) => a - b);

  const chartData = prefectures.map((prefecture) => ({
    name: prefecture.name,
    data:
      population[prefecture.id]?.populationGroups
        .find((group) => group.label === label)
        ?.populations.map((population) => population.value) ?? [],
  }));

  return { years, chartData };
};

export type { Population };
export default convertPopulationToChartData;
