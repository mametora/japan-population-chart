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

export type { PrefectureApiResponse, PrefecturePopulationApiResponse };
