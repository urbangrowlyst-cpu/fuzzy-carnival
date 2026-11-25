"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Coffee, Gift, RotateCcw, Stamp } from "lucide-react"
import { cn } from "@/lib/utils"

const TOTAL = 5

export function StampCardDemo() {
  const [stamps, setStamps] = useState(2)
  const unlocked = stamps >= TOTAL

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative rotate-[-1.5deg] border-2 border-ink bg-paper-light p-5 text-ink shadow-[10px_10px_0_var(--forest)]">
        <span className="absolute -right-2 -top-3 rotate-[4deg] border-2 border-tomato bg-paper-light px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-tomato">
          Example card
        </span>

        <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3">
          <div>
            <p className="font-mono text-[0.52rem] uppercase tracking-[0.16em] text-ink/45">Digital loyalty card</p>
            <p className="mt-1 font-display text-[1.85rem] font-extrabold uppercase leading-[0.85]">Brew &amp; Bean</p>
            <p className="mt-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-tomato-dark">
              Bandra West · Est. 2019
            </p>
          </div>
          <svg viewBox="0 0 7 7" className="size-9 shrink-0" aria-hidden="true">
            {[
              [1, 1, 1, 0, 1, 1, 1],
              [1, 0, 1, 0, 0, 0, 1],
              [1, 1, 1, 0, 1, 1, 1],
              [0, 0, 0, 1, 0, 0, 0],
              [1, 1, 0, 1, 1, 0, 1],
              [1, 0, 1, 0, 0, 1, 0],
              [1, 1, 1, 0, 1, 0, 1],
            ].flatMap((row, y) =>
              row.map((on, x) =>
                on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null,
              ),
            )}
          </svg>
        </div>

        <p className="mt-3 font-sans text-sm font-semibold">Visit 4 times, get your 5th coffee free.</p>

        <div
          className="mt-4 grid grid-cols-5 gap-2.5"
          role="img"
          aria-label={`${Math.min(stamps, TOTAL)} of ${TOTAL} stamps collected`}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            const filled = i < stamps
            const isReward = i === TOTAL - 1
            return (
              <div
                key={i}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-full border-2",
                  filled
                    ? "border-forest bg-forest text-paper"
                    : isReward
                      ? "border-dashed border-tomato text-tomato"
                      : "border-dashed border-ink/30 text-ink/25",
                )}
              >
                <AnimatePresence>
                  {filled && (
                    <motion.span
                      initial={{ scale: 2.2, opacity: 0, rotate: -22 }}
                      animate={{ scale: 1, opacity: 1, rotate: i % 2 ? 4 : -4 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 16 }}
                      className="text-paper"
                    >
                      {isReward ? <Gift className="size-4" aria-hidden="true" /> : <Coffee className="size-4" aria-hidden="true" />}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!filled && isReward && <Gift className="size-4 text-tomato/70" aria-hidden="true" />}
                {!filled && !isReward && <span className="font-mono text-[0.55rem]">{i + 1}</span>}
              </div>
            )
          })}
        </div>

        <div className="mt-4 min-h-[138px] border-t border-ink/20 pt-4" aria-live="polite">
          <AnimatePresence mode="wait">
            {unlocked ? (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-start gap-3"
              >
                <span className="stamp border-tomato text-tomato">Reward unlocked</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Show this screen at the counter to claim the free coffee.
                </p>
                <button
                  type="button"
                  onClick={() => setStamps(0)}
                  className="inline-flex items-center gap-1.5 border-b-2 border-ink pb-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-ink hover:text-tomato"
                >
                  <RotateCcw className="size-3.5" aria-hidden="true" /> Redeem &amp; start again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="collect"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3"
              >
                <p className="font-sans text-sm text-ink">
                  <span className="font-bold">{TOTAL - stamps}</span> more {TOTAL - stamps === 1 ? "visit" : "visits"} to
                  your free coffee.
                </p>
                <button
                  type="button"
                  onClick={() => setStamps((s) => Math.min(s + 1, TOTAL))}
                  className="inline-flex h-12 items-center justify-center gap-2 border-2 border-ink bg-tomato font-sans font-bold text-paper-light shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-px active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <Stamp className="size-4" aria-hidden="true" />
                  Add a visit stamp
                </button>
                <p className="text-center font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/40">
                  Tap to simulate a customer visit
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-ink/15 pt-3">
          <span className="font-mono text-[0.48rem] uppercase tracking-[0.12em] text-ink/35">Card no. 0042</span>
          <div className="h-5 w-20 bg-[repeating-linear-gradient(90deg,var(--ink)_0,var(--ink)_1.5px,transparent_1.5px,transparent_4px)] opacity-60" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
