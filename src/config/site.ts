// All editable business details live here. Change a value and it updates across the whole site.

export const siteConfig = {
  name: "Urban Growlyst",
  tagline: "From Google search to loyal customer.",
  description:
    "Urban Growlyst helps businesses get found on Google, earn more 5-star reviews, and bring customers back again and again, all in one platform.",

  // Your live website address (used for SEO, sitemap and social previews).
  url: "https://urbangrowlyst.com",

  // To use your own logo: put the image in the /public folder (e.g. /public/logo.png)
  // and set logo to "/logo.png". Leave it empty ("") to show the built-in placeholder logo.
  logo: "",

  // Phone / WhatsApp
  phoneDisplay: "+91 9152707095",
  phoneLink: "+919152707095",
  whatsappNumber: "919152707095",
  whatsappMessage: "Hi Urban Growlyst! I'd like to know more about a free demo.",

  email: "urbangrowlyst@gmail.com",
  city: "Mumbai, India",

  socials: {
    instagram: "https://www.instagram.com/urbangrowlyst/",
    facebook: "https://www.facebook.com/profile.php?id=61596279941918",
  },

  ctaLabel: "Book a Free Demo",
  trustLine: "Built for cafés, salons, gyms, clinics, restaurants and local shops",
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`

export const mainNav = [
  { label: "How it Works", href: "/how-it-works" },
  { label: "AI Review Tool", href: "/ai-review-tool" },
  { label: "Loyalty Program", href: "/loyalty-program" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
]

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "AI Review Tool", href: "/ai-review-tool" },
  { label: "Loyalty Program", href: "/loyalty-program" },
  { label: "Pricing", href: "/pricing" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "FAQ", href: "/faq" },
  { label: "Book a Demo", href: "/book-a-demo" },
]

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
]

export const businessTypes = ["Café", "Restaurant", "Salon", "Gym", "Clinic", "Retail", "Other"]
export const branchOptions = ["1", "2", "3", "4 to 5", "6 or more"]
export const preferredTimes = ["Morning", "Afternoon", "Evening"]
