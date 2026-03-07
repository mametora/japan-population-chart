import { NextResponse } from "next/server";
import { getPrefectures } from "@/lib/external/prefecture-population/client";

const GET = async () => {
  try {
    const prefectures = await getPrefectures();
    return NextResponse.json(prefectures);
  } catch (error) {
    console.error("Error fetching prefectures:", error);
    return NextResponse.json(
      { error: "Failed to fetch prefectures" },
      { status: 500 },
    );
  }
};

export { GET };
