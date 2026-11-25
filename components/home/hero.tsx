import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { siteConfig } from "@/src/config/site"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"
import { CounterVisual } from "./counter-visual"

const trades = ["Cafés", "Salons", "Gyms", "Clinics", "Restaurants", "Local shops"]

function TradeMarquee() {
  return (
    <div className="relative overflow-hidden border-t border-paper/20 py-3.5" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {trades.map((trade) => (
              <span key={`${copy}-${trade}`} className="flex items-center">
                <span className="label px-6 text-paper/55">{trade}</span>
                <span className="size-1.5 rotate-45 bg-tomato" />
              </span>
            ))}
            <span className="label px-6 text-marigold">Built for the counter</span>
            <span className="size-1.5 rotate-45 bg-marigold" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b-2 border-ink bg-forest text-paper">
      <div className="pointer-events-none absolute inset-0 ledger-dots opacity-[0.13]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-12 pb-12 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-16">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <span className="stamp text-marigold">{siteConfig.tagline}</span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="display-tight text-balance text-[clamp(3.2rem,7vw,5.9rem)] text-paper">
                Your next regular
                <br />
                is already
                <br />
                <span className="text-marigold">searching.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-lg text-pretty border-l-2 border-marigold/70 pl-4 text-[1.05rem] leading-relaxed text-paper/78">
                Get found on Google, trusted in the reviews, and remembered at the counter. Two simple tools for local
                businesses, set up for you.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1">
              <DemoButton className="shadow-[4px_4px_0_var(--marigold)] hover:shadow-[5px_5px_0_var(--marigold)]" />
              <Link href="/how-it-works" className="btn-ghost border-paper/45 text-paper hover:text-marigold">
                See how it works
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col gap-1.5 pt-2">
              <p className="flex items-center gap-2 text-sm font-medium text-paper/65">
                <span className="flex size-4 items-center justify-center bg-tomato text-paper">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                Free 20-minute demo. No obligation.
              </p>
              <p className="pl-6 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-paper/40">
                {siteConfig.trustLine}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18} className="lg:pl-2">
            <CounterVisual />
          </Reveal>
        </div>

        <TradeMarquee />
      </div>
    </section>
  )
}
