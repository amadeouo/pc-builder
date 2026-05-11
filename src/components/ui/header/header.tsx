import { TypographyH3 } from "@/components/typography";
import {
  Navigation,
  Sign
} from "@/components/ui/header";
import { auth } from "@/model/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth()

  return (
    <header className="container flex justify-between items-center p-4">
      <div className="flex shrink-0">
        <TypographyH3>
          <Link href={session?.user ? '/dashboard' : "/public"}>
            ПК сборщик
          </Link>
        </TypographyH3>
      </div>
      <nav className="flex min-w-0">
        <Navigation session={session} />
      </nav>
      <div className="flex justify-end">
        <Sign session={session} />
      </div>
    </header>
  )
}