"use client"

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { TypographyH3 } from "@/components/typography";
import type { BuildCard } from "@/model/types/builds"
import { Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  build: BuildCard,
  children?: ReactNode
}

export function BuildCard({
  build,
  children,
}: Props) {
  return (
    <Card className="flex">
      <CardHeader
        className="pb-2 flex flex-row items-start justify-between gap-2"
      >
        <div className="min-w-0 flex flex-col">
          <CardTitle>
            <TypographyH3>{build.name}</TypographyH3>
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Создал: {build.user.email}
          </p>
        </div>
        <div className="shrink-0">
          <Button>
            <Link href={`/builds/${build.id}`}><Pencil
              className="w-4 h-4"
            /></Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0 space-y-1 gap-2">
        {
          build.components.length ? (
            <>
              <p className="text-sm font-medium mt-2">Компоненты:</p>
              <ul
                className="text-sm text-muted-foreground list-disc list-inside space-y-0.5"
              >
                {
                  build.components.map(c => (
                    <li key={c.id}>{c.component.name}</li>
                  ))
                }
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Компонентов нет</p>
          )
        }
      </CardContent>
      <CardFooter className="flex flex-row justify-between gap-2 pt-4 border-t">
        <CardDescription className="text-sm font-medium tabular-nums flex flex-col justify-between">
          <span className="text-sky-500 text-lg font-bold">
            {
              new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
                maximumFractionDigits: 0,
              }).format(build.totalPrice)
            }
          </span>
          {
            build.createdAt && (
              <p className="text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("ru-RU").format(build.createdAt)}
              </p>
            )
          }
          <div className="flex flex-row gap-2">
            {children}
          </div>
        </CardDescription>
      </CardFooter>

    </Card>
  )
}