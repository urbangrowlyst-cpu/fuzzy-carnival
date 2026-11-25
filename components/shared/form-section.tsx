import { Phone } from "lucide-react"
import { siteConfig } from "@/src/config/site"
import { DemoForm } from "@/components/forms/demo-form"
import { Eyebrow } from "./section-heading"
import { Reveal } from "./reveal"

const points = ["A free 20-minute call, no obligation", "See both tools working for your business", "Help choosing the right plan"]

export function FormSection({
  title = "Let's put it on your counter.",
  description = "Book your free demo. We'll show you exactly how Urban Growlyst brings you more customers from Google and keeps them coming back.",
  headingLevel = "h2",
}: {
  title?: string
  description?: string
  headingLevel?: "h1" | "h2"
}) {
  const Heading = headingLevel
  return (
    <section id="demo-form" className="border-b-2 border-ink bg-forest text-paper">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col justify-center gap-6">
          <Reveal>
            <Eyebrow tone="light">Book a slot</Eyebrow>
            <Heading className="display-tight mt-4 text-balance text-[clamp(2.8rem,5.5vw,4.6rem)]">
              {title}
            </Heading>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md text-pretty leading-relaxed text-paper/72">{description}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-paper/80">
                  <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-marigold" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.14}>
            <a
              href={`tel:${siteConfig.phoneLink}`}
              className="inline-flex w-fit items-center gap-2 border-b border-marigold/60 pb-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-marigold transition-colors hover:border-marigold hover:text-paper"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              Prefer to call? {siteConfig.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="border-2 border-ink bg-paper-light p-5 text-ink shadow-[8px_8px_0_var(--marigold)] sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4 border-b-2 border-ink pb-3">
              <p className="font-display text-2xl font-extrabold uppercase leading-none">Demo request</p>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45">We call you</span>
            </div>
            <DemoForm variant="full" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
