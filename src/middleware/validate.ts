import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validate =
  (schema: ZodType, source: "body" | "params" | "query" = "body"): RequestHandler =>
    (req, res, next) => {
      const result = schema.safeParse(req[source]);

      if (!result.success) {
        return res.status(400).json({
          message: "Data not valid",
          errors: result.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }

      req[source] = result.data;
      next();
    };