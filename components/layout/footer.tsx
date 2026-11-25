import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6"
import { footerNav, legalNav, siteConfig, whatsappUrl } from "@/src/config/site"
import { Logo } from "./logo"

const socials = [
  { label: "Instagram", href: siteConfig.socials.instagram, Icon: FaInstagram },
  { label: "Facebook", href: siteConfig.socials.facebook, Icon: FaFacebookF },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-forest pb-28 text-paper lg:pb-0">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-col gap-5 border-b border-paper/20 py-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl font-display text-4xl font-extrabold uppercase leading-[0.9] text-paper sm:text-5xl">
            Easy to find.
            <br />
            <span className="text-marigold">Hard to forget.</span>
          </p>
          <span className="stamp text-marigold">No app required</span>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.15fr_0.6fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-paper/70">{siteConfig.tagline}</p>
            <p className="max-w-xs text-sm leading-relaxed text-paper/70">
              Two simple tools for local businesses: a QR review code and a digital stamp card.
            </p>
            <ul className="flex gap-2" aria-label="Social media">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-marigold hover:bg-marigold hover:text-forest"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-marigold">The shop</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/80 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-marigold">Talk to us</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href={`tel:${siteConfig.phoneLink}`} className="flex items-center gap-2.5 text-paper/85 hover:text-paper">
                  <Phone className="size-4 text-marigold" aria-hidden="true" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-paper/85 hover:text-paper"
                >
                  <FaWhatsapp className="size-4 text-marigold" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 break-all text-paper/85 hover:text-paper"
                >
                  <Mail className="size-4 shrink-0 text-marigold" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-paper/85">
                <MapPin className="size-4 text-marigold" aria-hidden="true" />
                {siteConfig.city}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="label text-marigold">Legal</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/80 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/book-a-demo#demo-form"
              className="mt-6 inline-flex items-center gap-1.5 border-b border-marigold pb-1 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-marigold hover:text-paper"
            >
              Book a demo
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/20 py-5 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.12em]">Made in Mumbai</p>
        </div>
      </div>
    </footer>
  )
}
