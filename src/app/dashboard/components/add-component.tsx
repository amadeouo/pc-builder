"use client"

import { getComponentsByCategory } from "@/app/dashboard/actions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import type { Component } from "@/model/types/component";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";

type Props = {
  categoryId: string
  categoryName: string
  onSelect: (component: Component) => void
}

export function AddComponent({
  categoryName,
  categoryId,
  onSelect,
}: Props) {
  const [components, setComponents] = useState<Component[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getComponentsByCategory(categoryId)
      .then(
        (data) => {
          setComponents(data)
          setIsLoading(false)
        }
      )
  }, [categoryId])

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
                    onClick={() => onSelect(c)}
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