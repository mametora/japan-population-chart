import { getPrefectures } from "@/lib/external/prefecture-population/client";
import PrefecturePopulation from "@/app/_components/PrefecturePopulation";
import Typography from "@/components/ui/Typography";

export default async function Home() {
  const prefectures = await getPrefectures();

  return (
    <div className="font-sans">
      <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-24">
        <Typography variant="h1">Japan Population Chart</Typography>
        <PrefecturePopulation prefectures={prefectures} />
      </main>
    </div>
  );
}
