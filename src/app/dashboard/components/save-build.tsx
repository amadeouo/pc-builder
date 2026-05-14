"use client"

import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import { Input } from "@/components/shadcn-ui/input";
import { useComponentsStore } from "@/model/store/useComponentsStore";
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultValue?: { name: string, components: string }
}

export function SaveBuild({
  open,
  onOpenChange,
  defaultValue,
}: Props) {
  const selectedBuild = useComponentsStore(state => state.selectedByCategory)

  const componentsId = Object.values(selectedBuild)
    .filter(c => c !== null)
    .map(c => c.id)

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultValue ??  {}
  })

  const handleSave: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    onOpenChange(false)
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
            render={({ field, fieldState }) => (
                <Input
                  {...field}
                  placeholder="Например: Игровой ПК"
                  aria-invalid={fieldState.invalid}
                  required
                />
            )}
          />

          <input
            type="hidden"
            {...register("components")}
            value={componentsId.join(",")}
          />

          <DialogFooter>
            <Button variant="secondary">Отменить</Button>
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