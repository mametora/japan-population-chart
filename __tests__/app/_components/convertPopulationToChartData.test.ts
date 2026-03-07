import convertPopulationToChartData, {
  type Population,
} from "@/app/_components/convertPopulationToChartData";

describe("toPrefectureModels", () => {
  it("APIレスポンスをPrefecture[]に変換する", () => {
    const prefectures = [
      {
        id: 1,
        name: "北海道",
      },
      {
        id: 13,
        name: "東京都",
      },
    ];
    const population: Population = {
      1: {
        boundaryYear: 2020,
        populationGroups: [
          {
            label: "総人口",
            populations: [
              { year: 1960, value: 5039206 },
              { year: 1965, value: 5171800 },
            ],
          },
        ],
      },
      13: {
        boundaryYear: 2020,
        populationGroups: [
          {
            label: "総人口",
            populations: [
              { year: 1960, value: 9683802 },
              { year: 1965, value: 10869244 },
            ],
          },
        ],
      },
      18: {
        boundaryYear: 2020,
        populationGroups: [
          {
            label: "総人口",
            populations: [
              { year: 1960, value: 9683802 },
              { year: 1965, value: 10869244 },
            ],
          },
        ],
      },
    };
    const label = "総人口";
    expect(
      convertPopulationToChartData(prefectures, population, label),
    ).toEqual({
      years: [1960, 1965],
      chartData: [
        {
          name: "北海道",
          data: [5039206, 5171800],
        },
        {
          name: "東京都",
          data: [9683802, 10869244],
        },
      ],
    });
  });
});
