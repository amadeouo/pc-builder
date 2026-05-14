"use client"

import { getComponentsByCategory } from "@/app/dashboard/actions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { useComponentsStore } from "@/model/store/useComponentsStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { ComponentCard } from "./component-card";
import { Component } from "@/model/types/component";

type Props = {
  categoryId: string
  categoryName: string
}

export function AddComponent({
  categoryName,
  categoryId,
}: Props) {

  const {
    isLoading,
    setIsLoading,
    setOpenCategoryId,
    onSelectedComponent,
  } = useComponentsStore(useShallow((s) => ({
    isLoading: s.isLoading,
    setIsLoading: s.setIsLoading,
    setOpenCategoryId: s.setOpenCategoryId,
    onSelectedComponent: s.onSelectedComponent,
  })))

  const [components, setComponents] = useState<Component[]>([])

  useEffect(() => {
    getComponentsByCategory(categoryId)
      .then(
        (data) => {
          setComponents(data)
          setIsLoading(false)
        }
      )
  }, [categoryId, setComponents, setIsLoading])

  return (
    <DialogContent
      className="min-w-[450px] max-h-[80vh] overflow-hidden flex flex-col"
      aria-describedby={`choose ${categoryName}`}
    >
      <DialogHeader>
        <DialogTitle>Добавить компонент - {categoryId}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto mx-1 px-1 pt-2">
        {
          components.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {
                components.map(c => (
                  <ComponentCard
                    key={c.id}
                    name={c.name}
                    price={c.price}
                    onClick={() => {
                      onSelectedComponent(categoryId, c)
                      setOpenCategoryId(null)
                    }}
                  />
                ))
              }
            </div>
          ) : (
            <p className="text-muted-foreground text-sm py-4">
              { isLoading ? "Загрузка" : "Нет доступных компонентов" }
            </p>
          )
        }
      </div>
    </DialogContent>
  )
}