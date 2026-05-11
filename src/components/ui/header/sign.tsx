"use client"

import { Button } from "@/components/shadcn-ui/button";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session | null
}

export function Sign({ session = null }: Props) {
  return (
    <Button
      variant="ghost"
      type="button"
      onClick={() => signOut({ redirectTo: "/" })}
    >
      {session ? "Выйти" : "Войти"}
    </Button>
  )
}