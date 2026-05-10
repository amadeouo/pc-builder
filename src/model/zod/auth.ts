import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string({ error: "Поле не может быть пустым" })
    .email({ error: "Неправильный формат почты" }),
  password: z.string({ error: "Поле не может быть пустым"}),
})

export const SignupSchema = z.object({
  name: z.string({ error: "Поле не может быть пустым"})
    .min(2, { error: "Имя должно содержать 2 или больше символов" }),
  email: z.string({ error: "Поле не может быть пустым"})
    .email({ error: "Неправильный формат почты" }),
  password: z.string({ error: "Поле не может быть пустым"})
    .min(8, { error: "Пароль должен содержать больше 8 символов" }),
  repeatPassword: z.string({ error: "Поле не может быть пустым"})
    .min(8, { error: "Пароль должен содержать больше 8 символов" })
}).refine(values => values.password === values.repeatPassword, {
  error: "Пароли должны совпадать",
  path: ["repeatPassword"]
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
export type SignupSchemaType = z.infer<typeof SignupSchema>