import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});
