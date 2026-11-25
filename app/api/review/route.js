import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 30

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { handleReviewRequest } = require("../../../server/review-handler.js")

async function run(request) {
  const headers = Object.fromEntries(request.headers.entries())
  let body = null
  try {
    body = await request.text()
  } catch {
    body = null
  }
  return handleReviewRequest({
    method: request.method,
    headers,
    body,
    ip: null,
  })
}

export async function GET(request) {
  const result = await run(request)
  return new NextResponse(result.body, { status: result.status, headers: result.headers })
}

export async function POST(request) {
  const result = await run(request)
  return new NextResponse(result.body, { status: result.status, headers: result.headers })
}

export async function OPTIONS(request) {
  const result = await run(request)
  return new NextResponse(result.body, { status: result.status, headers: result.headers })
}
