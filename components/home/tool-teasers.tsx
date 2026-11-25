import Link from "next/link"
import { ArrowRight, Check, Coffee, Gift, Star } from "lucide-react"
import { Container, Eyebrow } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

function ReviewExample() {
  return (
    <div className="relative border border-ink/30 bg-paper-light p-4 text-ink shadow-[5px_5px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-3 border-b border-ink/15 pb-2">
        <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">Customer review</span>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-tomato">Example</span>
      </div>
      <div className="mt-2.5 flex gap-0.5" aria-label="5 stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="size-3.5 fill-marigold text-marigold" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-2 text-[0.82rem] leading-snug text-ink/80">
        “Best salon in Andheri. Friendly stylists, a proper hair spa, and they actually listen.”
      </p>
      <p className="mt-3 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-ink/40">
        Drafted with AI · Posted by the customer
      </p>
    </div>
  )
}

function LoyaltyExample() {
  return (
    <div className="relative border border-ink/30 bg-paper-light p-4 text-ink shadow-[5px_5px_0_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-3 border-b border-ink/15 pb-2">
        <div>
          <p className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-ink/45">Digital stamp card</p>
          <p className="mt-0.5 font-display text-xl font-extrabold uppercase leading-none">Brew &amp; Bean</p>
        </div>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-tomato">Example</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5 py-3" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={
              "flex aspect-square items-center justify-center rounded-full border-2 " +
              (i < 3
                ? i % 2
                  ? "rotate-[4deg] border-forest bg-forest text-paper"
                  : "rotate-[-4deg] border-forest bg-forest text-paper"
                : i === 4
                  ? "border-dashed border-tomato text-tomato"
                  : "border-dashed border-ink/25 text-ink/25")
            }
          >
            {i < 3 ? (
              <Coffee className="size-3.5" aria-hidden="true" />
            ) : i === 4 ? (
              <Gift className="size-3.5" aria-hidden="true" />
            ) : (
              <span className="font-mono text-[0.5rem]">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
      <p className="border-t border-ink/15 pt-2 font-sans text-xs font-semibold text-ink/75">
        2 more visits for a free coffee
      </p>
    </div>
  )
}

const tools = [
  {
    tag: "Tool 01 · Customer growth",
    title: "The Review Tool",
    lead: "A five-star review, without the awkward ask.",
    href: "/ai-review-tool",
    benefits: ["Rank higher on Google Maps", "More 5-star reviews in less time", "AI replies to every review"],
    visual: <ReviewExample />,
  },
  {
    tag: "Tool 02 · Customer retention",
    title: "The Loyalty Card",
    lead: "A reason to choose you again, not the place down the road.",
    href: "/loyalty-program",
    benefits: ["Digital stamp cards, no app", "More repeat visits every month", "Your offer, your rules"],
    visual: <LoyaltyExample />,
  },
]

export function ToolTeasers() {
  return (
    <section className="border-b-2 border-ink bg-forest py-20 text-paper sm:py-28">
      <Container>
        <div className="grid gap-8 border-b border-paper/20 pb-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow tone="light">Two tools, one counter</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.6rem,6vw,4.8rem)]">
                One brings them in.
                <br />
                <span className="text-marigold">The other brings them back.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.06}>
            <p className="max-w-md text-pretty leading-relaxed text-paper/70 lg:ml-auto">
              A review is the first handshake. A stamp card is the second. Used together, they turn a one-time search
              into a regular who knows your name.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2">
          {tools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 0.08}>
              <article
                className={
                  "flex h-full flex-col gap-6 py-10 md:py-12 " +
                  (i === 0 ? "md:pr-12 md:border-r md:border-paper/20" : "border-t border-paper/20 md:border-t-0 md:pl-12")
                }
              >
                <div className="flex flex-col gap-3">
                  <span className="label text-marigold">{tool.tag}</span>
                  <h3 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">
                    {tool.title}
                  </h3>
                  <p className="max-w-sm text-lg leading-snug text-paper/80">{tool.lead}</p>
                </div>
                <div className="max-w-sm">{tool.visual}</div>
                <ul className="flex flex-col gap-2.5">
                  {tool.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-paper/75">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-marigold" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tool.href}
                  className="btn-ghost mt-auto w-fit border-paper/40 text-paper hover:text-marigold"
                >
                  Explore the {tool.title.replace("The ", "").toLowerCase()}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
