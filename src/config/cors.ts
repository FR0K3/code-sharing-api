import { CorsOptions } from "cors";

const whiteList = [process.env.FRONTEND_URL]
  .filter((url): url is string => Boolean(url))
  .map((url) => url.replace(/\/$/, ""));

export const corsConfig: CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (whiteList.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};