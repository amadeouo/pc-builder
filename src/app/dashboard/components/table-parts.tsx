"use client"

import { Button } from "@/components/shadcn-ui/button";
import { Dialog, DialogTrigger } from "@/components/shadcn-ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { type CategoryRow, iconMap } from "@/lib/constants";
import type { Component } from "@/model/types/component";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddComponent } from "./add-component";

type Props = {
  components: CategoryRow[]
  selectedByCategory: Record<string, Component | null>
  onSelectedComponent: (categoryId: string, component: Component | null) => void
}

export function TableParts({
  components,
  selectedByCategory,
  onSelectedComponent,
}: Props) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null)
  const totalPrice = Object.values(selectedByCategory)
    .reduce((acc, component) => acc + ( component?.price ?? 0 ), 0)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Компонент</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead>Модель</TableHead>
          <TableHead className="text-center">Действие</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {components.map(category => {
          const Icon = iconMap[category.icon]
          const selected = selectedByCategory[category.id]

          return (
            <TableRow key={category.id} className="my-2">
              <TableCell>
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-1" />
                </div>
              </TableCell>
              <TableCell className="font-bold">{category.name}</TableCell>
              <TableCell>{selected?.price ?? "-"}</TableCell>
              <TableCell>{selected?.name ?? "-"}</TableCell>
              <TableCell className="flex justify-center">
                <Dialog
                  open={openCategoryId === category.id}
                  onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setOpenCategoryId(category.id)}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {selected ? "Изменить" : "Добавить"}
                    </Button>
                  </DialogTrigger>
                  <AddComponent
                    categoryId={category.id}
                    categoryName={category.name}
                    onSelect={(c) => {
                      onSelectedComponent(category.id, c)
                      setOpenCategoryId(null)
                    }}
                  />
                </Dialog>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}