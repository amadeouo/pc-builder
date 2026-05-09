"use server"

import { SignupSchemaType } from "@/model/zod/auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export async function signup(
  formData: SignupSchemaType
) {
  const { name, email, password } = formData;

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (user) {
    throw new Error("Пользователь уже существует")
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })

  redirect("/login")
}