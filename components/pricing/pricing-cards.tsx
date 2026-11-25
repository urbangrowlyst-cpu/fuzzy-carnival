import { Check, Info, Sparkles } from "lucide-react"
import { perBranchNote, planFeatures, pricingPlans } from "@/src/config/pricing"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"
import { cn } from "@/lib/utils"

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {pricingPlans.map((plan, i) => (
        <Reveal key={plan.id} delay={i * 0.1}>
          <article
            className={cn(
              "card-glow relative flex h-full flex-col gap-6 rounded-2xl p-7 sm:p-8",
              plan.highlight
                ? "bg-indigo-deep text-white shadow-2xl shadow-brand/30 ring-2 ring-brand-light"
                : "border border-border bg-white shadow-lg shadow-brand/5",
            )}
          >
            {plan.badge && (
              <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-gradient px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <Sparkles className="size-3.5" aria-hidden="true" />
                {plan.badge}
              </span>
            )}
            <div className="flex flex-col gap-2">
              <h3 className={cn("font-heading text-xl font-bold", plan.highlight ? "text-white" : "text-indigo-deep")}>
                {plan.name}
              </h3>
              <p className="flex items-baseline gap-2">
                <span className={cn("font-heading text-5xl font-extrabold", plan.highlight ? "text-white" : "text-indigo-deep")}>
                  {plan.price}
                </span>
                <span className={plan.highlight ? "text-white/70" : "text-muted-foreground"}>{plan.duration}</span>
              </p>
              <p className={cn("text-sm font-medium", plan.highlight ? "text-brand-light" : "text-brand-dark")}>
                {plan.perMonth}
              </p>
              {plan.savingsNote && (
                <span className="mt-1 w-fit rounded-full bg-brand-light/20 px-3 py-1 text-sm font-semibold text-brand-light">
                  {plan.savingsNote}
                </span>
              )}
            </div>

            {!compact && (
              <ul className="flex flex-col gap-3">
                {planFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-full",
                        plan.highlight ? "bg-brand text-white" : "bg-accent text-brand-dark",
                      )}
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className={plan.highlight ? "text-white/90" : "text-indigo-deep"}>{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {compact && (
              <p className={cn("text-sm", plan.highlight ? "text-white/80" : "text-muted-foreground")}>{planFeatures[0]}</p>
            )}

            <div className="mt-auto flex flex-col gap-4">
              <p
                className={cn(
                  "flex gap-2 rounded-xl p-3 text-xs leading-relaxed",
                  plan.highlight ? "bg-white/10 text-white/80" : "bg-lavender text-indigo-deep/80",
                )}
              >
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {perBranchNote}
              </p>
              <DemoButton className="w-full" variant={plan.highlight ? "gradient" : "gradient"} />
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}
