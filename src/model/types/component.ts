import type { ComponentType } from "@/lib/prisma/enums"
import type {
  ComponentCreateWithoutBuildComponentsInput as PrismaComponent,
} from "@/lib/prisma/models/Component"

export type ComponentCategory = {
  id: string,
  name: string,
  icon: string,
}

export type Component = Required<PrismaComponent> & { type: ComponentType }

export type { ComponentType }

export const categoryIdToDbType: Record<string, ComponentType> = {
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  storage: "ssd",
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooling: "cooler",
}

export const dbTypeToCategoryId: Record<ComponentType, string> = {
  cpu: "cpu",
  gpu: "gpu",
  ram: "ram",
  ssd: "storage",
  motherboard: "motherboard",
  psu: "psu",
  case: "case",
  cooler: "cooling",
}