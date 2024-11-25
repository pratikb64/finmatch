import { z } from "zod";

export const expertUserSchema = z.object({
  first_name: z.string().max(255),
  last_name: z.string().max(255),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone must be a 10 digit number" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password is too short" }),
  specializations: z
    .string()
    .refine((val) => val.split(",").every((item) => item.trim() !== ""), {
      message: "Specializations should be a valid comma separated string",
    }),
  certifications: z
    .string()
    .refine((val) => val.split(",").every((item) => item.trim() !== ""), {
      message: "Certifications should be a valid comma separated string",
    }),
  address_street: z.string().max(100),
  address_city: z.string(),
  address_state: z.string(),
  address_zip: z
    .string()
    .regex(/^\d{5}$/, { message: "Zipcode must be a 5 digit number" }),
});
