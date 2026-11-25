"use client"

import { motion } from "framer-motion"
import { journeySteps } from "@/src/config/content"
import { cn } from "@/lib/utils"

const groups = [
  { key: "growth", label: "Customer growth", sub: "Tool 01 · Review tool", span: "lg:col-span-2" },
  { key: "retention", label: "Customer retention", sub: "Tool 02 · Loyalty card", span: "lg:col-span-3" },
]

export function Timeline() {
  return (
    <div className="flex flex-col">
      <div className="hidden border-2 border-ink lg:grid lg:grid-cols-5">
        {groups.map((g) => (
          <div
            key={g.key}
            className={cn(
              "flex items-baseline justify-between gap-4 px-5 py-3.5",
              g.span,
              g.key === "growth" ? "bg-forest text-paper" : "border-l-2 border-ink bg-tomato text-paper-light",
            )}
          >
            <p className="font-display text-xl font-extrabold uppercase leading-none">{g.label}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-[0.12em] opacity-70">{g.sub}</p>
          </div>
        ))}
      </div>

      <ol className="relative border-l-2 border-ink/25 lg:grid lg:grid-cols-5 lg:border-l-0">
        {journeySteps.map((step, i) => {
          const growth = step.tool === "growth"
          const showGroupLabel = i === 0 || journeySteps[i - 1].tool !== step.tool
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.07 }}
              className="relative flex gap-5 pl-6 lg:flex-col lg:gap-0 lg:border-r lg:border-ink/20 lg:py-7 lg:pl-0 lg:last:border-r-0"
            >
              <span
                className={cn(
                  "absolute -left-[1.05rem] top-0 flex size-8 items-center justify-center border-2 font-mono text-[0.65rem] font-semibold lg:static lg:ml-6 lg:mb-5 lg:size-10",
                  growth ? "border-forest bg-forest text-paper" : "border-tomato bg-tomato text-paper-light",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 flex-col gap-2 pb-7 lg:px-6 lg:pb-0">
                {showGroupLabel && (
                  <span className="mb-1 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ink/45 lg:hidden">
                    {growth ? "Tool 01 · Review tool" : "Tool 02 · Loyalty card"}
                  </span>
                )}
                <h2 className="font-display text-[1.6rem] font-extrabold uppercase leading-none text-ink">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}
