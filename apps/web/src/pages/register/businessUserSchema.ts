import { z } from "zod";

export const businessUserSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }).max(100),
  industry: z.string().min(2, { message: "Industry is required" }).max(100),
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password is too short" }),
  description: z.string().max(100),
});
