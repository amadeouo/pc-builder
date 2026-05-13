"use server"

import { prisma } from "@/lib/db";
import { categoryIdToDbType, type Component } from "@/model/types/component";

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