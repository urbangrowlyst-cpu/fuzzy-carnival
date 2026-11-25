import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { useCases } from "@/src/config/content"
import { Container, PageHeader } from "@/components/shared/section-heading"
import { UseCaseTabs } from "@/components/use-cases/use-case-tabs"
import { CtaBanner } from "@/components/shared/cta-banner"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"

export const metadata = createMetadata({
  title: "Use Cases",
  description:
    "See how cafés, salons, gyms, restaurants and clinics use Urban Growlyst for more Google reviews and repeat customers, with example loyalty offers and AI reviews.",
  path: "/use-cases",
})

export default function UseCasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Use cases"
        index="06"
        title={
          <>
            Different counters.
            <br />
            The same two tools.
          </>
        }
        description="A café, a salon, a gym, a restaurant, a clinic. The details change; the loop doesn't. Get found on Google, earn the review, give them a reason to come back."
        aside={
          <div className="mx-auto w-full max-w-[270px] rotate-[2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <div className="flex items-center justify-between border-b border-ink/20 pb-2">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">On the menu</p>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-tomato">05</p>
            </div>
            <ol className="mt-2">
              {useCases.map((u, i) => (
                <li
                  key={u.id}
                  className="flex items-baseline justify-between gap-3 border-b border-ink/10 py-1.5 last:border-b-0"
                >
                  <span className="font-mono text-[0.55rem] text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-sans text-sm font-semibold text-ink/85">{u.label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 border-t border-ink/20 pt-2 font-mono text-[0.5rem] uppercase leading-relaxed tracking-[0.08em] text-ink/40">
              Example offers and reviews, not customer results.
            </p>
          </div>
        }
      >
        <DemoButton />
        <Link href="/pricing" className="btn-ghost border-paper/40 text-paper hover:text-marigold">
          See the price list
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageHeader>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-3 border-b border-ink/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="label text-tomato">Pick your counter</p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Each tab shows an illustrative loyalty offer and the kind of review a happy customer could post.
            </p>
          </div>
          <Reveal className="mt-10">
            <UseCaseTabs />
          </Reveal>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper-deep py-14 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex flex-col gap-3">
            <p className="label text-forest">One code at the counter</p>
            <p className="max-w-2xl font-display text-3xl font-extrabold uppercase leading-[0.95] text-ink sm:text-4xl">
              The review slip and the stamp card live on the same QR code.
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Customers scan once. They can post a Google review and collect a loyalty stamp without downloading
              anything.
            </p>
          </div>
          <Link
            href="/how-it-works"
            className="group inline-flex w-fit items-center gap-3 border-2 border-ink bg-paper-light px-5 py-4 font-sans font-bold text-ink shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-px"
          >
            Follow the full loop
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Container>
      </section>

      <CtaBanner title="What would this look like at your shop?" />
    </>
  )
}
