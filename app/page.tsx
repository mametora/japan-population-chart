import { getPrefectures } from "@/lib/external/prefecture-population/client";
import PrefecturePopulation from "@/app/_components/PrefecturePopulation";
import Typography from "@/components/ui/Typography";

export default async function Home() {
  const prefectures = await getPrefectures();

  return (
    <div className="font-sans">
      <header className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <Typography variant="h1">Japan Population Chart</Typography>
      </header>
      <main className="mx-auto max-w-6xl w-full px-4 sm:px-8">
        <PrefecturePopulation prefectures={prefectures} />
      </main>
    </div>
  );
}
