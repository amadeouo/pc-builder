import { z } from "zod";

export const BuildSchema = z.object({
  name: z.string({ error: "Поле не может быть пустым" }),
})