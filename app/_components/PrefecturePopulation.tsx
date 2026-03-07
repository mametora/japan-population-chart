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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <PrefectureSelect
        prefectures={prefectures}
        selectedPrefectureIds={selectedPrefectureIds}
        setSelectedPrefectureIds={setSelectedPrefectureIds}
      />
    </div>
  );
}
