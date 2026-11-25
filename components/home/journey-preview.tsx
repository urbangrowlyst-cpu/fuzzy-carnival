import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { journeySteps } from "@/src/config/content"
import { Container, Eyebrow } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

export function JourneyPreview() {
  return (
    <section className="border-b-2 border-ink bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>The loop</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
                Five small moves.
                <br />
                <span className="text-tomato">One regular customer.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
                Most marketing stops when the customer walks in. Ours starts there. One tool brings people through the
                door; the other gives them a reason to come back.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="border-t-2 border-ink pt-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="label flex items-center gap-2 text-ink/60">
                  <span className="size-2 bg-forest" aria-hidden="true" />
                  Review tool
                </span>
                <span className="label flex items-center gap-2 text-ink/60">
                  <span className="size-2 bg-tomato" aria-hidden="true" />
                  Loyalty card
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <Link href="/how-it-works" className="btn-ghost w-fit text-ink hover:text-tomato">
                See the full journey
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>

          <ol className="border-t border-ink/20">
            {journeySteps.map((step, i) => {
              const growth = step.tool === "growth"
              return (
                <li key={step.title} className="border-b border-ink/20">
                  <Reveal delay={i * 0.04}>
                    <div className="group grid grid-cols-[3.2rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr_7.5rem] sm:items-start sm:gap-6 sm:py-7">
                      <span
                        className={
                          "flex size-11 items-center justify-center border-2 font-mono text-sm font-semibold sm:size-12 " +
                          (growth ? "border-forest bg-forest text-paper" : "border-tomato bg-paper text-tomato-dark")
                        }
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-[1.75rem] font-extrabold uppercase leading-none text-ink transition-colors group-hover:text-tomato-dark sm:text-[2rem]">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                          {step.text}
                        </p>
                      </div>
                      <span
                        className={
                          "col-start-2 mt-1 w-fit border-b pb-0.5 font-mono text-[0.58rem] uppercase tracking-[0.13em] sm:col-start-3 sm:justify-self-end " +
                          (growth ? "border-forest/40 text-forest" : "border-tomato/40 text-tomato-dark")
                        }
                      >
                        {growth ? "Review tool" : "Loyalty card"}
                      </span>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
