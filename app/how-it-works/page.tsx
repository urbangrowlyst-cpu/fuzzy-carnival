import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { Container, PageHeader } from "@/components/shared/section-heading"
import { Timeline } from "@/components/how-it-works/timeline"
import { CtaBanner } from "@/components/shared/cta-banner"
import { Reveal } from "@/components/shared/reveal"
import { DemoButton } from "@/components/shared/demo-button"

export const metadata = createMetadata({
  title: "How It Works",
  description:
    "See the full customer journey with Urban Growlyst: get found on Google, build trust with reviews, and turn first visits into loyal repeat customers.",
  path: "/how-it-works",
})

const toolLinks = [
  {
    label: "The Review Tool",
    text: "Turn happy customers into Google reviews, in about 30 seconds.",
    href: "/ai-review-tool",
    tone: "forest",
  },
  {
    label: "The Loyalty Card",
    text: "Give every visitor a simple reason to come back.",
    href: "/loyalty-program",
    tone: "tomato",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        index="02"
        title={
          <>
            From a Google search
            <br />
            to a regular at the counter.
          </>
        }
        description="Two tools work together. The first brings new customers in from Google. The second keeps them coming back."
      >
        <DemoButton />
      </PageHeader>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-3 border-b border-ink/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="label text-tomato">The five-step route</p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Follow one customer from a local search to their fifth visit. Both tools sit on the same QR code at your
              counter.
            </p>
          </div>
          <div className="mt-10">
            <Timeline />
          </div>
          <Reveal className="mt-14 grid gap-4 sm:grid-cols-2">
            {toolLinks.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={
                  "group flex items-start justify-between gap-6 border-2 border-ink p-6 transition-transform hover:-translate-y-0.5 " +
                  (t.tone === "forest"
                    ? "bg-forest text-paper shadow-[5px_5px_0_var(--ink)]"
                    : "bg-tomato text-paper-light shadow-[5px_5px_0_var(--ink)]")
                }
              >
                <div className="flex flex-col gap-2">
                  <span className="font-display text-2xl font-extrabold uppercase leading-none">{t.label}</span>
                  <span className="max-w-xs text-sm leading-relaxed opacity-75">{t.text}</span>
                </div>
                <ArrowRight className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </Reveal>
        </Container>
      </section>

      <CtaBanner title="Want to see the whole loop on your own business?" />
    </>
  )
}
