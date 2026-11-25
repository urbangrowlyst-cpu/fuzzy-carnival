import type { MetadataRoute } from "next"
import { siteConfig } from "@/src/config/site"

const routes = [
  { path: "", priority: 1 },
  { path: "/how-it-works", priority: 0.8 },
  { path: "/ai-review-tool", priority: 0.9 },
  { path: "/loyalty-program", priority: 0.9 },
  { path: "/pricing", priority: 0.9 },
  { path: "/use-cases", priority: 0.7 },
  { path: "/faq", priority: 0.6 },
  { path: "/book-a-demo", priority: 1 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }))
}
