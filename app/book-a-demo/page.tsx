import { Clock, Mail, Phone } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/src/config/site"
import { Container, Eyebrow, PageHeader } from "@/components/shared/section-heading"
import { DemoForm } from "@/components/forms/demo-form"
import { Reveal } from "@/components/shared/reveal"

export const metadata = createMetadata({
  title: "Book a Free Demo",
  description:
    "Book a free, no-obligation demo of Urban Growlyst. We'll call you within 24 hours, show you both tools and help you pick the right plan.",
  path: "/book-a-demo",
})

const next = [
  { title: "We call you within 24 hours", text: "A friendly call at a time that suits you." },
  { title: "We show you both tools", text: "The review page and the stamp card, on your own business." },
  { title: "You pick a plan, or don't", text: "No pressure. Honest advice, and time to think it over." },
]

const reassurances = [
  "A free 20-minute call, no obligation",
  "No tech skills needed",
  "No app for you or your customers",
]

export default function BookDemoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Book a demo"
        index="08"
        title={
          <>
            Twenty minutes.
            <br />
            Your shop, on screen.
          </>
        }
        description="Fill in the form and we'll call you within 24 hours to find a time. We'll show you both tools working for a business like yours, then you can decide."
        aside={
          <div className="mx-auto w-full max-w-[270px] rotate-[2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <p className="border-b border-ink/20 pb-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">
              What happens next
            </p>
            <ol className="mt-1">
              {next.map((step, i) => (
                <li key={step.title} className="flex gap-3 border-b border-ink/10 py-2 last:border-b-0">
                  <span className="mt-0.5 font-mono text-[0.58rem] font-semibold text-tomato">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[0.82rem] leading-snug text-ink/80">{step.title}</span>
                </li>
              ))}
            </ol>
            <a
              href={`tel:${siteConfig.phoneLink}`}
              className="mt-3 inline-flex items-center gap-2 border-t border-ink/20 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.08em] text-forest transition-colors hover:text-tomato-dark"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              Or call {siteConfig.phoneDisplay}
            </a>
          </div>
        }
      >
        <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-paper/65">
          <Clock className="size-3.5 text-marigold" aria-hidden="true" />
          Takes less than a minute
        </span>
      </PageHeader>

      <section id="demo-form" className="scroll-mt-8 border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <div>
              <Eyebrow>Demo request</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.7rem,5vw,4.3rem)]">
                Tell us about
                <br />
                your shop.
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              A few details so we can come to the call prepared, with examples that fit your kind of business.
            </p>
            <ul className="border-t border-ink/20">
              {reassurances.map((line) => (
                <li key={line} className="flex items-start gap-2.5 border-b border-ink/20 py-3 text-sm text-ink/75">
                  <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-tomato" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${siteConfig.phoneLink}`}
                className="inline-flex items-center gap-2.5 font-sans font-bold text-ink transition-colors hover:text-tomato-dark"
              >
                <Phone className="size-4 text-tomato" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-ink"
              >
                <Mail className="size-4 text-tomato" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </div>
          </div>

          <Reveal delay={0.08}>
            <div id="booking-slip" className="scroll-mt-8 border-2 border-ink bg-paper-light shadow-[8px_8px_0_var(--forest)]">
              <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-5 py-3.5 sm:px-7">
                <p className="font-display text-2xl font-extrabold uppercase leading-none text-ink">Booking slip</p>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45">We call you</span>
              </div>
              <div className="p-5 sm:p-7">
                <DemoForm variant="full" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-forest py-12 text-paper sm:py-14">
        <Container className="grid gap-8 md:grid-cols-3">
          {next.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-2 border-t border-paper/25 pt-4">
                <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-marigold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-extrabold uppercase leading-none text-paper">{step.title}</h3>
                <p className="text-sm leading-relaxed text-paper/65">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  )
}
