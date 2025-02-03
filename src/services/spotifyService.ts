export const fetchSpotifySearch = async (
  type: "multi" | "albums" | "artists",
  query: string | null,
  artistId: string | null
) => {
  let url = "";

  if (artistId) {
    url = `/api/v1/search?type=albums&artistId=${artistId}`;
  } else if (query) {
    url = `/api/v1/search?q=${query}&type=${type}`;
  } else {
    throw new Error();
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching data from Spotify");
    }

    const data = await response.json();

    return {
      albums: data.albums?.items || [],
      artists: data.artists?.items || [],
    };
  } catch (err) {
    console.error("Error fetching data:", err);

    return {
      albums: [],
      artists: [],
    };
  }
};
