import { Router } from "express";
import { db } from "../config/db";
import { nanoid } from "nanoid";
import { validate } from "../middleware/validate";
import { createSnippetSchema, idParamSchema } from "../schemas/snippet";

const router = Router();

router.post("/", validate(createSnippetSchema), async (req, res) => {
  const { body } = req;

  const snippet = await db.insertInto("snippets")
    .values({
      id: nanoid(),
      code: body.code,
      language: body.language,
      theme: body.theme,
    })
    .returningAll()
    .executeTakeFirstOrThrow();

  res.status(201).json(snippet);
});

router.get("/:id", validate(idParamSchema, "params"), async (req, res) => {
  const { id } = req.params;

  const snippet = await db.selectFrom("snippets")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (!snippet)
    return res.status(404).json({ message: "Snippet not found" });

  res.status(200).json(snippet);
});

export default router;