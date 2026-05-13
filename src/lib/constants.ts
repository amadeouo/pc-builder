import type { ComponentCategory } from "@/model/types/component";
import {
  Box,
  Cpu,
  Fan,
  HardDrive,
  MemoryStick,
  Monitor,
  Server,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

export const iconMap: Record<ComponentCategory["icon"], ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan,
}

export type CategoryRow = {
  id: string
  name: string
  icon: string
}

export const componentCategories: ComponentCategory[] = [
  { id: 'cpu', name: 'CPU', icon: 'Cpu' },
  { id: 'gpu', name: 'Видеокарта', icon: 'Monitor' },
  { id: 'motherboard', name: 'Материнская плата', icon: 'Server' },
  { id: 'ram', name: 'Оперативная память', icon: 'MemoryStick' },
  { id: 'storage', name: 'Накопитель', icon: 'HardDrive' },
  { id: 'psu', name: 'Блок Питания', icon: 'Zap' },
  { id: 'case', name: 'Корпус', icon: 'Box' },
  { id: 'cooling', name: 'Охлаждение', icon: 'Fan' },
]
