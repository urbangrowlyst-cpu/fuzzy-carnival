import { Container, Eyebrow } from "@/components/shared/section-heading"
import { Reveal } from "@/components/shared/reveal"

const reasons = [
  { title: "Get found", text: "Appear higher when locals search for businesses like yours on Google." },
  {
    title: "Get trusted",
    text: "AI-assisted reviews, written with SEO in mind, help your business rank higher on Google. Quick replies show new customers you care.",
  },
  { title: "Get remembered", text: "A digital stamp card in their phone keeps your business top of mind." },
  { title: "Get repeat business", text: "Rewards turn one-time visitors into regulars who keep coming back." },
]

const stats = [
  { value: "3x", label: "more reviews" },
  { value: "2x", label: "repeat visits" },
  { value: "5 min", label: "setup time" },
  { value: "0", label: "apps to download" },
]

export function WhyUs() {
  return (
    <section className="border-b-2 border-ink bg-paper py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Why it works</Eyebrow>
              <h2 className="display-tight mt-4 text-balance text-[clamp(2.6rem,5vw,4.2rem)]">
                Good growth feels like
                <br />
                <span className="text-tomato">good hospitality.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
                No campaigns to manage. No dashboards to learn. Just a few small habits that make your business easier
                to find and harder to forget.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="w-fit border-2 border-tomato px-3 py-2 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-tomato-dark">
                No agency retainer
                <br />
                No app for your customers
              </p>
            </Reveal>
          </div>

          <div className="grid border-t border-ink/20 sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 0.05}>
                <div
                  className={
                    "flex h-full flex-col gap-3 border-b border-ink/20 py-7 sm:px-6 " +
                    (i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0") +
                    (i < 2 ? " sm:border-b" : "")
                  }
                >
                  <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-tomato">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[1.9rem] font-extrabold uppercase leading-none text-ink">
                    {reason.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <dl className="mt-16 grid grid-cols-2 border-2 border-ink bg-forest text-paper sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  "flex flex-col gap-1 px-5 py-6 sm:px-6 " +
                  (i % 2 === 1 ? "border-l border-paper/20" : "") +
                  (i > 1 ? " border-t border-paper/20 sm:border-t-0" : "") +
                  (i > 0 ? " sm:border-l sm:border-paper/20" : "")
                }
              >
                <dt className="order-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.12em] text-paper/55">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-[2.9rem] font-extrabold leading-none text-marigold sm:text-[3.4rem]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}
