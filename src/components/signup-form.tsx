"use client"

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
  FieldDescription, FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn-ui/field"
import { Input } from "@/components/shadcn-ui/input"
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupSchemaType } from "@/model/zod/auth";
import { signup } from "@/app/signup/actions";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    handleSubmit,
    control,
    setError,
    reset
  } = useForm({
    reValidateMode: "onBlur",
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {
    signup(data)
      .catch(e => {
        setError("email", {
          type: "manual",
          message: e.message
        })
        reset()
      })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создайте аккаунт</CardTitle>
        <CardDescription>
          Введите информацию для регистрации
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error, invalid }}) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Полное имя</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={invalid}
                    type="text"
                    placeholder="Михаил"
                  />
                  {error && (
                    <FieldError errors={[error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error, invalid }}) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="off"
                    aria-invalid={invalid}
                  />
                  { error ? (
                    <FieldError errors={[error]} />
                  ) : (
                    <FieldDescription>
                      Мы используем эту информацию для входа, не передаем вашу почту кому-либо другому
                    </FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error, invalid }}) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    autoComplete="off"
                    aria-invalid={invalid}
                  />
                  {error ? (
                    <FieldError errors={[error]} />
                  ) : (
                    <FieldDescription>Пароль должен содержать 8 символов ли больше</FieldDescription>
                  )}
                </Field>
              )}
            />

            <Controller
              name="repeatPassword"
              control={control}
              render={({ field, fieldState: { error, invalid }}) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>
                    Подтвердите пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    aria-invalid={invalid}
                  />
                  {error ? (
                    <FieldError errors={[error]} />
                  ) : (
                    <FieldDescription>Пожалуйста подтвердите введенный ранее пароль</FieldDescription>
                  )}
                </Field>
              )}
            />
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>
                <FieldDescription className="px-6 text-center">
                  Уже есть аккаунт? <Link href="/login">Войти</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
