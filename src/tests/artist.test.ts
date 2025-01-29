import { NextRequest } from "next/server";
import { GET } from "../app/api/v1/artist/route";

global.fetch = jest.fn();

describe("GET /api/v1/artist", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return artist data when given a valid id", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/artist?id=2w9zwq3AktTeYYMuhMjju8`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ name: "Artist Name", albums: [] }),
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ name: "Artist Name", albums: [] });
  });

  it("should return 400 when id is missing", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/artist`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Missing 'id' parameter" });
  });

  it("should return 400 when id is invalid", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/artist?id=123`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Missing 'id' parameter" });
  });

  it("should return 500 when Spotify API fails", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/artist?id=2w9zwq3AktTeYYMuhMjju8`,
    } as NextRequest;

    (fetch as jest.Mock).mockRejectedValue(new Error("Spotify API error"));

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Failed to fetch data" });
  });
});
