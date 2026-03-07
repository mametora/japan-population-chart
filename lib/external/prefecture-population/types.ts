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
      label: string;
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
  label: string;
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
