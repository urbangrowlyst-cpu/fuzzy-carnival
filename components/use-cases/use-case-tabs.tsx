"use client"

import { Coffee, Dumbbell, Gift, Scissors, Star, Stethoscope, UtensilsCrossed } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCases } from "@/src/config/content"

const icons = { cafe: Coffee, salon: Scissors, gym: Dumbbell, restaurant: UtensilsCrossed, clinic: Stethoscope } as const

export function UseCaseTabs() {
  return (
    <Tabs defaultValue="cafe" className="flex flex-col gap-8">
      <TabsList className="flex h-auto w-fit flex-wrap gap-0 border-2 border-ink bg-paper-light p-0">
        {useCases.map((u) => {
          const Icon = icons[u.id as keyof typeof icons]
          return (
            <TabsTrigger
              key={u.id}
              value={u.id}
              className="gap-2 rounded-none border-r border-ink/20 px-4 py-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink/55 last:border-r-0 hover:text-ink data-[state=active]:bg-forest data-[state=active]:text-paper data-active:bg-forest data-active:text-paper"
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {u.label}
            </TabsTrigger>
          )
        })}
      </TabsList>

      {useCases.map((u) => (
        <TabsContent key={u.id} value={u.id} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <article className="relative flex flex-col gap-5 border-2 border-ink bg-forest p-6 text-paper shadow-[7px_7px_0_var(--ink)] sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-paper/20 pb-3">
                <span className="label text-marigold">Example loyalty card</span>
                <span className="label text-paper/40">Tool 02</span>
              </div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper/55">{u.business}</p>
              <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.92] sm:text-5xl">{u.offer}</h2>
              <div className="mt-auto grid grid-cols-5 gap-2 pt-5 sm:max-w-xs" aria-hidden="true">
                {Array.from({ length: u.stamps }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      i === u.stamps - 1
                        ? "flex aspect-square items-center justify-center rounded-full border-2 border-dashed border-marigold text-marigold"
                        : "flex aspect-square items-center justify-center rounded-full border-2 border-paper/70 bg-paper text-forest"
                    }
                  >
                    {i === u.stamps - 1 ? (
                      <Gift className="size-4" aria-hidden="true" />
                    ) : (
                      <Star className="size-4 fill-forest" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-paper/40">
                Illustrative offer · {u.stamps} visits
              </p>
            </article>

            <article className="relative flex flex-col gap-5 border-2 border-ink bg-paper-light p-6 shadow-[7px_7px_0_var(--tomato)] sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-ink/20 pb-3">
                <span className="label text-tomato">Example review</span>
                <span className="label text-ink/40">Tool 01</span>
              </div>
              <div className="flex gap-0.5" aria-label="5 stars">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-5 fill-marigold text-marigold" aria-hidden="true" />
                ))}
              </div>
              <p className="font-sans text-[1.02rem] leading-relaxed text-ink/85">&ldquo;{u.review}&rdquo;</p>
              <div className="mt-auto flex flex-wrap gap-2 border-t border-ink/15 pt-4">
                {u.keywords.map((k) => (
                  <span
                    key={k}
                    className="border border-forest/40 bg-paper px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.06em] text-forest"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ink/40">
                Illustrative review · Google
              </p>
            </article>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
