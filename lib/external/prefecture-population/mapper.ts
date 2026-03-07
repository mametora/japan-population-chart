import type {
  PrefectureApiResponse,
  PrefecturePopulationApiResponse,
} from "@/lib/external/prefecture-population/types";

type Prefecture = {
  id: number;
  name: string;
};

type Population = {
  year: number;
  value: number;
  rate?: number;
};

type PopulationGroup = {
  label: string;
  populations: Population[];
};

type PrefecturePopulation = {
  boundaryYear: number;
  populationGroups: PopulationGroup[];
};

const toPrefectureModels = (response: PrefectureApiResponse): Prefecture[] => {
  return response.result.map((prefecture) => ({
    id: prefecture.prefCode,
    name: prefecture.prefName,
  }));
};

const toPrefecturePopulationModel = (
  response: PrefecturePopulationApiResponse,
): PrefecturePopulation => {
  return {
    boundaryYear: response.result.boundaryYear,
    populationGroups: response.result.data.map((group) => ({
      label: group.label,
      populations: group.data,
    })),
  };
};

export {
  toPrefectureModels,
  toPrefecturePopulationModel,
  type Prefecture,
  type PrefecturePopulation,
};
