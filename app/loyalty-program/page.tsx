import { BarChart3, Coffee, Database, Gift, Percent, QrCode, Repeat, Scissors, Smartphone, Stamp, Timer, Trash2, Users, Dumbbell, IceCream } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { Container, Eyebrow, PageHeader, SectionHeading } from "@/components/shared/section-heading"
import { StampCardDemo } from "@/components/loyalty/stamp-card-demo"
import { BenefitGrid } from "@/components/shared/benefit-grid"
import { CtaBanner } from "@/components/shared/cta-banner"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"

export const metadata = createMetadata({
  title: "Digital Loyalty Program",
  description:
    "A digital stamp card that breaks your customers' habit of visiting competitors. No app download, no paper cards. Set any reward and get more repeat visits.",
  path: "/loyalty-program",
})

const offers = [
  { Icon: Coffee, text: "Visit 4 times, get a free coffee" },
  { Icon: Scissors, text: "6th haircut free" },
  { Icon: Dumbbell, text: "Free personal training session" },
  { Icon: Percent, text: "20% off on your 5th visit" },
  { Icon: IceCream, text: "Free dessert after 3 meals" },
]

const flow = [
  { Icon: QrCode, title: "Scan the code", text: "The customer scans the QR code at your counter." },
  { Icon: Smartphone, title: "Open the card", text: "A stamp card opens in their phone. No app download." },
  { Icon: Stamp, title: "Collect a stamp", text: "Every visit adds a stamp, automatically." },
  { Icon: Gift, title: "Claim the reward", text: "When the card is full, they enjoy their reward." },
]

const benefits = [
  { Icon: Trash2, title: "No paper cards", text: "Nothing to print, lose or forget. The card lives in your customer's phone." },
  { Icon: Repeat, title: "More repeat visits", text: "A reward they're close to unlocking brings them back to you, not the competitor." },
  {
    Icon: Database,
    title: "Your customer data",
    text: "See names, phone numbers and visit history in your dashboard, and use it for personal marketing with customers who opt in.",
  },
  { Icon: Timer, title: "Setup in minutes", text: "We set it up for you. Pick your offer and you're ready the same day." },
]

const dashboardRows = [
  { Icon: Users, title: "Customers", text: "Names, phone numbers and visit history, in one place." },
  { Icon: BarChart3, title: "Repeat visits", text: "See how many regulars are close to earning a reward." },
  { Icon: Gift, title: "Rewards", text: "Know what has been redeemed, and when." },
]

export default function LoyaltyProgramPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool 02 · Loyalty card"
        index="04"
        title={
          <>
            Give them one good
            <br />
            reason to come back.
          </>
        }
        description="A digital stamp card that breaks the habit of visiting competitors and makes your business the easier choice. One QR code, no app, a reward they'll actually want."
        aside={
          <div className="mx-auto w-full max-w-[260px] rotate-[-2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">The short version</p>
            <p className="mt-2 font-display text-[2.6rem] font-extrabold uppercase leading-none text-forest">0 apps</p>
            <p className="mt-1 font-sans text-sm leading-snug text-ink/70">for your customers to download.</p>
            <div className="mt-4 flex items-center gap-1.5 border-t border-ink/20 pt-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={
                    "flex size-7 items-center justify-center rounded-full border-2 " +
                    (i < 3 ? "border-forest bg-forest text-paper" : "border-dashed border-ink/30")
                  }
                >
                  {i < 3 && <Coffee className="size-3" aria-hidden="true" />}
                </span>
              ))}
            </div>
          </div>
        }
      >
        <DemoButton />
      </PageHeader>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Your offer, your rules"
              title="Set any reward that suits your business."
              description="You decide how many visits and what the reward is. Change it any time, for example for festive seasons."
            />
            <Reveal>
              <ul className="border-t border-ink/20">
                {offers.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 border-b border-ink/20 py-3.5">
                    <Icon className="size-4 text-tomato" aria-hidden="true" />
                    <span className="text-sm text-ink/80">{text}</span>
                    <span className="ml-auto font-mono text-[0.5rem] uppercase tracking-[0.1em] text-ink/35">Example</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <StampCardDemo />
          </Reveal>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-forest py-16 text-paper sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 border-b border-paper/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow tone="light">How it works</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.4rem,4.5vw,3.8rem)]">
                Simple for them.
                <br />
                Simple for you.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-paper/65">
              The whole loyalty programme lives on one QR code at your counter. No cards to print, no app to explain.
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {flow.map(({ Icon, title, text }, i) => (
              <li
                key={title}
                className={
                  "flex flex-col gap-3 border-b border-paper/20 py-7 sm:px-6 lg:border-b-0 " +
                  (i > 0 ? "lg:border-l lg:border-paper/20 " : "") +
                  (i % 2 === 1 ? "sm:border-l sm:border-paper/20 " : "") +
                  (i === 0 ? "sm:pl-0 " : "") +
                  (i === flow.length - 1 ? "sm:pr-0" : "")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-marigold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-5 text-paper/45" aria-hidden="true" />
                </div>
                <h3 className="font-display text-[1.6rem] font-extrabold uppercase leading-none text-paper">{title}</h3>
                <p className="text-sm leading-relaxed text-paper/65">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div className="border-2 border-ink bg-paper-light text-ink shadow-[9px_9px_0_var(--forest)]">
              <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
                <p className="font-display text-lg font-extrabold uppercase leading-none">Owner dashboard</p>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink/40">Example view</span>
              </div>
              <div className="flex items-center justify-between border-b border-ink/15 px-5 py-2.5">
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45">Brew &amp; Bean · Bandra</p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-forest">This month</p>
              </div>
              {dashboardRows.map(({ Icon, title, text }, i) => (
                <div
                  key={title}
                  className={
                    "grid grid-cols-[2rem_1fr] items-start gap-3 px-5 py-5 " +
                    (i < dashboardRows.length - 1 ? "border-b border-ink/15" : "")
                  }
                >
                  <Icon className="mt-0.5 size-4 text-tomato" aria-hidden="true" />
                  <div>
                    <p className="font-sans text-sm font-bold">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-ink/15 px-5 py-3">
                <p className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-ink/35">
                  Your data · Your marketing · Opted-in customers only
                </p>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="The owner's side"
              title="See your regulars add up."
              description="Track everything in one simple dashboard, on your phone or computer. No spreadsheets, no training."
            />
            <Reveal delay={0.06}>
              <ul className="border-t border-ink/20">
                {[
                  "See who visited and how often",
                  "Know who is one stamp from a reward",
                  "Export customer details for your own offers",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 border-b border-ink/20 py-3 text-sm text-ink/75">
                    <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-tomato" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="border-l-2 border-forest pl-3 text-sm leading-relaxed text-muted-foreground">
                Customer data is only used for marketing when the customer has opted in.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper-deep py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Why owners use it" title="A small habit with a long tail." />
          <div className="mt-10">
            <BenefitGrid items={benefits} />
          </div>
          <Reveal className="mt-12">
            <DemoButton size="lg" />
          </Reveal>
        </Container>
      </section>

      <CtaBanner title="Ready to turn visitors into regulars?" />
    </>
  )
}
