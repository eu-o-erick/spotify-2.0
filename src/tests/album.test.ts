import { NextRequest } from "next/server";
import { GET } from "../app/api/v1/album/route";

global.fetch = jest.fn();

describe("GET /api/v1/album", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return album data when given a valid id", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/album?id=2w9zwq3AktTeYYMuhMjju8`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          albums: [{ name: "Album Name", artist: "Artist Name" }],
        }),
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      albums: [{ name: "Album Name", artist: "Artist Name" }],
    });
  });

  it("should return 400 when id is missing", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/album`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Missing 'id' parameter" });
  });

  it("should return 400 when id is invalid", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/album?id=123`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Missing 'id' parameter" });
  });

  it("should return 500 when Spotify API fails", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/album?id=2w9zwq3AktTeYYMuhMjju8`,
    } as NextRequest;

    (fetch as jest.Mock).mockRejectedValue(new Error("Spotify API error"));

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Failed to fetch data" });
  });
});
