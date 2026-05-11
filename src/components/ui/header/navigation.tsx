"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/shadcn-ui/tabs";
import { getTabName } from "@/lib/utils";
import {
  LayoutList,
  Plus,
  Users
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  session: Session | null
}

export function Navigation({ session = null }: Props) {
  const pathname = usePathname()
  const tabName = getTabName(pathname)

  if (!session) return

  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-center">
        <Tabs value={tabName} className="w-fit">
          <TabsList className="flex gap-5">
            <TabsTrigger value="dashboard" asChild>
              <Link href="/dashboard">
                <Plus className="h-4 w-4" />
                <p>Создать сборку</p>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="explore" asChild>
              <Link href="/builds">
                <LayoutList className="h-4 w-4" />
                <p>Мои сборки</p>
              </Link>
            </TabsTrigger>
            <TabsTrigger value="builds" asChild>
              <Link href="/builds/explore">
                <Users className="h-4 w-4" />
                <p>Публичные сборки</p>
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}