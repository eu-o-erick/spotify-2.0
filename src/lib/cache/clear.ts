import { CACHE_TIME } from "../constants";

export const clearExpiredCache = () => {
  const now = Date.now();

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (!key) continue;

    const cached = localStorage.getItem(key);
    if (!cached) continue;

    try {
      const { timestamp } = JSON.parse(cached);

      if (now - timestamp > CACHE_TIME) localStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
};
