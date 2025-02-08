import { FETCH_OPTIONS, SPOTIFY_API_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("q");
  const type = searchParams.get("type");
  const artistId = searchParams.get("artistId");
  const pageParam = searchParams.get("page") || "1"; // Padrão para 1ª página

  const page = parseInt(pageParam, 10);
  const LIMIT = type !== "multi" ? 24 : 12;

  if (
    (!query && !artistId) ||
    (artistId && type !== "albums" && type !== "singles") ||
    (artistId && artistId.length !== 22) ||
    (query &&
      !["artists", "albums", "multi", "singles"].includes(type || "")) ||
    isNaN(page) ||
    page < 1
  ) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  try {
    const url = artistId
      ? `${SPOTIFY_API_URL}/artist_${type}/?id=${artistId}`
      : `${SPOTIFY_API_URL}/search/?q=${encodeURIComponent(
          query!
        )}&type=${type}`;

    const response = await fetch(
      `${url}&offset=${(page - 1) * LIMIT}&limit=${LIMIT}`,
      FETCH_OPTIONS
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.message || "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("API Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
