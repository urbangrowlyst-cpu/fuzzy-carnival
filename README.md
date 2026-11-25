# Urban Growlyst — Website

Marketing site for **Urban Growlyst**, Mumbai. Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

The design uses a print-shop visual system: forest-green enamel, warm newsprint paper, tomato-red stamps, marigold accents, hard offset shadows and ledger rules. No stock photos — every visual is CSS/SVG.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, the loop, two tools, why it works, price list, demo form |
| `/how-it-works` | Step-by-step timeline |
| `/ai-review-tool` | Interactive Google review demo |
| `/loyalty-program` | Interactive digital stamp-card demo |
| `/pricing` | Full price list and branch details |
| `/use-cases` | Tabs for cafés, salons, gyms, clinics, restaurants, retail |
| `/faq` | Accordion FAQ and contact card |
| `/book-a-demo` | Booking-slip demo request form |
| `/privacy`, `/terms` | Legal pages |
| any unknown URL | Printed 404 ticket |

## Run locally

Requires **Node.js 20 or newer** (the site was built and tested on Node 22).

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in the required values. `.env.local` is ignored by Git.

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

## Demo form

`app/actions/submit-demo.ts` is a server action. It sends each request to:

1. **Telegram** — uses the `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables. If either is missing, Telegram is skipped.
2. **Google Sheets** (optional) — only when `GOOGLE_SHEET_WEBHOOK_URL` is set. `google-apps-script.js` is the Apps Script to deploy for this.

Copy `.env.example` to `.env.local` for local development. On Vercel, add the same variables in Project Settings → Environment Variables.

> **Security:** the Telegram token is no longer stored in the code. The old token still exists in earlier Git history, so revoke/rotate it in BotFather if this repository is ever made public, then set the new token in Vercel.

## Deploy

### Vercel

Add these in Project Settings → Environment Variables (Production, Preview and Development):

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `GOOGLE_SHEET_WEBHOOK_URL` (optional)

Redeploy after adding or changing them.

### Netlify

Netlify configuration is included (`netlify.toml` plus `@netlify/plugin-nextjs`):

- Connect the repository, keep the build command `npm run build`.
- Add `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` and optionally `GOOGLE_SHEET_WEBHOOK_URL` in Site settings → Environment variables.

## Where to edit

- `src/config/site.ts` — business name, phone, email, socials, navigation, form options.
- `src/config/content.ts` — shared copy blocks.
- `app/*/page.tsx` — page content.
- `components/` — sections, layout and interactive demos.
- `app/globals.css` — the green design system: tokens, type, buttons, paper grain and stamp effects.
- `public/` — icons and images.
- **Prices:** constants at the top of `app/pricing/page.tsx` and the `lines` array in `components/home/pricing-teaser.tsx`. Keep the two in sync.

## Logo and brand assets

- `components/layout/logo.tsx` — the G postmark used in the navbar and footer.
- `public/logo-mark.svg` — primary mark; `public/logo-mark-reversed.svg` for dark backgrounds.
- `public/logo-lockup.png` / `public/logo-lockup-light.png` — transparent mark + wordmark lockups.
- `public/icon.svg` / `public/apple-icon.png` — favicon and app icon.
- `public/logo-sheet.png` — one-page brand sheet with sizes and colours.

## Notes

- Demo reviews, search results and stamp cards on the site are labelled examples and are not real customer data.
- The project has no analytics keys, image APIs or external database. It runs as a static+server-action Next.js app.
