import { Check, Coffee, Gift, Search, Star } from "lucide-react"

function MiniQr() {
  const cells = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0, 1],
  ]
  return (
    <svg viewBox="0 0 7 7" className="size-10 shrink-0 text-ink" aria-hidden="true">
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  )
}

function Stamp({ index }: { index: number }) {
  const filled = index < 4
  const reward = index === 4
  return (
    <div
      className={
        "relative flex aspect-square items-center justify-center rounded-full border-2 " +
        (filled
          ? index % 2 === 0
            ? "rotate-[-5deg] border-forest bg-forest text-paper"
            : "rotate-[4deg] border-forest bg-forest text-paper"
          : reward
            ? "border-dashed border-tomato text-tomato"
            : "border-dashed border-ink/30 text-ink/25")
      }
    >
      {filled ? (
        <Coffee className="size-5" aria-hidden="true" />
      ) : reward ? (
        <Gift className="size-5" aria-hidden="true" />
      ) : (
        <span className="font-mono text-[0.6rem]">{index + 1}</span>
      )}
    </div>
  )
}

export function CounterVisual() {
  return (
    <div className="relative mx-auto h-[600px] w-full max-w-[440px] text-ink sm:h-[620px]">
      {/* Search slip */}
      <div className="absolute right-0 top-0 z-10 w-[78%] rotate-[1.5deg] border border-ink/30 bg-paper-light p-4 shadow-[6px_6px_0_rgba(0,0,0,0.22)]">
        <div className="flex items-center gap-2 border-b border-ink/20 pb-2.5">
          <Search className="size-3.5 text-ink/50" aria-hidden="true" />
          <span className="font-mono text-[0.68rem] text-ink/60">best café near me</span>
          <span className="ml-auto font-mono text-[0.5rem] uppercase tracking-widest text-tomato">Example search</span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-extrabold uppercase leading-none">Brew &amp; Bean Café</p>
            <p className="mt-1.5 flex items-center gap-1 font-mono text-[0.62rem] text-ink/55">
              <Star className="size-3 fill-marigold text-marigold" aria-hidden="true" />
              4.9 · 412 reviews · Bandra
            </p>
          </div>
          <span className="mt-0.5 border border-forest px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-widest text-forest">
            Open
          </span>
        </div>
      </div>

      {/* Review slip */}
      <div className="absolute left-0 top-[26%] z-20 w-[62%] -rotate-[3deg] border border-ink/30 bg-paper-light p-4 shadow-[6px_6px_0_rgba(0,0,0,0.22)]">
        <div className="flex items-center justify-between gap-2 border-b border-ink/15 pb-2">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ink/45">Example review</span>
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink/35">Google</span>
        </div>
        <div className="mt-2 flex gap-0.5" aria-label="5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="size-3.5 fill-marigold text-marigold" aria-hidden="true" />
          ))}
        </div>
        <p className="mt-2 font-sans text-[0.8rem] leading-snug text-ink/80">
          “Best cappuccino in Bandra. Cosy, quick and the staff remember your order.”
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/40">Example · 2 days ago</p>
          <span className="inline-flex rotate-[-4deg] items-center gap-1 border-2 border-forest px-1.5 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-widest text-forest">
            <Check className="size-2.5" aria-hidden="true" /> Posted
          </span>
        </div>
      </div>

      {/* Loyalty card */}
      <div className="absolute bottom-0 right-0 z-30 w-[88%] rotate-[2deg] border-2 border-ink bg-paper-light p-5 shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
        <div className="flex items-start justify-between gap-3 border-b-2 border-ink pb-3">
          <div>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ink/45">Digital stamp card</p>
            <p className="mt-1 font-display text-[2rem] font-extrabold uppercase leading-[0.85]">Brew &amp; Bean</p>
            <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-tomato-dark">
              Bandra West · Est. 2019
            </p>
          </div>
          <MiniQr />
        </div>

        <div className="grid grid-cols-5 gap-2.5 py-4" role="img" aria-label="Example stamp card with four of five stamps collected">
          {[0, 1, 2, 3, 4].map((i) => (
            <Stamp key={i} index={i} />
          ))}
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-ink/20 pt-3">
          <div>
            <p className="font-sans text-sm font-semibold leading-tight">One more coffee, then one on us.</p>
            <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45">
              Visit 4 times · 5th free
            </p>
          </div>
          <div className="h-8 w-20 shrink-0 bg-[repeating-linear-gradient(90deg,var(--ink)_0,var(--ink)_1.5px,transparent_1.5px,transparent_4px)]" aria-hidden="true" />
        </div>

        <span className="absolute -right-2 -top-3 rotate-[6deg] border-2 border-tomato bg-paper-light px-2 py-0.5 font-mono text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-tomato">
          Example
        </span>
      </div>
    </div>
  )
}
