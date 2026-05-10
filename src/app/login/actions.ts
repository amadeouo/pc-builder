"use server"

import { LoginSchemaType } from "@/model/zod/auth";
import { redirect } from "next/navigation";
import { signIn } from "@/model/auth";
import { AuthError } from "next-auth";

export async function login(
  formData: LoginSchemaType
) {
  const { email, password } = formData;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })

    redirect("/dashboard")
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === 'CredentialsSignin') {
        throw new Error("Неверный email или пароль")
      }
      throw new Error("Ошибка авторизации")
    }
    throw e
  }
}