import { BuildCard } from "@/app/builds/components/build-card";
import { TypographyH3 } from "@/components/typography";
import { auth } from "@/model/auth";
import { redirect } from "next/navigation";
import { getMyBuilds } from "./actions";

export default async function Page() {
  const session = await auth()

  if (!session?.user.id) {
    redirect("/login")
  }

  const builds = await getMyBuilds(session.user.id)

  return (
    <div className="py-6">
      <TypographyH3>Мои сборки</TypographyH3>
      <br />
      {
        builds.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {builds.map((build) => (
              <BuildCard key={build.id} build={build} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Пока нет сохраненных сборок</p>
        )
      }
    </div>
  )
}