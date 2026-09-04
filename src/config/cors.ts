import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin(origin, callback) {
    const whiteList = [process.env.FRONTEND_URL]
      .filter((url): url is string => Boolean(url))
      .map((url) => url.trim().replace(/\/$/, ""));

    if (!origin) return callback(null, true);
    if (whiteList.includes(origin)) return callback(null, true);

    console.warn("Origin rejected:", origin, "| whiteList:", whiteList);
    callback(null, false);
  },
};