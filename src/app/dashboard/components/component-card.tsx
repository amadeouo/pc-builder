"use client"

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { Plus } from "lucide-react";

type Props = {
  name: string
  price: number
  onClick?: () => void
}

export function ComponentCard({
  name,
  price,
  onClick,
}: Props) {
  return (
    <Card>
      <CardHeader className="min-h-0 flex-1 pb-2">
        <CardTitle className="text-base font-medium leading-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-sm font-medium tabular-nums">
          {new Intl.NumberFormat("ru-RU").format(price)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-1.5">
        <Button
          onClick={onClick}
          variant="secondary"
          className="w-full gap-1.5 text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          Добавить
        </Button>
      </CardFooter>
    </Card>
  )
}