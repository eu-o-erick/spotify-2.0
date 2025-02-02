import { FETCH_OPTIONS, SPOTIFY_API_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const type = searchParams.get("type");
  const artist = searchParams.get("artist");
  const pageParam = searchParams.get("page") || "0";

  const page = parseInt(pageParam, 10);

  const LIMIT = type !== "multi" ? 24 : 12;

  if (
    (!query && !artist) ||
    (artist && type !== "albums") ||
    (!query && artist?.length !== 22) ||
    (query &&
      type !== "artists" &&
      type !== "albums" &&
      type !== "multi" &&
      type) ||
    isNaN(page) ||
    page < 0
  ) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    let response: Response | null = null;
    let url = "";

    if (artist) {
      url = `${SPOTIFY_API_URL}/artist_albums/?id=${artist}`;
    } else {
      url = `${SPOTIFY_API_URL}/search/?q=${query}&type=${type}`;
    }

    response = await fetch(
      `${url}&offset=${Number(page) * LIMIT}&limit=${LIMIT}`,
      FETCH_OPTIONS
    );

    if (response) {
      const data = await response.json();
      return NextResponse.json(data);
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
