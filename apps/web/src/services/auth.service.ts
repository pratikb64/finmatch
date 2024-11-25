import { BACKEND_URL } from "@/env";
import { loginSchema } from "@/pages/login/loginSchema";
import { ApiResponse, User } from "@/types";
import { z } from "zod";

export const registerUserService = async (args: User) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...args.data, role: args.role }),
    });

    const data: ApiResponse<undefined> = await response.json();

    if (!data.success) {
      return Promise.reject(data);
    }

    return data;
  } catch (error) {
    return Promise.reject({
      success: false,
      message: "Something went wrong",
      errors: error,
    });
  }
};

export type LoginArgs = z.infer<typeof loginSchema>;

export const loginUserService = async (args: LoginArgs) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    const data: ApiResponse<string> = await response.json();

    if (!data.success) {
      return Promise.reject(data);
    }

    return data;
  } catch (error) {
    return Promise.reject({
      success: false,
      message: "Something went wrong",
      errors: error,
    });
  }
};

export const getUserService = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("session")}`,
      },
    });

    const data: ApiResponse<User> = await response.json();

    if (!data.success) {
      return Promise.reject(data);
    }

    return data;
  } catch (error) {
    return Promise.reject({
      success: false,
      message: "Something went wrong",
      errors: error,
    });
  }
};
