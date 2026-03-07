import {
  toPrefectureModels,
  toPrefecturePopulationModel,
} from "@/lib/external/prefecture-population/mapper";
import type {
  PrefectureApiResponse,
  PrefecturePopulationApiResponse,
} from "@/lib/external/prefecture-population/types";

describe("toPrefectureModels", () => {
  it("APIレスポンスをPrefecture[]に変換する", () => {
    const response: PrefectureApiResponse = {
      message: null,
      result: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 13, prefName: "東京都" },
      ],
    };
    expect(toPrefectureModels(response)).toEqual([
      { id: 1, name: "北海道" },
      { id: 13, name: "東京都" },
    ]);
  });
});

describe("toPrefecturePopulationModel", () => {
  it("APIレスポンスをPrefecturePopulationに変換する", () => {
    const response: PrefecturePopulationApiResponse = {
      message: null,
      result: {
        boundaryYear: 2020,
        data: [
          {
            label: "総人口",
            data: [
              {
                year: 1960,
                value: 5039206,
              },
            ],
          },
          {
            label: "年少人口",
            data: [
              {
                year: 1960,
                value: 1681479,
                rate: 33.37,
              },
            ],
          },
        ],
      },
    };
    expect(toPrefecturePopulationModel(response)).toEqual({
      boundaryYear: 2020,
      populationGroups: [
        {
          label: "総人口",
          populations: [
            {
              year: 1960,
              value: 5039206,
            },
          ],
        },
        {
          label: "年少人口",
          populations: [
            {
              year: 1960,
              value: 1681479,
              rate: 33.37,
            },
          ],
        },
      ],
    });
  });
});
