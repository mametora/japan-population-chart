import type {
  PrefectureApiResponse,
  PrefecturePopulationApiResponse,
  Prefecture,
  PrefecturePopulation,
} from "@/lib/external/prefecture-population/types";

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

export { toPrefectureModels, toPrefecturePopulationModel };
