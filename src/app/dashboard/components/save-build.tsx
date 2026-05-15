"use client"

import { type Build, saveBuild } from "@/app/dashboard/actions";
import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { Field, FieldError } from "@/components/shadcn-ui/field";
import { Input } from "@/components/shadcn-ui/input";
import { useComponentsStore } from "@/model/store/useComponentsStore";
import { BuildSchema } from "@/model/zod/build";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: Build
  redirectPath?: string
}

export function SaveBuild({
  open,
  onOpenChange,
  defaultValue,
  redirectPath,
}: Props) {
  const router = useRouter()
  const selectedBuild = useComponentsStore(state => state.selectedByCategory)

  const componentsId = Object.values(selectedBuild)
    .filter(c => c !== null)
    .map(c => c.id)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm({
    defaultValues: defaultValue ?? {},
    resolver: zodResolver(BuildSchema),
  })

  const handleSave: SubmitHandler<{ name: string }> = async (data) => {
    if (!componentsId.length) {
      setError("name", {
        type: "manual",
        message: "Добавьте хотя бы один компонент",
      })
      return
    }

    await saveBuild({ ...data, components: componentsId.join(",") })
      .then(() => {
        onOpenChange(false)
        toast.success("Сборка сохранена")
        if (redirectPath) {
          router.push(redirectPath)
        } else {
          router.refresh()
        }
      })
      .catch(e => {
        setError("name", {
          type: "manual",
          message: e.message,
        })
        toast.error("Сборка не сохранена")
      })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить сборку</DialogTitle>
          <DialogDescription>Введите название сборки</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
              <Field>
                <Input
                  {...field}
                  placeholder="Например: Игровой ПК"
                  aria-invalid={invalid}
                  required
                />
                {error && (
                  <FieldError errors={[error]} />
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              onClick={() => onOpenChange(false)}
              variant="secondary"
            >
              Отменить
            </Button>
            <Button
              disabled={isSubmitting}
              type="submit"
            >
              Сохранить
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}