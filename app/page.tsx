import Link from "next/link"
import { ArrowRight, Check, Coffee, Gift, Phone, QrCode, Search, Star } from "lucide-react"
import { siteConfig } from "@/src/config/site"
import { Container, Eyebrow } from "@/components/shared/section-heading"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"

const dots = {
  backgroundImage: "radial-gradient(rgba(243, 236, 224, 0.14) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
}

const tools = [
  {
    tag: "01 · Win new customers",
    title: "AI review page",
    shadow: "shadow-[8px_8px_0_var(--marigold)]",
    points: [
      "A review page made for your business",
      "AI helps your customers put their experience into words",
      "Replies to your Google reviews are AI-written and posted automatically",
    ],
    price: "One-time price per branch",
    href: "/ai-review-tool",
    cta: "See the AI review tool",
  },
  {
    tag: "02 · Keep them coming back",
    title: "Loyalty program",
    shadow: "shadow-[8px_8px_0_var(--forest)]",
    points: [
      "A digital stamp card on your customer's phone, with no app to download",
      "Your customers' names, numbers and visit history in your dashboard",
      "Use that data for your own offers, sent to customers who opt in",
    ],
    price: "6-month or 12-month plans, per branch",
    href: "/loyalty-program",
    cta: "See the loyalty program",
  },
]

const steps = [
  {
    title: "We set it up for you",
    text: "Tell us about your business. We build your review page and your stamp card. No tech skills needed.",
  },
  {
    title: "Customers use it at the counter",
    text: "They open your review page to share their experience, and collect stamps on their phone.",
  },
  {
    title: "You keep growing",
    text: "Replies go out automatically, and your customer list builds up in your dashboard.",
  },
]

const prices = [
  { name: "AI review page", note: "One-time, for your first branch. Extra branches are ₹2,000 each.", price: "₹4,999" },
  { name: "Loyalty program, 6 months", note: "Per branch", price: "₹3,499" },
  { name: "Loyalty program, 12 months", note: "Per branch. Saves ₹999 compared with two 6-month plans.", price: "₹5,999" },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-ink bg-forest text-paper" style={dots}>
        <Container className="grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-24">
          <div>
            <p className="inline-block -rotate-[1.5deg] border-2 border-marigold px-3 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-marigold sm:text-xs">
              From Google search to loyal customer.
            </p>
            <h1 className="mt-7 font-display text-[clamp(3.2rem,9.5vw,7.4rem)] font-extrabold uppercase leading-[0.9] text-paper">
              Your next
              <br />
              regular
              <br />
              is already
              <br />
              <span className="text-marigold">searching.</span>
            </h1>
            <p className="mt-8 max-w-xl border-l-[3px] border-paper/30 pl-5 text-lg leading-relaxed text-paper/80">
              Get found on Google, trusted in the reviews, and remembered at the counter. Two simple tools for local
              businesses, set up for you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <DemoButton
                size="lg"
                label="Book a Free Demo"
                className="shadow-[4px_4px_0_var(--marigold)] hover:shadow-[5px_5px_0_var(--marigold)]"
              />
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 border-b-2 border-paper pb-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-marigold hover:text-marigold"
              >
                See how it works
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-7 flex items-center gap-2.5 text-sm text-paper/75">
              <span className="flex size-5 items-center justify-center bg-tomato text-paper-light">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              Free 20-minute demo. No obligation.
            </p>
          </div>

          {/* Example cards */}
          <div className="mx-auto flex w-full max-w-md flex-col gap-5 lg:max-w-none">
            <div className="rotate-[1.5deg] border-2 border-ink bg-paper-light p-4 text-ink shadow-[6px_6px_0_rgba(0,0,0,0.35)] lg:ml-10">
              <div className="flex items-center justify-between gap-3 border-b border-ink/20 pb-2.5">
                <span className="flex items-center gap-2 font-mono text-sm text-ink/70">
                  <Search className="size-4" aria-hidden="true" />
                  best café near me
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-tomato">Example search</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-extrabold uppercase leading-none">Brew &amp; Bean Café</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-ink/65">
                    <Star className="size-3.5 fill-marigold text-marigold" aria-hidden="true" />
                    4.9 · 412 reviews · Bandra
                  </p>
                </div>
                <span className="border border-forest px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-forest">
                  Open
                </span>
              </div>
            </div>

            <div className="-rotate-[2deg] border-2 border-ink bg-paper-light p-4 text-ink shadow-[6px_6px_0_rgba(0,0,0,0.35)] lg:mr-6">
              <div className="flex items-center justify-between border-b border-ink/20 pb-2 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45">
                <span>Example review</span>
                <span>Google</span>
              </div>
              <div className="mt-3 flex gap-0.5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-marigold text-marigold" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                &ldquo;Best cappuccino in Bandra. Cosy, quick and the staff remember your order.&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/45">
                <span>Example · 2 days ago</span>
                <span className="flex items-center gap-1 border border-forest px-1.5 py-0.5 text-forest">
                  <Check className="size-3" aria-hidden="true" />
                  Posted
                </span>
              </div>
            </div>

            <div className="relative rotate-[1deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[6px_6px_0_rgba(0,0,0,0.35)] lg:ml-4">
              <span className="absolute -top-3 right-4 rotate-[4deg] border border-tomato bg-paper-light px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-[0.12em] text-tomato">
                Example
              </span>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">Digital stamp card</p>
                  <p className="mt-1 font-display text-3xl font-extrabold uppercase leading-none">Brew &amp; Bean</p>
                  <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-tomato">
                    Bandra West · Est. 2019
                  </p>
                </div>
                <QrCode className="size-12 shrink-0 text-ink" aria-hidden="true" />
              </div>
              <div className="mt-4 flex items-center gap-3 border-t-2 border-ink pt-4">
                {[0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className="flex size-11 items-center justify-center rounded-full bg-forest text-paper"
                    aria-hidden="true"
                  >
                    <Coffee className="size-5" />
                  </span>
                ))}
                <span
                  className="flex size-11 items-center justify-center rounded-full border-2 border-dashed border-tomato text-tomato"
                  aria-hidden="true"
                >
                  <Gift className="size-5" />
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-ink/20 pt-3">
                <p className="text-sm font-semibold">One more coffee, then one on us.</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/45">Visit 4 times · 5th free</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TWO TOOLS */}
      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Two simple tools</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[clamp(2.6rem,5vw,4.3rem)] font-extrabold uppercase leading-[0.92] text-ink">
              One platform for the whole journey.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Win new customers. Keep them coming back. We set both tools up for you, so there is nothing for you to
              build.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {tools.map((tool, i) => (
              <Reveal key={tool.title} delay={i * 0.08}>
                <div className={`flex h-full flex-col border-2 border-ink bg-paper-light p-6 sm:p-8 ${tool.shadow}`}>
                  <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-tomato">{tool.tag}</p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none text-ink">{tool.title}</h3>
                  <ul className="mt-6 border-t border-ink/20">
                    {tool.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 border-b border-ink/20 py-3 text-sm text-ink/80">
                        <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-tomato" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink/55">{tool.price}</p>
                  <Link
                    href={tool.href}
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-sm font-bold text-ink transition-colors hover:text-tomato-dark"
                  >
                    {tool.cta}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b-2 border-ink bg-forest py-16 text-paper sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl text-balance font-display text-[clamp(2.4rem,4.6vw,3.8rem)] font-extrabold uppercase leading-[0.92] text-paper">
              Simple for you.
              <br />
              Simple for them.
            </h2>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 border-b-2 border-paper pb-1 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:border-marigold hover:text-marigold"
            >
              How it works
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-2 border-t border-paper/25 pt-4">
                  <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-marigold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold uppercase leading-none text-paper">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-paper/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICES */}
      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4 text-balance font-display text-[clamp(2.6rem,5vw,4.3rem)] font-extrabold uppercase leading-[0.92] text-ink">
              Both tools. Simple prices.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Pay once for your review page. Pick a 6-month or 12-month plan for loyalty. Prices exclude GST, where
              applicable.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-bold text-ink transition-colors hover:text-tomato-dark"
            >
              See full pricing
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <Reveal delay={0.08}>
            <ul className="border-2 border-ink bg-paper-light shadow-[8px_8px_0_var(--forest)]">
              {prices.map((row) => (
                <li
                  key={row.name}
                  className="flex items-center justify-between gap-6 border-b border-ink/20 px-5 py-5 last:border-b-0 sm:px-7"
                >
                  <div>
                    <p className="font-display text-xl font-extrabold uppercase leading-none text-ink sm:text-2xl">
                      {row.name}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{row.note}</p>
                  </div>
                  <p className="font-display text-3xl font-extrabold leading-none text-tomato sm:text-4xl">{row.price}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="border-b-2 border-ink bg-marigold py-14 text-ink sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-balance font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold uppercase leading-[0.92] text-ink">
            Ready to grow and keep your customers?
          </h2>
          <div className="flex flex-col items-start gap-4">
            <DemoButton size="lg" label="Book a Free Demo" />
            <a
              href={`tel:${siteConfig.phoneLink}`}
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:text-tomato-dark"
            >
              <Phone className="size-4" aria-hidden="true" />
              Or call {siteConfig.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
