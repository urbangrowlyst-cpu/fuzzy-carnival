"use server"

import { branchOptions, businessTypes, preferredTimes } from "@/src/config/site"

export type DemoRequest = {
  name: string
  businessName: string
  phone: string
  businessType: string
  branches: string
  preferredTime: string
}

export type DemoResult = { ok: true } | { ok: false; message: string }

// Telegram credentials come from the environment:
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. Never commit them.

const clean = (value: unknown, max = 120) => (typeof value === "string" ? value.trim().slice(0, max) : "")

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// Sends the request to the Google Sheet (optional, only if GOOGLE_SHEET_WEBHOOK_URL is set).
async function sendToSheet(webhookUrl: string, data: DemoRequest) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Google Sheet webhook responded with ${res.status}`)
}

// Sends the request to Telegram (only if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set).
async function sendToTelegram(token: string, chatId: string, data: DemoRequest) {
  const lines = [
    "<b>🔔 New demo request</b>",
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    data.businessName && `<b>Business:</b> ${escapeHtml(data.businessName)}`,
    `<b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.businessType && `<b>Business type:</b> ${escapeHtml(data.businessType)}`,
    data.branches && `<b>Branches:</b> ${escapeHtml(data.branches)}`,
    data.preferredTime && `<b>Preferred call time:</b> ${escapeHtml(data.preferredTime)}`,
  ].filter(Boolean)

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join("\n"),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) {
    // Log only the status and Telegram's description, never the token.
    let description = ""
    try {
      description = ((await res.json()) as { description?: string }).description ?? ""
    } catch {}
    throw new Error(`Telegram responded with ${res.status} ${description}`.trim())
  }
}

export async function submitDemoRequest(input: DemoRequest, variant: "full" | "compact"): Promise<DemoResult> {
  const data: DemoRequest = {
    name: clean(input.name, 80),
    businessName: clean(input.businessName, 120),
    phone: clean(input.phone, 20),
    businessType: clean(input.businessType, 40),
    branches: clean(input.branches, 20),
    preferredTime: clean(input.preferredTime, 20),
  }

  if (data.name.length < 2) return { ok: false, message: "Please enter your name." }

  // Accept a 10-digit Indian mobile number (optionally with a leading 91) that starts with 6, 7, 8 or 9.
  let digits = data.phone.replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
  if (!/^[6-9]\d{9}$/.test(digits)) return { ok: false, message: "Please enter a valid 10-digit mobile number." }
  data.phone = digits

  if (variant === "full") {
    if (data.businessName.length < 2) return { ok: false, message: "Please enter your business name." }
    if (!businessTypes.includes(data.businessType)) return { ok: false, message: "Please choose your business type." }
    if (!branchOptions.includes(data.branches)) return { ok: false, message: "Please choose your number of branches." }
    if (!preferredTimes.includes(data.preferredTime)) return { ok: false, message: "Please choose a preferred time." }
  } else {
    data.businessName = ""
    data.businessType = ""
    data.branches = ""
    data.preferredTime = ""
  }

  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim()

  const jobs: Promise<void>[] = []
  if (sheetUrl) jobs.push(sendToSheet(sheetUrl, data))

  if (telegramToken && telegramChatId) {
    if (/^-?\d+$/.test(telegramChatId)) {
      jobs.push(sendToTelegram(telegramToken, telegramChatId, data))
    } else {
      console.error("Telegram skipped: TELEGRAM_CHAT_ID must be a numeric chat ID")
    }
  } else if (telegramToken || telegramChatId) {
    console.error("Telegram skipped: set both TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID")
  }

  if (jobs.length === 0) {
    console.error("No destination set: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (or GOOGLE_SHEET_WEBHOOK_URL)")
    return { ok: false, message: "Sorry, we couldn't send your request right now. Please call or WhatsApp us instead." }
  }

  // The request counts as sent if at least one destination received it.
  const results = await Promise.allSettled(jobs)
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Demo request destination failed:", r.reason instanceof Error ? r.reason.message : "unknown error")
  })

  if (results.some((r) => r.status === "fulfilled")) return { ok: true }

  return {
    ok: false,
    message: "Sorry, something went wrong while sending your request. Please try again or WhatsApp us.",
  }
}
