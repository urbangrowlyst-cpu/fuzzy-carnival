// All prices and pricing text live here. They update on the Pricing page and the Home pricing teaser.

export type PricingPlan = {
  id: string
  name: string
  duration: string
  price: string
  perMonth: string
  badge?: string
  highlight?: boolean
  savingsNote?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "6-months",
    name: "6 Months",
    duration: "for 6 months",
    price: "₹3,499",
    perMonth: "about ₹583/month",
  },
  {
    id: "12-months",
    name: "12 Months",
    duration: "for 12 months",
    price: "₹5,999",
    perMonth: "about ₹500/month",
    badge: "Best Value",
    highlight: true,
    savingsNote: "Save ₹999 vs two 6-month plans",
  },
]

export const planFeatures = [
  "Full access to both tools",
  "AI Google Review & Reply tool",
  "Digital Loyalty Program (stamp cards)",
  "Your own QR code",
  "Owner dashboard",
]

export const perBranchNote =
  "Price is per branch. Every branch is a separate sign-up with its own QR code, loyalty offer, and dashboard."

export const branchSteps = [
  { title: "Sign up your first branch", text: "Pick the 6 or 12 month plan for your first location." },
  { title: "Get its QR code and set its offer", text: "We set up the QR code, review tool and loyalty offer for that branch." },
  { title: "Sign up each extra branch the same way", text: "Every extra branch gets its own QR code, offer and dashboard." },
]

export const pricingHelpLine = "Not sure which one fits? Book a demo and we'll help you choose."
