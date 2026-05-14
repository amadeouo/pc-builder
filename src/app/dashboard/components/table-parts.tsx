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
import { componentCategories, iconMap } from "@/lib/constants";
import { useComponentsStore } from "@/model/store/useComponentsStore";
import { Plus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { AddComponent } from "./add-component";

export function TableParts() {
  const {
    selectedByCategory,
    openCategoryId,
    setOpenCategoryId,
  } = useComponentsStore(useShallow(s => ({
    selectedByCategory: s.selectedByCategory,
    openCategoryId: s.openCategoryId,
    setOpenCategoryId: s.setOpenCategoryId,
  })))

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
        {componentCategories.map(category => {
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