import { DropDownItem } from "@/components/DropDown";

export const LANGUAGES: DropDownItem[] = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Español",
    value: "es",
  },
  {
    label: "Français",
    value: "fr",
  },
  {
    label: "Português",
    value: "pt",
  },
];

const API_KEY = process.env.SPOTIFY_API_KEY || "";

export const SPOTIFY_API_URL = "https://spotify23.p.rapidapi.com";

export const FETCH_OPTIONS: RequestInit = {
  method: "GET",
  headers: {
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
    "x-rapidapi-key": API_KEY,
  },
};

export const CACHE_TIME = 10 * 60 * 1000;
