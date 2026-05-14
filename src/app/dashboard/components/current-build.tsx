"use client"

import { Button } from "@/components/shadcn-ui/button";
import { TypographyH1 } from "@/components/typography";
import { useState } from "react";
import { TableParts } from "./table-parts";

export default function CurrentBuild() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
        <TableParts />
      </div>
    </>
  )
}