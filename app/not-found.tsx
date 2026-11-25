import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Scissors } from "lucide-react"
import { Container } from "@/components/shared/section-heading"
import { DemoButton } from "@/components/shared/demo-button"

export const metadata: Metadata = {
  title: "Page not found",
  description: "Sorry, we couldn't find that page.",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
      <div className="pointer-events-none absolute inset-0 ledger-lines opacity-40" aria-hidden="true" />
      <Container className="relative grid min-h-[76vh] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="flex flex-col items-start gap-5">
          <p className="label text-tomato">Error 404 · Off the shelf</p>
          <p className="display-tight text-[clamp(7rem,19vw,13rem)] leading-[0.78] text-forest">404</p>
          <h1 className="max-w-lg text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] text-ink sm:text-5xl">
            This page took a different route.
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            The link is old, the page moved, or the address has a typo. Nothing is broken at the counter.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <Link href="/" className="btn-primary">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to the shopfront
            </Link>
            <DemoButton variant="ghost" label="Book a demo" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[360px] rotate-[2deg] border-2 border-ink bg-paper-light shadow-[9px_9px_0_var(--forest)]">
          <div className="flex items-center justify-between border-b-2 border-ink bg-forest px-5 py-3 text-paper">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-paper/70">Urban Growlyst</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-marigold">Sheet 404</p>
          </div>
          <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
            <span className="stamp rotate-[-4deg] border-tomato px-4 py-2 text-[0.8rem] text-tomato">No such page</span>
            <Scissors className="size-8 text-ink/30" aria-hidden="true" />
            <p className="font-display text-3xl font-extrabold uppercase leading-none text-ink">
              Nothing on this shelf.
            </p>
            <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">
              Try the main counter. Everything we do is two clicks from there.
            </p>
          </div>
          <div className="mx-5 border-t border-dashed border-ink/30" aria-hidden="true" />
          <div className="grid grid-cols-2 text-center">
            <Link href="/" className="border-r border-ink/15 px-3 py-4 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink/70 transition-colors hover:bg-paper hover:text-tomato-dark">
              The shop
            </Link>
            <Link href="/pricing" className="px-3 py-4 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink/70 transition-colors hover:bg-paper hover:text-tomato-dark">
              Price list
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
