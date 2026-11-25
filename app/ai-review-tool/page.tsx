import { Clock, MapPin, MessageSquareReply, Star, TrendingUp } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { Container, Eyebrow, PageHeader, SectionHeading } from "@/components/shared/section-heading"
import { ReplyDemo, ReviewDemo } from "@/components/review-tool/review-demo"
import { BenefitGrid } from "@/components/shared/benefit-grid"
import { CtaBanner } from "@/components/shared/cta-banner"
import { DemoButton } from "@/components/shared/demo-button"
import { Reveal } from "@/components/shared/reveal"

export const metadata = createMetadata({
  title: "AI Google Review Tool",
  description:
    "Get more 5-star Google reviews with AI. Customers scan a QR code, pick what they liked and post a natural, keyword-rich review. Plus AI replies to every review.",
  path: "/ai-review-tool",
})

const commentPieces = [
  { label: "Business type", example: "café, salon, gym" },
  { label: "Service", example: "hair spa, cappuccino" },
  { label: "Location", example: "in Bandra, near Andheri" },
]

const benefits = [
  {
    Icon: TrendingUp,
    title: "Rank higher on Google",
    text: "Keyword-rich reviews help you climb Google Maps and local search results.",
  },
  {
    Icon: Star,
    title: "More reviews in less time",
    text: "Customers post a review in under 30 seconds, so many more actually do it.",
  },
  {
    Icon: MessageSquareReply,
    title: "Consistent, professional replies",
    text: "Every review gets a polite, on-brand reply written by AI.",
  },
  { Icon: Clock, title: "Saves hours every week", text: "No more chasing reviews or thinking of what to write back." },
]

const steps = [
  "The customer scans your QR code.",
  "They pick what they liked.",
  "A natural review is drafted for them.",
  "They edit it and post on Google.",
]

export default function AiReviewToolPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tool 01 · Review tool"
        index="03"
        title={
          <>
            More five-star reviews.
            <br />
            Less awkward asking.
          </>
        }
        description="Our AI Google Business Profile tool helps happy customers post natural, SEO-friendly reviews in seconds, and writes professional replies to every review you get."
        aside={
          <div className="mx-auto w-full max-w-[260px] rotate-[2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">At the counter</p>
            <p className="mt-2 font-display text-[2.6rem] font-extrabold uppercase leading-none text-forest">30 sec</p>
            <p className="mt-1 font-sans text-sm leading-snug text-ink/70">to scan, pick and post a review.</p>
            <div className="mt-4 flex gap-0.5 border-t border-ink/20 pt-3" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-4 fill-marigold text-marigold" />
              ))}
            </div>
          </div>
        }
      >
        <DemoButton />
      </PageHeader>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-7">
            <SectionHeading
              eyebrow="Try the slip"
              title="How a customer leaves a review"
              description="Tap through the demo. The customer scans, picks what they liked, and reads a draft they can edit before posting it to your Google profile."
            />
            <Reveal>
              <ol className="border-t border-ink/20">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-baseline gap-4 border-b border-ink/20 py-3.5">
                    <span className="font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-tomato">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-ink/80">{s}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="border-l-2 border-forest pl-3 text-sm leading-relaxed text-muted-foreground">
                Reviews always come from real customers. The draft is a starting point; they can change every word.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ReviewDemo />
          </Reveal>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-forest py-16 text-paper sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <ReplyDemo />
          </Reveal>
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionHeading
              dark
              eyebrow="The reply"
              title={
                <>
                  Reply to every review
                  <br />
                  without writing a word.
                </>
              }
              description="Google rewards businesses that reply. Our AI writes a warm, professional answer to each review, good or bad, so no customer is left waiting."
            />
            <Reveal delay={0.08}>
              <p className="w-fit border border-paper/25 px-3 py-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.1em] text-paper/55">
                You can read and edit every reply before it is posted.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper-deep py-16 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <Reveal>
                <Eyebrow>Why the words matter</Eyebrow>
                <h2 className="display-tight mt-4 text-balance text-[clamp(2.4rem,4.5vw,3.8rem)]">
                  The right words help Google send people your way.
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="max-w-md leading-relaxed text-muted-foreground">
                  When reviews naturally mention what you do, what you offer and where you are, Google understands your
                  business better and shows it higher in Maps and local search.
                </p>
              </Reveal>
            </div>

            <div className="border-t-2 border-ink">
              {commentPieces.map((piece, i) => (
                <Reveal key={piece.label} delay={i * 0.05}>
                  <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-ink/20 py-5">
                    <span className="font-mono text-[0.6rem] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-display text-xl font-extrabold uppercase leading-none text-ink">{piece.label}</p>
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-forest">{piece.example}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.15}>
                <div className="mt-6 border border-ink/25 bg-paper p-5">
                  <p className="label flex items-center gap-2 text-tomato">
                    <MapPin className="size-3" aria-hidden="true" /> Example sentence
                  </p>
                  <p className="mt-2 font-sans text-lg leading-relaxed text-ink/85">
                    “Loved the <span className="bg-marigold/35 px-0.5">cappuccino</span> at this lovely{" "}
                    <span className="bg-marigold/35 px-0.5">café in Bandra</span>. Friendly staff and a proper{" "}
                    <span className="bg-marigold/35 px-0.5">work-friendly corner</span>.”
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="What it does for you" title="The practical difference." />
          <div className="mt-10">
            <BenefitGrid items={benefits} />
          </div>
          <Reveal className="mt-12">
            <DemoButton size="lg" />
          </Reveal>
        </Container>
      </section>

      <section className="border-b-2 border-ink bg-paper py-12 sm:py-16">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-tomato">Live demo</p>
            <p className="mt-1 font-display text-2xl font-extrabold uppercase leading-none text-ink">Try the real review generator</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pick a category and get an editable review draft, then copy it and post it on Google. Runs on the live API.
            </p>
          </div>
          <a
            href="/review"
            className="inline-flex items-center gap-2 border-2 border-ink bg-forest px-5 py-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-paper shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            Open live demo
          </a>
        </Container>
      </section>

      <CtaBanner title="Ready for more five-star reviews?" />
    </>
  )
}
