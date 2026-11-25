import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Container, Eyebrow } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

const lines = [
  { name: "AI Review Page", note: "One-time · first branch", price: "₹4,999" },
  { name: "Digital Loyalty · 6 months", note: "About ₹583 / month", price: "₹3,499" },
  { name: "Digital Loyalty · 12 months", note: "About ₹500 / month", price: "₹5,999", best: true },
]

export function PricingTeaser() {
  return (
    <section className="border-b-2 border-ink bg-paper-deep py-20 sm:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <Reveal>
            <Eyebrow>The price list</Eyebrow>
            <h2 className="display-tight mt-4 text-balance text-[clamp(2.6rem,6vw,4.8rem)]">
              No retainer.
              <br />
              <span className="text-tomato">No surprises.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md leading-relaxed text-muted-foreground lg:ml-auto">
              Pay once for the review page. Add the loyalty programme for six or twelve months. Every price is per
              branch, in rupees.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl border-2 border-ink bg-paper-light shadow-[9px_9px_0_rgba(28,25,19,0.18)]">
            <div className="flex flex-col gap-2 border-b-2 border-ink px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="label text-ink/55">Urban Growlyst · Price list</p>
              <p className="label text-ink/55">Per branch · INR</p>
            </div>

            <div className="px-5 py-2 sm:px-7">
              {lines.map((line) => (
                <div
                  key={line.name}
                  className="flex items-end gap-3 border-b border-ink/20 py-5 last:border-b-0 sm:gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-[1.45rem] font-extrabold uppercase leading-none text-ink sm:text-[1.7rem]">
                        {line.name}
                      </h3>
                      {line.best && <span className="stamp text-tomato-dark">Best value</span>}
                    </div>
                    <p className="mt-1.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink/45">{line.note}</p>
                  </div>
                  <span className="mb-1 hidden flex-1 border-b border-dotted border-ink/35 sm:block" aria-hidden="true" />
                  <p className="shrink-0 font-display text-[2.2rem] font-extrabold leading-none text-ink sm:text-[2.6rem]">
                    {line.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 border-t border-ink/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.08em] text-ink/50">
                Extra branches ₹2,000 one-time each · Prices exclusive of GST
              </p>
              <span className="label rotate-[-2deg] text-tomato-dark">Set up for you</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/pricing" className="btn-primary">
            See full pricing
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link href="/book-a-demo#demo-form" className="btn-ghost text-ink hover:text-tomato">
            Or book a free demo
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
