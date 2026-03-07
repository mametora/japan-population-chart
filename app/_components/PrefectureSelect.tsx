import Typography from "@/components/ui/Typography";
import Checkbox from "@/components/ui/Checkbox";
import { Dispatch, SetStateAction } from "react";
import type { Prefecture } from "@/lib/external/prefecture-population/types";
import Card from "@/components/ui/Card";

type Props = {
  prefectures: Prefecture[];
  selectedPrefectureIds: number[];
  setSelectedPrefectureIds: Dispatch<SetStateAction<number[]>>;
};

export default function PrefectureSelect({
  prefectures,
  selectedPrefectureIds,
  setSelectedPrefectureIds,
}: Props) {
  const handlePrefectureChange = (prefectureId: number) => {
    setSelectedPrefectureIds((prev) => {
      if (prev.includes(prefectureId)) {
        return prev.filter((id) => id !== prefectureId);
      } else {
        return [...prev, prefectureId];
      }
    });
  };

  return (
    <Card className="flex flex-col gap-4">
      <Typography variant="h2">都道府県</Typography>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-48 lg:max-h-none overflow-y-auto">
        {prefectures.map((prefecture) => (
          <Checkbox
            key={prefecture.id}
            id={prefecture.id.toString()}
            label={prefecture.name}
            className="flex items-center space-x-2"
            checked={selectedPrefectureIds.includes(prefecture.id)}
            onChange={() => handlePrefectureChange(prefecture.id)}
          />
        ))}
      </div>
    </Card>
  );
}
