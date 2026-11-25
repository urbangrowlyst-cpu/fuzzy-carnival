import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"
import { createMetadata } from "@/lib/seo"
import { faqs } from "@/src/config/content"
import { siteConfig, whatsappUrl } from "@/src/config/site"
import { Container, PageHeader } from "@/components/shared/section-heading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CtaBanner } from "@/components/shared/cta-banner"
import { Reveal } from "@/components/shared/reveal"

export const metadata = createMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Urban Growlyst: AI reviews, QR codes, the digital loyalty program, setup time and pricing for multiple branches.",
  path: "/faq",
})

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

const quickFacts = [
  { label: "Setup", value: "5 min" },
  { label: "Customer app", value: "None" },
  { label: "Review page", value: "₹4,999" },
  { label: "Loyalty from", value: "₹3,499" },
]

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="FAQ"
        index="07"
        title={
          <>
            Straight answers.
            <br />
            No fine print.
          </>
        }
        description="Everything you need to know about Urban Growlyst, in plain words. If something is still unclear, call us and ask."
        aside={
          <div className="mx-auto w-full max-w-[260px] rotate-[-2deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[7px_7px_0_var(--marigold)] lg:ml-auto">
            <p className="border-b border-ink/20 pb-2 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">
              The short version
            </p>
            <dl className="mt-1">
              {quickFacts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-1.5">
                  <dt className="font-sans text-sm text-ink/70">{f.label}</dt>
                  <dd className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.06em] text-forest">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 font-mono text-[0.5rem] uppercase leading-relaxed tracking-[0.08em] text-ink/40">
              Prices per branch, exclusive of GST.
            </p>
          </div>
        }
      />

      <section className="border-b-2 border-ink bg-paper py-16 sm:py-24">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-3 border-b-2 border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="label text-tomato">The questions</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Six things owners ask us most, answered without a sales pitch.
            </p>
          </div>

          <Reveal className="mt-2">
            <Accordion defaultValue={["item-0"]} className="flex flex-col">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-ink/20"
                >
                  <AccordionTrigger className="group items-center gap-5 py-5 text-left hover:no-underline focus-visible:ring-2 focus-visible:ring-tomato/40">
                    <span className="flex flex-1 items-baseline gap-4">
                      <span className="font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-tomato">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl font-extrabold uppercase leading-tight text-ink sm:text-2xl">
                        {f.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 text-[0.98rem] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal className="mt-12 border-2 border-ink bg-paper-light p-6 shadow-[5px_5px_0_var(--forest)] sm:p-8">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="label text-tomato">Still unsure?</p>
                <p className="mt-2 font-display text-2xl font-extrabold uppercase leading-none text-ink sm:text-3xl">
                  Ask a person, not a chatbot.
                </p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                  We&apos;re a small team in Mumbai. Call, message or email and we&apos;ll answer straight.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`tel:${siteConfig.phoneLink}`}
                  className="inline-flex items-center gap-2.5 border-2 border-ink bg-forest px-4 py-3 font-sans text-sm font-bold text-paper shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 border border-ink/30 px-4 py-2.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
                >
                  WhatsApp us
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2.5 px-1 py-1 font-mono text-[0.6rem] lowercase tracking-[0.04em] text-ink/55 transition-colors hover:text-tomato-dark"
                >
                  <Mail className="size-3.5" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <p className="text-sm text-muted-foreground">
              Looking for prices?{" "}
              <Link href="/pricing" className="border-b border-ink font-semibold text-ink hover:border-tomato hover:text-tomato">
                The full price list is here
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBanner title="See it working on your own business." />
    </>
  )
}
