import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode
}

export function TypographyH1({ className, children, ...props }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight text-center lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}