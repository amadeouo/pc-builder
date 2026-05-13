"use client"

import { Button } from "@/components/shadcn-ui/button";
import { TypographyH1 } from "@/components/typography";
import { componentCategories } from "@/lib/constants";
import type { Component } from "@/model/types/component";
import { useCallback, useState } from "react";
import { TableParts } from "./table-parts";

export default function CurrentBuild() {
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component | null>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onSelectComponent = useCallback((categoryId: string, component: Component | null) => {
    setSelectedByCategory(prev => ( { ...prev, [categoryId]: component } ))
  }, [])

  return (
    <>
      <div className="flex justify-between mb-8">
        <TypographyH1>Собери свою сборку</TypographyH1>
        <Button
          onClick={() => setIsDialogOpen(true)}
        >
          Собрать
        </Button>
      </div>
      <div className="min-w-0 overflow-x-auto">
        <TableParts
          components={componentCategories}
          selectedByCategory={selectedByCategory}
          onSelectedComponent={onSelectComponent}
        />
      </div>
    </>
  )
}