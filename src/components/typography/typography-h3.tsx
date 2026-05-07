import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Props = {
  className?: string
  children: ReactNode
}

export function TypographyH3({ className, children, ...props }: Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}