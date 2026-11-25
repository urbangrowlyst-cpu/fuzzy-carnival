"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa6"
import { siteConfig, whatsappUrl } from "@/src/config/site"

export function FloatingActions() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const hidden = pathname === "/book-a-demo"

  useEffect(() => {
    const onScroll = () => {
      const hero = pathname === "/" ? document.getElementById("hero") : null
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 120 : 420
      setVisible(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  const showDemo = visible && !hidden

  return (
    <>
      <AnimatePresence>
        {showDemo && (
          <>
            <motion.div
              key="desktop-demo"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed bottom-6 right-24 z-40 hidden xl:block"
            >
              <Link
                href="/book-a-demo#demo-form"
                className="flex items-center gap-2 border-2 border-ink bg-tomato px-5 py-3.5 font-sans text-sm font-bold text-paper-light shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-px"
              >
                {siteConfig.ctaLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div
              key="mobile-demo"
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper p-3 md:hidden"
            >
              <Link
                href="/book-a-demo#demo-form"
                className="flex h-12 w-full items-center justify-center gap-2 border-2 border-ink bg-tomato font-sans font-bold text-paper-light"
              >
                {siteConfig.ctaLabel}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={
          "fixed right-4 z-40 flex size-12 items-center justify-center border-2 border-ink bg-[#25D366] text-ink shadow-[3px_3px_0_var(--ink)] transition-transform hover:-translate-y-0.5 md:bottom-6 md:right-6 " +
          (showDemo ? "bottom-20" : "bottom-4")
        }
      >
        <FaWhatsapp className="size-6" aria-hidden="true" />
      </a>
    </>
  )
}
