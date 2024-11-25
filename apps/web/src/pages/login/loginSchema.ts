import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password is too short" }),
});
