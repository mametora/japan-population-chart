type PopulationGroupLabel = (typeof POPULATION_GROUP_LABEL)[number];

const POPULATION_GROUP_LABEL = [
  "総人口",
  "年少人口",
  "生産年齢人口",
  "老年人口",
] as const;

export { type PopulationGroupLabel, POPULATION_GROUP_LABEL };
