import { ArrowRight, Check, Info } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/src/config/site"
import { Container, Eyebrow, PageHeader, SectionHeading } from "@/components/shared/section-heading"
import { CtaBanner } from "@/components/shared/cta-banner"
import { Reveal } from "@/components/shared/reveal"
import { DemoButton } from "@/components/shared/demo-button"
import Link from "next/link"

const reviewPagePrice = 4999
const extraBranchPrice = 2000
const loyalty6Price = 3499
const loyalty12Price = 5999

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`
const perMonth = (price: number, months: number) => `about ${rupees(Math.round(price / months))}/month`
const savings = loyalty6Price * 2 - loyalty12Price

const contactUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  "Hi Urban Growlyst! I'd like to know more about your pricing.",
)}`

const reviewFeatures = [
  "Custom AI review page built for your business",
  "AI-assisted review writing for your customers",
  "Your own QR code",
  "Set up and hosted for you",
  "Pay once, no monthly fee",
]

const loyaltyFeatures = [
  "Digital stamp cards, no app download",
  "Your own QR code",
  "Owner dashboard",
  "Customer data for your own marketing",
]

const branchSteps = [
  {
    title: "Set up your first branch",
    text: `Get your AI review page for ${rupees(reviewPagePrice)}. Add the loyalty programme on a 6 or 12 month plan if you want it.`,
  },
  {
    title: "Add each extra branch",
    text: `Every extra branch's AI review page costs ${rupees(extraBranchPrice)} more, with its own QR code.`,
  },
  {
    title: "Keep loyalty per branch",
    text: "Each branch you add to the loyalty programme gets its own offer, QR code and dashboard.",
  },
]

export const metadata = createMetadata({
  title: "Pricing",
  description: `Simple pricing in INR. AI review page: ${rupees(reviewPagePrice)} one-time. Loyalty program: ${rupees(loyalty6Price)} for 6 months or ${rupees(loyalty12Price)} for 12 months. Price is per branch.`,
  path: "/pricing",
})

function FeatureList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className={"border-t " + (dark ? "border-paper/25" : "border-ink/20")}>
      {items.map((item) => (
        <li
          key={item}
          className={
            "flex items-start gap-3 border-b py-3 text-sm " +
            (dark ? "border-paper/20 text-paper/85" : "border-ink/20 text-ink/80")
          }
        >
          <Check className={"mt-0.5 size-4 shrink-0 " + (dark ? "text-marigold" : "text-forest")} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ContactLink({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={contactUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={
        "group inline-flex w-full items-center justify-center gap-2 border-2 px-5 py-3.5 font-sans font-bold transition-transform hover:-translate-y-px " +
        (dark
          ? "border-ink bg-paper text-ink shadow-[4px_4px_0_var(--marigold)]"
          : "border-ink bg-tomato text-paper-light shadow-[4px_4px_0_var(--ink)]")
      }
    >
      Contact us on WhatsApp
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  )
}

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        index="05"
        title={
          <>
            Everything,
            <br />
            priced in the open.
          </>
        }
        description="Pay once for your AI review page, and add the loyalty programme for six or twelve months. No quote needed, no retainer. Prices are per branch, in rupees."
        aside={
          <div className="mx-auto w-full max-w-[260px] rotate-[2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">The whole list</p>
            <p className="mt-2 font-display text-[2.6rem] font-extrabold uppercase leading-none text-forest">₹0</p>
            <p className="mt-1 font-sans text-sm leading-snug text-ink/70">for a quote or a sales call.</p>
            <p className="mt-4 border-t border-ink/20 pt-3 font-mono text-[0.52rem] uppercase leading-relaxed tracking-[0.1em] text-ink/45">
              Two tools · One counter
            </p>
          </div>
        }
      >
        <DemoButton />
        <Link href="/faq" className="btn-ghost border-paper/40 text-paper hover:text-marigold">
          Read the FAQ
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </PageHeader>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <div className="grid overflow-hidden border-2 border-ink bg-paper-light shadow-[8px_8px_0_var(--ink)] lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col gap-6 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-4">
                <div>
                  <Eyebrow>Tool 01 · One-time</Eyebrow>
                  <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-none sm:text-5xl">
                    AI Review Page
                  </h2>
                </div>
                <span className="stamp text-tomato">First branch</span>
              </div>
              <p className="max-w-lg leading-relaxed text-muted-foreground">
                A review page built for your business, with your QR code, set up and hosted for you. Your customers scan
                it, pick what they liked and post a natural Google review.
              </p>
              <FeatureList items={reviewFeatures} />
              <div className="flex items-start gap-2.5 border border-ink/20 bg-paper p-3.5 text-sm text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-tomato" aria-hidden="true" />
                <p>
                  Extra branches cost {rupees(extraBranchPrice)} each, one-time. Every branch gets its own page and QR
                  code.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 border-t-2 border-ink bg-forest p-6 text-paper sm:p-10 lg:border-l-2 lg:border-t-0">
              <div>
                <p className="label text-marigold">One-time price</p>
                <p className="mt-3 font-display text-[clamp(4.5rem,9vw,7rem)] font-extrabold leading-none">
                  {rupees(reviewPagePrice)}
                </p>
                <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-paper/55">
                  First branch · pay once
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ContactLink dark />
                <p className="font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.1em] text-paper/40">
                  Set up by us · Live the same day
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper-deep py-16 sm:py-24">
        <Container>
          <div className="grid gap-6 border-b-2 border-ink pb-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <Eyebrow>Tool 02 · Loyalty</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.6rem,5vw,4.2rem)]">
                Keep the regulars
                <br />
                coming back.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:ml-auto">
              Add the digital loyalty programme on a six or twelve month plan. Price is per branch. Cancel or change
              your offer any time.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal className="flex h-full flex-col border-2 border-ink bg-paper-light p-6 text-ink shadow-[6px_6px_0_var(--ink)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label text-forest">6 months</p>
                  <p className="mt-3 font-display text-[3.5rem] font-extrabold leading-none">{rupees(loyalty6Price)}</p>
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-ink/45">
                    {perMonth(loyalty6Price, 6)}
                  </p>
                </div>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/40">Per branch</span>
              </div>
              <div className="mt-6">
                <FeatureList items={loyaltyFeatures} />
              </div>
              <div className="mt-6">
                <ContactLink />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="relative flex h-full flex-col border-2 border-ink bg-forest p-6 text-paper shadow-[6px_6px_0_var(--tomato)] sm:p-8">
              <span className="stamp absolute -top-3 right-6 border-marigold bg-paper-light text-tomato">Best value</span>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label text-marigold">12 months</p>
                  <p className="mt-3 font-display text-[3.5rem] font-extrabold leading-none">{rupees(loyalty12Price)}</p>
                  <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-paper/50">
                    {perMonth(loyalty12Price, 12)}
                  </p>
                </div>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-paper/40">Per branch</span>
              </div>
              {savings > 0 && (
                <p className="mt-4 w-fit border border-paper/25 px-2.5 py-1.5 font-mono text-[0.55rem] uppercase tracking-[0.08em] text-marigold">
                  Save {rupees(savings)} vs two 6-month plans
                </p>
              )}
              <div className="mt-6">
                <FeatureList items={loyaltyFeatures} dark />
              </div>
              <div className="mt-6">
                <ContactLink dark />
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-center font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/45">
            Prices are exclusive of GST, where applicable.
          </p>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Multiple branches" title="One shop, two shops, five shops." />
          <ol className="mt-10 grid border-t-2 border-ink md:grid-cols-3">
            {branchSteps.map((s, i) => (
              <li
                key={s.title}
                className={
                  "flex flex-col gap-3 border-b border-ink/20 py-7 md:border-b-0 md:px-6 " +
                  (i > 0 ? "md:border-l md:border-ink/20 " : "md:pl-0") +
                  (i === branchSteps.length - 1 ? " md:pr-0" : "")
                }
              >
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-tomato">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <p className="text-sm text-muted-foreground">
              Not sure which one fits?{" "}
              <a
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-ink font-semibold text-ink hover:border-tomato hover:text-tomato"
              >
                Contact us
              </a>{" "}
              and we&apos;ll help you choose.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBanner title="Want to see it working before you decide?" />
    </>
  )
}
