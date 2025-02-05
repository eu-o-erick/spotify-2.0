import { FETCH_OPTIONS, SPOTIFY_API_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  if (!id || id.length !== 22) {
    return NextResponse.json(
      { error: "Missing 'id' parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${SPOTIFY_API_URL}/albums/?ids=${id}`,
      FETCH_OPTIONS
    );

    if (response) {
      const { albums } = await response.json();
      return NextResponse.json(albums[0]);
    } else {
      throw new Error("No response from API");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
