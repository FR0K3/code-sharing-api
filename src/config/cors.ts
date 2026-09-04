import { CorsOptions } from "cors";

const whiteList = [process.env.FRONTEND_URL]
  .filter((url): url is string => Boolean(url))
  .map((url) => url.trim().replace(/\/$/, ""));

console.log("CORS whiteList:", whiteList);

export const corsConfig: CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (whiteList.includes(origin)) return callback(null, true);

    console.warn("Origin rejected:", origin);
    callback(null, false);
  },
};