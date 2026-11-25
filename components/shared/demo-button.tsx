import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/lib/utils"

type DemoButtonProps = {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "light" | "ghost"
  showArrow?: boolean
  label?: string
}

const sizes = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3.5 text-base",
  lg: "px-6 py-4 text-base sm:text-lg",
}

export const demoButtonClass = (size: DemoButtonProps["size"] = "md", variant: DemoButtonProps["variant"] = "primary") =>
  cn(
    "group inline-flex items-center justify-center gap-2.5 font-sans font-bold leading-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 disabled:cursor-not-allowed disabled:opacity-60",
    variant === "ghost"
      ? "border-b-2 border-ink pb-1 font-mono text-xs uppercase tracking-[0.1em] hover:gap-3.5 hover:text-tomato"
      : "border-2 border-ink",
    variant === "primary" &&
      "bg-tomato text-paper-light shadow-[4px_4px_0_var(--ink)] hover:-translate-y-px hover:bg-tomato-dark hover:shadow-[5px_5px_0_var(--ink)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--ink)]",
    variant === "light" &&
      "bg-paper-light text-ink shadow-[4px_4px_0_var(--marigold)] hover:-translate-y-px hover:bg-white hover:shadow-[5px_5px_0_var(--marigold)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--marigold)]",
    variant !== "ghost" && sizes[size],
  )

export function DemoButton({
  className,
  size = "md",
  variant = "primary",
  showArrow = true,
  label,
}: DemoButtonProps) {
  return (
    <Link href="/book-a-demo#demo-form" className={cn(demoButtonClass(size, variant), className)}>
      {label ?? siteConfig.ctaLabel}
      {showArrow && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </Link>
  )
}
