import { Container, PageHeader } from "./section-heading"
import { CtaBanner } from "./cta-banner"

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string
  intro: string
  sections: { heading: string; body: string }[]
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={intro} index="—" />
      <section className="border-b-2 border-ink bg-paper py-16 sm:py-20">
        <Container className="max-w-3xl">
          <div className="border-t-2 border-ink">
            {sections.map((s, i) => (
              <div key={s.heading} className="grid gap-3 border-b border-ink/20 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-tomato">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl font-extrabold uppercase leading-none text-ink">
                    {s.heading.replace(/^\d+\.\s*/, "")}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  )
}
