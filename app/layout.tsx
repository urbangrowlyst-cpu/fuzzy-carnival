import type { Metadata, Viewport } from "next"
import { Big_Shoulders, Karla, Spline_Sans_Mono } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { FloatingActions } from "@/components/layout/floating-actions"
import { siteConfig } from "@/src/config/site"
import "./globals.css"

const shoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-shoulders",
  weight: ["600", "700", "800", "900"],
  display: "swap",
})
const karla = Karla({ subsets: ["latin"], variable: "--font-karla", display: "swap" })
const spline = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Turn Google searches into loyal customers`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#17402F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${shoulders.variable} ${karla.variable} ${spline.variable}`}>
      <body className="grain min-h-screen bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="overflow-x-clip">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  )
}
