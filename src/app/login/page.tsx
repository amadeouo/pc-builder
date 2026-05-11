import { LoginForm } from "@/components/login-form"
import { auth } from "@/model/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center px-6 md:px-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
