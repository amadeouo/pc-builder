"use client"

import { login } from "@/app/login/actions";
import { Button } from "@/components/shadcn-ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn-ui/field"
import { Input } from "@/components/shadcn-ui/input"
import { cn } from "@/lib/utils"
import {
  LoginSchema,
  LoginSchemaType
} from "@/model/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Controller,
  SubmitHandler,
  useForm
} from "react-hook-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors }
  } = useForm({
    reValidateMode: "onBlur",
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    login(data)
      .catch(e => {
        setError("root.serverError", {
          type: "manual",
          message: e.message
        })
      })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войдите в ваш аккаунт</CardTitle>
          <CardDescription>
            Используйте ваш email для входа в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error, invalid }}) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={invalid}
                    />
                    {error && (
                      <p className="text-red-400">{error.message}</p>
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error, invalid }}) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Пароль</FieldLabel>
                      <Link
                        href="/public"
                        className={`ml-auto inline-block text-sm underline-offset-4 hover:underline`}
                      >
                        Забыли ваш пароль?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={invalid}
                    />
                    {error && (
                      <p className="text-red-400">{error.message}</p>
                    )}
                  </Field>
                )}
              />

              {errors.root?.serverError
                && errors.root.serverError.message !== "NEXT_REDIRECT" && (
                <FieldError errors={[errors.root.serverError]} />
              )}

              <Field>
                <Button type="submit">Войти</Button>
                <FieldDescription className="text-center">
                  Нет аккаунта? <Link href="/signup">Зарегистрируйтесь</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
