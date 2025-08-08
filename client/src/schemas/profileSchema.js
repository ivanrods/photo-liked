import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
});
