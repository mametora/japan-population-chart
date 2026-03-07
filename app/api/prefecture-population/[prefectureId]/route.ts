import { type NextRequest, NextResponse } from "next/server";
import { getPrefecturePopulation } from "@/lib/external/prefecture-population/client";

type Props = {
  params: Promise<{ prefectureId: string }>;
};

const GET = async (_request: NextRequest, { params }: Props) => {
  const { prefectureId } = await params;

  try {
    const numPrefectureId = parseInt(prefectureId);
    if (isNaN(numPrefectureId)) {
      return NextResponse.json(
        { error: "Invalid prefectureId" },
        { status: 400 },
      );
    }

    const prefecturePopulation = await getPrefecturePopulation(numPrefectureId);
    return NextResponse.json(prefecturePopulation);
  } catch (error) {
    console.error("Error fetching prefecture population:", error);
    return NextResponse.json(
      { error: "Failed to fetch prefecture population" },
      { status: 500 },
    );
  }
};

export { GET };
