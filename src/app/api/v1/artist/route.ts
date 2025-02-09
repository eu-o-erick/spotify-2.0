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
      `${SPOTIFY_API_URL}/artist_overview/?id=${id}`,
      FETCH_OPTIONS
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.message || "Failed to fetch artist data" },
        { status: response.status }
      );
    }

    const { data } = await response.json();

    if (!data || data.artist?.length === 0) {
      return NextResponse.json({ error: "Artist not found" }, { status: 404 });
    }

    return NextResponse.json({ artist: data.artist });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
