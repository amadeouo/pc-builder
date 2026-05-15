"use server"

import { prisma } from "@/lib/db";
import { auth } from "@/model/auth";
import { categoryIdToDbType, type Component } from "@/model/types/component";
import { revalidatePath } from "next/cache";

export type Build = {
  name: string,
  components: string
}

export async function saveBuild(data: Build) {
  const session = await auth()

  if (!session?.user.id) {
    throw new Error("Не удалось распознать сессию")
  }

  const componentsIds = data.components
    .split(",")
    .map(id => id.trim())
    .filter(Boolean)

  const components = await prisma.component.findMany({
    where: { id: { in: componentsIds } },
  })

  if (components.length !== componentsIds.length) {
    throw new Error("Некоторые компоненты не найдены")
  }

  const totalPrice = components.reduce((s, c) => s + c.price, 0)

  try {
    const build = await prisma.$transaction(
      async (tx) => {
        const newBuild = await tx.build.create({
          data: {
            name: data.name,
            totalPrice: totalPrice,
            userId: session.user.id,
          },
        })

        await tx.buildComponent.createMany({
          data: componentsIds.map(componentId => ({
            buildId: newBuild.id,
            componentId,
          })),
        })

        return newBuild
      },
    )

    revalidatePath("/dashboard")
    revalidatePath("/builds")

    return build
  } catch (e) {
    throw new Error("Не удалось сохранить сборки")
  }
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
  const dbType = categoryIdToDbType[categoryId]

  if (!dbType) return []

  const components = await prisma.component.findMany({
    where: {
      type: dbType
    },
    orderBy: {
      price: "asc"
    }
  })

  return components.map(c => ({
    id: c.id,
    type: c.type,
    name: c.name,
    price: c.price,
    socket: c.socket
  }))
}