import { cn } from "@/lib/utils"
import { Reveal } from "./reveal"

export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode
  className?: string
  tone?: "dark" | "light"
}) {
  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2",
        tone === "light" ? "text-marigold" : "text-tomato-dark",
        className,
      )}
    >
      <span
        className={cn("inline-block size-2 rotate-45", tone === "light" ? "bg-marigold" : "bg-tomato")}
        aria-hidden="true"
      />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  as: Tag = "h2",
  className,
  titleClassName,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  dark?: boolean
  as?: "h1" | "h2"
  className?: string
  titleClassName?: string
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={dark ? "light" : "dark"}>{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "display-tight text-balance text-[clamp(2.6rem,6vw,4.6rem)]",
          dark ? "text-paper" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-[1.05rem] leading-relaxed",
            dark ? "text-paper/72" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export function PageHeader({
  eyebrow,
  title,
  description,
  index,
  children,
  aside,
}: {
  eyebrow: string
  title: React.ReactNode
  description: React.ReactNode
  index?: string
  children?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-paper">
      <div className="pointer-events-none absolute inset-0 ledger-dots opacity-[0.12]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1180px] px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
        <div className="flex items-center justify-between border-b border-paper/20 pb-3">
          <p className="label text-paper/60">Urban Growlyst · {eyebrow}</p>
          {index && <p className="label text-marigold">Sheet {index}</p>}
        </div>

        <div className={cn("grid gap-10 pt-10 sm:pt-14", aside ? "lg:grid-cols-[1.35fr_0.65fr] lg:items-end" : "")}>
          <div className="flex flex-col gap-6">
            <Reveal>
              <h1 className="display-tight max-w-4xl text-balance text-[clamp(3.2rem,8vw,6.7rem)] text-paper">{title}</h1>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-paper/72">{description}</p>
            </Reveal>
            {children && (
              <Reveal delay={0.12} className="flex flex-wrap items-center gap-5 pt-2">
                {children}
              </Reveal>
            )}
          </div>
          {aside && <Reveal delay={0.15}>{aside}</Reveal>}
        </div>
      </div>
    </section>
  )
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1180px] px-5 sm:px-8", className)}>{children}</div>
}

export function SectionRule({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="h-px flex-1 bg-ink/20" aria-hidden="true" />
      {label && <span className="label text-ink/45">{label}</span>}
      <span className="h-px flex-1 bg-ink/20" aria-hidden="true" />
    </div>
  )
}
