import { NextRequest } from "next/server";
import { GET } from "@/app/api/v1/search/route";

global.fetch = jest.fn();

describe("GET API Tests", () => {
  it("should return albums for an artist", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?artist=2w9zwq3AktTeYYMuhMjju8&type=albums&page=0`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ albums: ["album1", "album2"] }),
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.albums).toEqual(["album1", "album2"]);
  });

  it("should return error when 'type=albums' is missing", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?artist=2w9zwq3AktTeYYMuhMjju8&page=0`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Invalid parameters" }),
    });

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Invalid parameters");
  });

  it("should return error when 'q' query parameter is missing", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?page=0`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Invalid parameters" }),
    });

    const response = await GET(request);

    expect(response.status).toBe(400);

    const responseBody = await response.json();
    expect(responseBody.error).toBe("Invalid parameters");
  });

  it("should return error when 'artist' query parameter is invalid", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?artist=invalidArtist&type=albums&page=0`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Invalid parameters");
  });

  it("should return error when 'type' query parameter is invalid", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?q=artistName&type=invalidType&page=0`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Invalid parameters");
  });

  it("should return error when 'page' query parameter is invalid", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?q=artistName&type=albums&page=-1`,
    } as NextRequest;

    const response = await GET(request);

    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Invalid parameters");
  });

  it("should return search results for 'q' with type 'multi'", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?q=artistName&type=multi&page=0`,
    } as NextRequest;

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: ["result1", "result2"] }),
    });

    const response = await GET(request);

    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.results).toEqual(["result1", "result2"]);
  });

  it("should return 500 when Spotify API fails", async () => {
    const request = {
      url: `http://localhost:3000/api/v1/search?artist=2w9zwq3AktTeYYMuhMjju8&type=albums&page=0`,
    } as NextRequest;

    (fetch as jest.Mock).mockRejectedValue(new Error("Spotify API error"));

    const response = await GET(request);

    expect(response.status).toBe(500);
    const responseBody = await response.json();
    expect(responseBody).toEqual({ error: "Failed to fetch data" });
  });
});
