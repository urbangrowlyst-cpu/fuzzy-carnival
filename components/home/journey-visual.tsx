"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Coffee, MapPin, Search, Star, Sparkles, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

const stages = ["Found on Google", "Trusted through reviews", "Loyal customer"]

function SearchCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 shadow-sm">
        <Search className="size-4 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm text-indigo-deep">best café near me</span>
      </div>
      {[
        { name: "Brew & Bean Café", rating: "4.9", reviews: "412", you: true },
        { name: "Corner Coffee Co.", rating: "4.2", reviews: "88" },
      ].map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className={cn(
            "flex items-center gap-3 rounded-xl border p-3",
            r.you ? "border-brand-light bg-lavender shadow-md shadow-brand/10" : "border-border bg-white opacity-70",
          )}
        >
          <div className={cn("flex size-10 items-center justify-center rounded-lg", r.you ? "bg-brand-gradient text-white" : "bg-muted text-muted-foreground")}>
            <MapPin className="size-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-deep">{r.name}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden="true" />
              {r.rating} ({r.reviews} reviews)
            </p>
          </div>
          {r.you && <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase text-white">#1</span>}
        </motion.div>
      ))}
    </div>
  )
}

function ReviewCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1" aria-label="5 stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 + i * 0.08, type: "spring" }}>
            <Star className="size-6 fill-amber-400 text-amber-400" aria-hidden="true" />
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-lavender p-4 text-sm leading-relaxed text-indigo-deep"
      >
        {'"Best cappuccino in Bandra! Cosy café with friendly staff and fast service. My go-to coffee spot."'}
      </motion.p>
      <div className="flex items-center gap-2 text-xs font-medium text-brand-dark">
        <Sparkles className="size-4" aria-hidden="true" />
        Drafted with AI, posted by a happy customer
      </div>
    </div>
  )
}

function StampCard() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-indigo-deep">Brew & Bean Rewards</p>
        <span className="text-xs text-muted-foreground">4 / 5 visits</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.12, type: "spring" }}
            className={cn(
              "flex aspect-square items-center justify-center rounded-full border-2",
              i < 4 ? "border-transparent bg-brand-gradient text-white" : "border-dashed border-brand-light text-brand-light",
            )}
          >
            {i < 4 ? <Coffee className="size-4" aria-hidden="true" /> : <Gift className="size-4" aria-hidden="true" />}
          </motion.div>
        ))}
      </div>
      <p className="rounded-xl bg-lavender p-3 text-center text-sm font-medium text-brand-dark">
        1 more visit for a free coffee!
      </p>
    </div>
  )
}

const cards = [SearchCard, ReviewCard, StampCard]

export function JourneyVisual() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s + 1) % cards.length), 3200)
    return () => clearInterval(t)
  }, [])

  const Card = cards[stage]

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-brand-gradient opacity-25 blur-3xl" />
      <div className="glass relative rounded-3xl p-5 shadow-2xl shadow-brand/20 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          {stages.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col gap-1.5">
              <div className="h-1.5 overflow-hidden rounded-full bg-brand-light/25">
                <motion.div
                  className="h-full bg-brand-gradient"
                  initial={false}
                  animate={{ width: i < stage ? "100%" : i === stage ? "100%" : "0%" }}
                  transition={{ duration: i === stage ? 3 : 0.3, ease: "linear" }}
                />
              </div>
              <span className={cn("text-[10px] font-semibold sm:text-xs", i === stage ? "text-brand-dark" : "text-muted-foreground")}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <Card />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="glass absolute -bottom-5 -left-4 hidden items-center gap-2 rounded-2xl px-4 py-3 shadow-xl shadow-brand/15 sm:flex"
      >
        <div className="flex size-8 items-center justify-center rounded-full bg-brand-gradient text-white">
          <Star className="size-4 fill-white" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">New reviews</p>
          <p className="text-sm font-bold text-indigo-deep">+38 this month</p>
        </div>
      </motion.div>
    </div>
  )
}
