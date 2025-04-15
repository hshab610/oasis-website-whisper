
import { cn } from "@/lib/utils"

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}>
      {children}
    </h2>
  )
}

export function P({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "leading-7 [&:not(:first-child)]:mt-6",
      className
    )}>
      {children}
    </p>
  )
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-xl text-muted-foreground",
      className
    )}>
      {children}
    </p>
  )
}

