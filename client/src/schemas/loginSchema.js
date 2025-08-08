import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter ao menos 6 caracteres"),
});
