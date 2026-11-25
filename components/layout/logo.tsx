import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/lib/utils"

export function LogoMark({
  className,
  variant = "dark",
}: {
  className?: string
  variant?: "dark" | "light"
}) {
  const reversed = variant === "light"
  const field = reversed ? "var(--paper)" : "var(--forest)"
  const letter = reversed ? "var(--forest)" : "var(--paper)"
  const leaf = reversed ? "var(--tomato)" : "var(--marigold)"

  return (
    <svg viewBox="0 0 64 64" className={cn("size-10 shrink-0", className)} aria-hidden="true">
      <circle cx="32" cy="32" r="29" fill={field} stroke="var(--ink)" strokeWidth="3" />
      <circle
        cx="32"
        cy="32"
        r="22.5"
        fill="none"
        stroke={letter}
        strokeWidth="1.2"
        strokeDasharray="1.6 3.2"
        opacity={reversed ? 0.5 : 0.6}
      />
      <path
        d="M42 23a14.5 14.5 0 1 0 2.4 13.6v-5.6h-9"
        fill="none"
        stroke={letter}
        strokeWidth="5.1"
      />
      <path d="M43.6 20.8l3.4-4.6" stroke={leaf} strokeWidth="2.2" />
      <path d="M47 16.2c.3-4.8 3.9-8.2 8.7-8.4-.3 4.8-3.9 8.2-8.7 8.4z" fill={leaf} />
      <path
        d="M47 16.2c2.8-1.2 4.8-3.2 5.9-6"
        stroke={reversed ? "var(--paper)" : "var(--forest)"}
        strokeWidth="1.1"
        opacity=".55"
      />
    </svg>
  )
}

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)} aria-label={`${siteConfig.name} home`}>
      {siteConfig.logo ? (
        <Image src={siteConfig.logo} alt={siteConfig.name} width={160} height={44} className="h-10 w-auto" priority />
      ) : (
        <>
          <LogoMark
            variant={variant}
            className="transition-transform duration-200 group-hover:-rotate-3"
          />
          <span className="flex flex-col leading-none">
            <span
              className={cn(
                "font-display text-[1.45rem] font-extrabold uppercase leading-[0.85] tracking-[0.01em]",
                variant === "light" ? "text-paper" : "text-ink",
              )}
            >
              Urban
            </span>
            <span
              className={cn(
                "mt-1 font-mono text-[0.52rem] font-semibold uppercase tracking-[0.3em]",
                variant === "light" ? "text-marigold" : "text-tomato",
              )}
            >
              Growlyst
            </span>
          </span>
        </>
      )}
    </Link>
  )
}
