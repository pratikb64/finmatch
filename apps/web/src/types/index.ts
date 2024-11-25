import { businessUserSchema } from "@/pages/register/businessUserSchema";
import { expertUserSchema } from "@/pages/register/expertUserSchema";
import { z } from "zod";

export type User =
  | { role: "expert"; data: z.infer<typeof expertUserSchema> }
  | { role: "business"; data: z.infer<typeof businessUserSchema> };

//
export enum AsyncState {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string;
}
