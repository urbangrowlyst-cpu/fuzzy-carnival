import { DemoButton } from "./demo-button"
import { Reveal } from "./reveal"

export function CtaBanner({
  title = "Ready to grow and keep your customers?",
  description = "See both tools live in a free 20-minute demo. No tech skills needed, no obligation.",
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="bg-paper px-5 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="relative mx-auto max-w-[1180px] overflow-hidden border-2 border-ink bg-tomato text-paper-light shadow-[9px_9px_0_var(--ink)]">
          <div className="pointer-events-none absolute inset-0 ledger-dots opacity-[0.12]" aria-hidden="true" />
          <div className="relative grid gap-8 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="label text-paper-light/65">One counter · Two tools</p>
              <h2 className="display-tight mt-4 max-w-2xl text-balance text-[clamp(2.6rem,5.5vw,4.5rem)]">{title}</h2>
            </div>
            <div className="flex flex-col items-start gap-5 lg:pl-6">
              <p className="max-w-md text-pretty leading-relaxed text-paper-light/80">{description}</p>
              <DemoButton variant="light" size="lg" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
