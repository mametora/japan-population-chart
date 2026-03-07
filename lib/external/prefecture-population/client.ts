import "server-only";
import env from "@/lib/env/server";
import { fetchJson } from "@/lib/http/fetcher";
import {
  toPrefectureModels,
  toPrefecturePopulationModel,
} from "@/lib/external/prefecture-population/mapper";
import type {
  Prefecture,
  PrefectureApiResponse,
  PrefecturePopulation,
  PrefecturePopulationApiResponse,
} from "@/lib/external/prefecture-population/types";

const BASE_URL = `${env.PREFECTURE_POPULATION_API_BASE_URL}/api/v1/`;

const getPrefectures = async (): Promise<Prefecture[]> => {
  const data = await fetchJson<PrefectureApiResponse>({
    baseUrl: BASE_URL,
    path: "prefectures",
    method: "GET",
    headers: {
      "X-API-KEY": env.PREFECTURE_POPULATION_API_KEY,
    },
  });

  return toPrefectureModels(data);
};

const getPrefecturePopulation = async (
  prefectureCode: number,
): Promise<PrefecturePopulation> => {
  const data = await fetchJson<PrefecturePopulationApiResponse>({
    baseUrl: BASE_URL,
    path: `population/composition/perYear`,
    method: "GET",
    query: {
      prefCode: prefectureCode,
    },
    headers: {
      "X-API-KEY": env.PREFECTURE_POPULATION_API_KEY,
    },
  });

  return toPrefecturePopulationModel(data);
};

export { getPrefectures, getPrefecturePopulation };
