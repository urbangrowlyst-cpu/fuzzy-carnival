// Shared page content (journey steps, FAQs, use cases). Edit text here to update it everywhere.

export const journeySteps = [
  {
    title: "Found on Google",
    short: "Show up when locals search",
    text: "Keyword-rich reviews help your business appear higher in Google Maps and local search, right when people are looking.",
    tool: "growth",
  },
  {
    title: "Trusted through reviews",
    short: "Build 5-star trust",
    text: "A steady stream of fresh, genuine 5-star reviews and professional replies makes new customers confident to choose you.",
    tool: "growth",
  },
  {
    title: "First visit",
    short: "Turn searchers into visitors",
    text: "The customer walks in, scans your QR code at the counter and instantly gets a digital stamp card. No app needed.",
    tool: "retention",
  },
  {
    title: "Repeat visits",
    short: "Give them a reason to return",
    text: "Every visit earns a stamp. Your reward offer pulls them back to you instead of the competitor down the road.",
    tool: "retention",
  },
  {
    title: "Loyal customer",
    short: "Regulars who spread the word",
    text: "They unlock their reward, keep coming back and recommend you to friends. That is growth that keeps paying.",
    tool: "retention",
  },
] as const

export const faqs = [
  {
    q: "Are AI reviews safe and compliant?",
    a: "Yes. Our AI only suggests a draft based on what the real customer liked. The customer reads it, can edit it freely, and posts it from their own Google account. Reviews always come from genuine customers who actually visited your business.",
  },
  {
    q: "How does the QR code work?",
    a: "We give you a QR code to place at your counter, tables or bill folder. Customers scan it with their phone camera. They can then write a Google review in seconds and collect their loyalty stamp.",
  },
  {
    q: "Do customers need to download an app?",
    a: "No. Everything opens in the phone's browser. The digital stamp card works instantly, so there's nothing to download or sign up for.",
  },
  {
    q: "How long does setup take?",
    a: "Usually just a few minutes. We set up your QR code, review tool and loyalty offer for you during onboarding, so you can start the same day.",
  },
  {
    q: "Can I change my loyalty offer later?",
    a: "Yes, anytime. You can change the reward and the number of visits from your owner dashboard whenever you like, for example for festive seasons.",
  },
  {
    q: "I have more than one branch. How does pricing work?",
    a: "Each branch is a separate sign-up at the same price, so every branch gets its own QR code, loyalty offer, and dashboard.",
  },
]

export const useCases = [
  {
    id: "cafe",
    label: "Café",
    business: "Brew & Bean Café",
    offer: "Visit 4 times, get your 5th coffee free",
    stamps: 5,
    review:
      "Lovely little café in Bandra with the best cappuccino I've had in Mumbai. Cosy seating, fast Wi-Fi and super friendly staff. Perfect spot to work or catch up with friends.",
    keywords: ["café in Bandra", "best cappuccino", "work-friendly café"],
  },
  {
    id: "salon",
    label: "Salon",
    business: "Glow Studio Salon",
    offer: "Get a free haircut on your 6th visit",
    stamps: 6,
    review:
      "Glow Studio is my go-to hair salon in Andheri. The stylist understood exactly what I wanted, the place is spotless and the hair spa was so relaxing. Highly recommend!",
    keywords: ["hair salon in Andheri", "hair spa", "skilled stylists"],
  },
  {
    id: "gym",
    label: "Gym",
    business: "IronCore Fitness",
    offer: "Check in 10 times, get a free personal training session",
    stamps: 10,
    review:
      "Great gym in Powai with modern equipment and helpful trainers. Clean changing rooms and it never feels too crowded. The personal training really helped me get stronger.",
    keywords: ["gym in Powai", "personal trainer", "modern equipment"],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    business: "Spice Route Kitchen",
    offer: "Dine 5 times, get a free dessert platter",
    stamps: 5,
    review:
      "Authentic North Indian food in Thane! The butter chicken and garlic naan were amazing, portions are generous and service is quick. Perfect for family dinners.",
    keywords: ["North Indian restaurant in Thane", "butter chicken", "family dinner"],
  },
  {
    id: "clinic",
    label: "Clinic",
    business: "SmileCare Dental Clinic",
    offer: "15% off your 3rd check-up or cleaning",
    stamps: 3,
    review:
      "Very professional dental clinic in Dadar. The doctor explained everything clearly, the treatment was painless and the clinic is very hygienic. Booking was easy too.",
    keywords: ["dental clinic in Dadar", "painless treatment", "hygienic clinic"],
  },
]
