"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Loader2, PenLine, RotateCcw, Send, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const likes = ["Great coffee", "Friendly staff", "Cosy seating", "Fast service", "Good value", "Fast Wi-Fi"]

function MiniQrLarge() {
  const cells = [
    [1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
  ]
  return (
    <svg viewBox="0 0 10 10" className="size-32 text-ink" aria-hidden="true">
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  )
}

function buildReview(selected: string[]) {
  const parts = selected.map((s) => s.toLowerCase())
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0]
  return `Loved my visit to Brew & Bean, a lovely café in Bandra, Mumbai! ${list.charAt(0).toUpperCase() + list.slice(1)} made it a great experience. Definitely one of the best cafés near Bandra, I'll be back soon.`
}

type Step = "scan" | "pick" | "drafting" | "draft" | "posted"

export function ReviewDemo() {
  const [step, setStep] = useState<Step>("scan")
  const [selected, setSelected] = useState<string[]>(["Great coffee", "Friendly staff"])

  const toggle = (l: string) =>
    setSelected((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]))

  const generate = () => {
    setStep("drafting")
    setTimeout(() => setStep("draft"), 1400)
  }

  const steps: Step[] = ["scan", "pick", "draft", "posted"]
  const current = step === "drafting" ? 2 : steps.indexOf(step)

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative border-2 border-ink bg-paper-light p-5 text-ink shadow-[9px_9px_0_var(--forest)]">
        <span className="absolute -left-2 -top-3 rotate-[-4deg] border-2 border-tomato bg-paper-light px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-tomato">
          Example slip
        </span>

        <div className="flex items-center justify-between border-b-2 border-ink pb-2.5">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/50">Customer&apos;s phone</p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/40">
            Step {step === "drafting" ? 3 : Math.max(current + 1, 1)} / 4
          </p>
        </div>

        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {steps.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1",
                i <= current ? (i === current ? "bg-tomato" : "bg-forest") : "bg-ink/15",
              )}
            />
          ))}
        </div>

        <div className="min-h-[356px] pt-5" aria-live="polite">
          <AnimatePresence mode="wait">
            {step === "scan" && (
              <motion.div
                key="scan"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col items-center gap-4 text-center"
              >
                <p className="label text-tomato">01 · Scan</p>
                <div className="relative flex size-40 items-center justify-center border border-ink/25 bg-paper">
                  <MiniQrLarge />
                </div>
                <p className="max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                  The customer scans the QR code at your counter.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("pick")}
                  className="mt-1 h-11 w-full border-2 border-ink bg-tomato font-sans font-bold text-paper-light shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Scan the code
                </button>
              </motion.div>
            )}

            {step === "pick" && (
              <motion.div
                key="pick"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-4"
              >
                <p className="label text-tomato">02 · What did you like?</p>
                <p className="font-display text-2xl font-extrabold uppercase leading-none">How was Brew &amp; Bean today?</p>
                <div className="flex flex-wrap gap-2">
                  {likes.map((l) => {
                    const on = selected.includes(l)
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => toggle(l)}
                        aria-pressed={on}
                        className={cn(
                          "inline-flex items-center gap-1 border px-2.5 py-1.5 font-sans text-sm transition-colors",
                          on
                            ? "border-forest bg-forest text-paper"
                            : "border-ink/30 bg-paper text-ink hover:border-ink",
                        )}
                      >
                        {on && <Check className="size-3.5" aria-hidden="true" />}
                        {l}
                      </button>
                    )
                  })}
                </div>
                <button
                  type="button"
                  disabled={selected.length === 0}
                  onClick={generate}
                  className="mt-auto inline-flex h-11 items-center justify-center gap-2 border-2 border-ink bg-tomato font-sans font-bold text-paper-light shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px disabled:opacity-50"
                >
                  <PenLine className="size-4" aria-hidden="true" />
                  Write my review
                </button>
              </motion.div>
            )}

            {step === "drafting" && (
              <motion.div
                key="drafting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[356px] flex-col items-center justify-center gap-3 text-center"
              >
                <Loader2 className="size-7 animate-spin text-tomato" aria-hidden="true" />
                <p className="font-sans text-sm font-medium">Writing a draft from your notes…</p>
              </motion.div>
            )}

            {step === "draft" && (
              <motion.div
                key="draft"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex flex-col gap-3.5"
              >
                <p className="label text-tomato">03 · Read &amp; edit</p>
                <div className="flex gap-0.5" aria-label="5 stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="size-5 fill-marigold text-marigold" aria-hidden="true" />
                  ))}
                </div>
                <label htmlFor="ai-draft" className="sr-only">
                  Review draft (editable)
                </label>
                <textarea
                  id="ai-draft"
                  defaultValue={buildReview(selected)}
                  rows={7}
                  className="w-full resize-none border border-ink/30 bg-paper p-3 font-sans text-sm leading-relaxed text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
                />
                <p className="font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.08em] text-ink/45">
                  Useful words: café in Bandra · best cafés near Bandra
                </p>
                <button
                  type="button"
                  onClick={() => setStep("posted")}
                  className="inline-flex h-11 items-center justify-center gap-2 border-2 border-ink bg-forest font-sans font-bold text-paper shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px"
                >
                  <Send className="size-4" aria-hidden="true" />
                  Post on Google
                </button>
              </motion.div>
            )}

            {step === "posted" && (
              <motion.div
                key="posted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[356px] flex-col items-start justify-center gap-4"
              >
                <motion.div
                  initial={{ scale: 1.8, opacity: 0, rotate: -14 }}
                  animate={{ scale: 1, opacity: 1, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="flex size-20 items-center justify-center border-4 border-forest text-center font-mono text-[0.6rem] font-bold uppercase leading-tight tracking-widest text-forest"
                >
                  Posted
                </motion.div>
                <p className="font-display text-3xl font-extrabold uppercase leading-none">Review posted.</p>
                <p className="max-w-[17rem] text-sm leading-relaxed text-muted-foreground">
                  A fresh 5-star review is now helping Brew &amp; Bean show up higher on Google.
                </p>
                <button
                  type="button"
                  onClick={() => setStep("scan")}
                  className="inline-flex items-center gap-1.5 border-b-2 border-ink pb-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] hover:text-tomato"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-ink/15 pt-2">
          <span className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-ink/35">Brew &amp; Bean · Bandra</span>
          <span className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-ink/35">Google review</span>
        </div>
      </div>
    </div>
  )
}

type ReplyStage = "waiting" | "writing" | "posted"

export function ReplyDemo() {
  const [stage, setStage] = useState<ReplyStage>("waiting")
  const [run, setRun] = useState(0)

  useEffect(() => {
    setStage("waiting")
    const writing = setTimeout(() => setStage("writing"), 1400)
    const posted = setTimeout(() => setStage("posted"), 3200)
    return () => {
      clearTimeout(writing)
      clearTimeout(posted)
    }
  }, [run])

  return (
    <div className="border-2 border-ink bg-paper-light p-6 text-ink shadow-[8px_8px_0_var(--forest)]">
      <div className="flex items-start justify-between border-b-2 border-ink pb-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center border border-ink/30 bg-paper font-display text-lg font-extrabold">
            R
          </div>
          <div>
            <p className="font-sans text-sm font-bold">Rahul M.</p>
            <div className="mt-0.5 flex gap-0.5" aria-label="4 stars">
              {[0, 1, 2, 3].map((i) => (
                <Star key={i} className="size-3 fill-marigold text-marigold" aria-hidden="true" />
              ))}
              <Star className="size-3 text-marigold" aria-hidden="true" />
            </div>
          </div>
        </div>
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink/40">Google review</span>
      </div>

      <p className="py-4 font-sans text-sm leading-relaxed text-ink/85">
        “Coffee was great and staff were friendly. It was a bit crowded on Saturday, but I&apos;ll definitely come
        back.”
      </p>

      <div className="min-h-[150px] border-t border-ink/20 pt-4" aria-live="polite">
        <AnimatePresence mode="wait">
          {stage === "waiting" && (
            <motion.p
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 border border-ink/25 bg-paper px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink/60"
            >
              <span className="size-1.5 animate-pulse bg-tomato" aria-hidden="true" />
              New review received
            </motion.p>
          )}

          {stage === "writing" && (
            <motion.p
              key="writing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-2 border border-ink/25 bg-paper px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink/60"
            >
              <Loader2 className="size-3.5 animate-spin text-tomato" aria-hidden="true" />
              Writing a reply…
            </motion.p>
          )}

          {stage === "posted" && (
            <motion.div key="posted" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
              <div className="border-l-4 border-forest bg-paper p-4">
                <p className="mb-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-forest">
                  Reply from the owner
                </p>
                <p className="font-sans text-sm leading-relaxed text-ink/85">
                  Thank you so much, Rahul. We&apos;re glad you enjoyed the coffee and our team. Sorry about the Saturday
                  rush. Weekday mornings are calmer if you&apos;d like a quieter visit. See you again soon.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-forest">
                  <Check className="size-3.5" aria-hidden="true" /> Posted on Google
                </p>
                <button
                  type="button"
                  onClick={() => setRun((n) => n + 1)}
                  className="inline-flex items-center gap-1.5 border-b border-ink/40 pb-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/60 hover:text-tomato"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" />
                  Watch again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
