import { PopulationGroupLabel } from "@/lib/external/prefecture-population/constants";

type PrefectureApiResponse = {
  message: string | null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};

type PrefecturePopulationApiResponse = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: PopulationGroupLabel;
      data: {
        year: number;
        value: number;
        rate?: number;
      }[];
    }[];
  };
};

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
  label: PopulationGroupLabel;
  populations: Population[];
};

type PrefecturePopulation = {
  boundaryYear: number;
  populationGroups: PopulationGroup[];
};

export type {
  PrefectureApiResponse,
  PrefecturePopulationApiResponse,
  Prefecture,
  PrefecturePopulation,
};
