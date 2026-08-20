/**
 * Vercel Serverless Function — /api/chat
 *
 * CATATAN FREE TIER GEMINI:
 * - gemini-2.5-flash: ~1.500 request/hari, 1.000.000 token/menit (cek batas terkini di aistudio.google.com)
 * - Data yang dikirim ke Gemini FREE tier berpotensi digunakan Google untuk training model.
 *   Tidak masalah untuk use case ini karena tidak ada data sensitif pengguna yang dikirim.
 * - Jika traffic tinggi, pertimbangkan upgrade ke plan berbayar atau tambah rate limiting per IP.
 */

import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent'
  
const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY_PAIRS = 10

const SYSTEM_PROMPT = `You are the personal assistant of Fandi Ardyan, a Fullstack Developer based in Indonesia.
You represent Fandi on his portfolio website and speak on his behalf.
Answer questions about his skills, experience, projects, and how to work with him.

ABOUT FANDI:
- Fullstack Developer with 2+ years of hands-on experience
- Specializes in building scalable, production-ready web applications end-to-end
- Has real freelance experience: scoping requirements, shipping code, deploying to production
- Available for freelance projects and full-time opportunities
- Based in Indonesia

TECH SKILLS:
Frontend: React, Next.js, JavaScript, TypeScript, TailwindCSS
Backend: Node.js, Express, MongoDB, PostgreSQL, Firebase
Tools & DevOps: Git, Docker, Vercel, Figma, Postman

PROJECTS:
1. Gas Rental
   Car rental platform built for a local business. Features real-time booking, admin dashboard, and payment integration. Handles 50+ monthly bookings.
   Stack: React, Node.js, MongoDB, TailwindCSS

2. Clip Automator
   AI-powered tool that auto-generates video clips from URLs or uploads. Supports batch processing, smart highlight detection, and multi-format export. Cuts editing time by 80%.
   Stack: React, Node.js, FFmpeg, OpenAI API

3. ChatServer
   Real-time chat system with WebSocket rooms, direct messaging, push notifications, and persistent message history. Handles 200+ concurrent users.
   Stack: Node.js, Socket.io, Express, MongoDB

EXPERIENCE:
- Future Talks Coordinator @ Mindworks Lab (Apr–Aug 2025, Contract)
  Program by MindWorks collaborating with Kok Bisa & ThinkPolicy. Focused on team leadership and coordination.
- Assistant Lab Informatics @ University of Muhammadiyah Malang (Jan–Jul 2024, Internship)
  Supported lab setup, maintenance, and assisted students & faculty in daily lab activities.

CONTACT & SOCIAL:
- Email: fandardyy@gmail.com
- WhatsApp: +62 821-4666-7577
- GitHub: github.com/fff9ep
- LinkedIn: linkedin.com/in/fandiardyan
- Location: Indonesia

BEHAVIOR RULES:
1. Refer to Fandi in third person ("Fandi has...", "He specializes in...") — you are his assistant, not him.
2. Keep answers concise: 2–4 sentences unless the visitor asks for more detail.
3. Sound warm, professional, and human — never robotic. Do NOT say "I am an AI", "I am programmed to", or any generic AI disclaimer.
4. If a visitor wants to hire or collaborate, warmly encourage them to reach out via the Contact section or directly on WhatsApp (+62 821-4666-7577).
5. If asked about topics unrelated to Fandi's professional life (e.g. politics, personal life, random trivia), politely redirect: "I'm here to help with questions about Fandi's work — feel free to ask about his skills, projects, or experience!"
6. Never fabricate projects, skills, or experiences not listed above.
7. Detect the visitor's language from their message and reply in the same language (Indonesian or English).`

/**
 * Convert frontend history format { role: 'user'|'assistant', content }
 * ke format Gemini: { role: 'user'|'model', parts: [{ text }] }
 */
function convertHistory(history) {
  return history.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))
}

export default async function handler(req, res) {
  console.log('CWD:', process.cwd())
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('Total env count:', Object.keys(process.env).length)
  console.log('ENV KEYS:', Object.keys(process.env).filter(k => k.includes('GEMINI')))
  // ── CORS headers ─────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  // ── Method guard ─────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  // ── API key guard ────────────────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[chat] GEMINI_API_KEY is not set.')
    return res.status(500).json({ error: 'Service is temporarily unavailable. Please try again later.' })
  }

  // ── Input validation ─────────────────────────────────────────────
  const { message, history = [] } = req.body ?? {}

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' })
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.` })
  }

  if (!Array.isArray(history) || history.length > MAX_HISTORY_PAIRS * 2) {
    return res.status(400).json({ error: 'Conversation history is too long.' })
  }

  // ── Build Gemini request body ────────────────────────────────────
  const contents = [
    ...convertHistory(history),
    { role: 'user', parts: [{ text: message.trim() }] },
  ]

  const geminiBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  }

  // ── Call Gemini API ──────────────────────────────────────────────
  let geminiRes
  try {
    geminiRes = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
  },
    body: JSON.stringify(geminiBody),
  })
  } catch (networkErr) {
    console.error('[chat] Network error calling Gemini:', networkErr)
    return res.status(502).json({ error: 'Could not reach the AI service. Please try again.' })
  }

  // ── Handle Gemini HTTP errors ────────────────────────────────────
  if (!geminiRes.ok) {
    const status = geminiRes.status
    const errorBody = await geminiRes.text()
    console.error(`[chat] Gemini returned HTTP ${status}:`, errorBody)

    if (status === 429) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment and try again.' })
    }
    if (status === 400 || status === 403) {
      return res.status(502).json({ error: 'AI service configuration error. Please contact Fandi directly.' })
    }
    return res.status(502).json({ error: 'AI service is currently unavailable. Please try again later.' })
  }

  // ── Parse Gemini response ────────────────────────────────────────
  let data
  try {
    data = await geminiRes.json()
  } catch (parseErr) {
    console.error('[chat] Failed to parse Gemini response:', parseErr)
    return res.status(502).json({ error: 'Unexpected response from AI service.' })
  }

  // Safety filter / empty candidates
  const candidate = data?.candidates?.[0]
  if (!candidate) {
    console.warn('[chat] Gemini returned no candidates. Full response:', JSON.stringify(data))
    return res.status(200).json({ error: "I couldn't generate a response for that. Could you try rephrasing?" })
  }

  // Blocked by safety filter
  if (candidate.finishReason === 'SAFETY' || candidate.finishReason === 'RECITATION') {
    return res.status(200).json({ error: "That topic is outside what I can help with. Feel free to ask about Fandi's work!" })
  }

  const reply = candidate?.content?.parts?.[0]?.text
  if (!reply) {
    console.warn('[chat] Gemini candidate has no text. Candidate:', JSON.stringify(candidate))
    return res.status(200).json({ error: "I couldn't generate a response. Please try again." })
  }

  // ── Success ──────────────────────────────────────────────────────
  return res.status(200).json({ reply: reply.trim() })
}
