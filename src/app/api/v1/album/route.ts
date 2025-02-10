import { FETCH_OPTIONS, SPOTIFY_API_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || id.length !== 22) {
    return NextResponse.json(
      { error: "Missing or invalid 'id' parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${SPOTIFY_API_URL}/albums/?ids=${id}`,
      FETCH_OPTIONS
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.message || "Failed to fetch album data" },
        { status: response.status }
      );
    }

    const { albums } = await response.json();

    if (!albums || !albums[0]) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ album: albums[0] });
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
