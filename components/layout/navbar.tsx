"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Menu, Phone, X } from "lucide-react"
import { mainNav, siteConfig } from "@/src/config/site"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)

  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
      <div className="hidden border-b border-paper/20 bg-forest text-paper sm:block">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-1.5 sm:px-8">
          <p className="label text-paper/80">Mumbai · For local businesses</p>
        </div>
      </div>

      <nav aria-label="Main" className="mx-auto flex max-w-[1180px] items-stretch px-5 sm:px-8">
        <div className="flex flex-1 items-center py-2.5">
          <Logo />
        </div>

        <ul className="hidden items-stretch gap-7 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href
            return (
              <li key={item.href} className="flex">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "label flex items-center border-b-[3px] pt-1 transition-colors",
                    active
                      ? "border-tomato text-ink"
                      : "border-transparent text-ink/65 hover:border-ink/20 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center pl-7 lg:flex">
          <Link
            href="/book-a-demo#demo-form"
            className="group inline-flex items-center gap-2 border-2 border-ink bg-tomato px-4 py-2.5 font-sans text-sm font-bold text-paper-light shadow-[3px_3px_0_var(--ink)] transition-all hover:-translate-y-px hover:bg-tomato-dark hover:shadow-[4px_4px_0_var(--ink)]"
          >
            Book a demo
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 border-l border-ink/20 px-2 py-4 text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="label">{open ? "Close" : "Menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 bottom-0 top-[65px] z-50 overflow-y-auto border-t border-ink/15 bg-paper lg:hidden"
          >
            <div className="flex min-h-full flex-col">
              <ul className="flex flex-col px-5 pt-4">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href} className="border-b border-ink/15">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between py-4 font-display text-3xl font-extrabold uppercase leading-none",
                          active ? "text-tomato" : "text-ink",
                        )}
                      >
                        {item.label}
                        <span className="label text-ink/40">{active ? "Here" : "→"}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-auto px-5 py-6">
                <Link
                  href="/book-a-demo#demo-form"
                  className="btn-primary w-full text-base shadow-[4px_4px_0_var(--ink)]"
                >
                  Book a free demo
                  <ArrowUpRight className="size-5" aria-hidden="true" />
                </Link>
                <a
                  href={`tel:${siteConfig.phoneLink}`}
                  className="mt-4 flex items-center justify-center gap-2 py-2 font-mono text-xs uppercase tracking-widest text-ink/60"
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                  Or call {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
