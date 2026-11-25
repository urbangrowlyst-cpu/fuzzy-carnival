import type { LucideIcon } from "lucide-react"
import { Reveal } from "./reveal"

export function BenefitGrid({
  items,
  dark = false,
}: {
  items: { Icon: LucideIcon; title: string; text: string }[]
  dark?: boolean
}) {
  return (
    <div className={"grid border-t sm:grid-cols-2 lg:grid-cols-4 " + (dark ? "border-paper/20" : "border-ink/25")}>
      {items.map(({ Icon, title, text }, i) => (
        <Reveal key={title} delay={i * 0.05}>
          <div
            className={
              "flex h-full flex-col gap-3 border-b py-6 sm:px-5 lg:border-b-0 " +
              (dark ? "border-paper/20 " : "border-ink/20 ") +
              (i > 0 ? "lg:border-l " : "") +
              (i % 2 === 1 ? "sm:border-l " : "") +
              (i === 0 ? "sm:pl-0" : "") +
              (i === items.length - 1 ? "sm:pr-0" : "")
            }
          >
            <div className="flex items-center justify-between gap-3">
              <span className={"font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] " + (dark ? "text-marigold" : "text-tomato")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Icon className={"size-5 " + (dark ? "text-paper/50" : "text-forest/70")} aria-hidden="true" />
            </div>
            <h3 className={"font-display text-[1.55rem] font-extrabold uppercase leading-none " + (dark ? "text-paper" : "text-ink")}>
              {title}
            </h3>
            <p className={"text-sm leading-relaxed " + (dark ? "text-paper/65" : "text-muted-foreground")}>{text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
