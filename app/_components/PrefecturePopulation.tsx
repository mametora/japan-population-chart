"use client";

import { useState } from "react";
import PrefectureSelect from "@/app/_components/PrefectureSelect";
import PrefecturePopulationGraph from "@/app/_components/PrefecturePopulationGraph";
import type { Prefecture } from "@/lib/external/prefecture-population/types";

type Props = {
  prefectures: Prefecture[];
};

export default function PrefecturePopulation({ prefectures }: Props) {
  const [selectedPrefectureIds, setSelectedPrefectureIds] = useState<number[]>(
    [],
  );

  const selectedPrefectures = prefectures.filter((prefecture) =>
    selectedPrefectureIds.includes(prefecture.id),
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-8 w-full">
      <PrefectureSelect
        prefectures={prefectures}
        selectedPrefectureIds={selectedPrefectureIds}
        setSelectedPrefectureIds={setSelectedPrefectureIds}
      />
      <PrefecturePopulationGraph prefectures={selectedPrefectures} />
    </div>
  );
}
