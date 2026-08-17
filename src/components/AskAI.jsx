import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChatAlt2 } from 'react-icons/hi'
import { FiSend } from 'react-icons/fi'

/* ─── Constants ───────────────────────────────────────────────────── */

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  content:
    "👋 Hi! I'm Fandi's assistant. Ask me anything about his skills, projects, experience, or how to work with him.",
}

/* ─── Typing indicator ────────────────────────────────────────────── */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm bg-secondary/50 border border-border/30 w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-text-muted"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── Message bubble ──────────────────────────────────────────────── */

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <p
        className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-accent/10 border border-accent/20 text-text-primary rounded-2xl rounded-br-sm'
            : 'bg-secondary/50 border border-border/30 text-text-secondary rounded-2xl rounded-bl-sm'
        }`}
      >
        {message.content}
      </p>
    </motion.div>
  )
}

/* ─── Error bubble ────────────────────────────────────────────────── */

function ErrorBubble({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex justify-start"
    >
      <p className="max-w-[82%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm bg-red-500/10 border border-red-500/20 text-red-400 leading-relaxed">
        {message}
      </p>
    </motion.div>
  )
}

/* ─── Modal ───────────────────────────────────────────────────────── */

function AskAIModal({ onClose }) {
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, error])

  // Focus input on mount
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 150)
    return () => clearTimeout(timer)
  }, [])

  // Close on Escape — same pattern as Navbar mobile menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    // Build clean history: exclude the static greeting, only real turns
    const apiHistory = messages
      .filter((m) => m.id !== 'greeting')
      .map(({ role, content }) => ({ role, content }))

    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: trimmed }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history: apiHistory }),
      })

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setMessages((prev) => [
          ...prev,
          { id: `a-${Date.now()}`, role: 'assistant', content: data.reply },
        ])
      }
    } catch {
      setError('Connection error. Please check your internet and try again.')
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    /* ── Overlay — sama seperti overlay di komponen lain ─────────── */
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 bg-primary/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* ── Panel — animasi sama seperti mobile menu di Navbar ────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full sm:max-w-lg flex flex-col bg-primary border border-border/50 shadow-2xl shadow-black/40
                   h-[88svh] sm:h-[600px] rounded-t-2xl sm:rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">FA</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-text-primary leading-tight">Ask about Fandi</p>
              <p className="text-xs text-text-muted">AI assistant · Replies instantly</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted
                       hover:text-accent hover:bg-accent/10 transition-colors duration-200"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {error && <ErrorBubble message={error} />}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="px-4 py-4 border-t border-border/30 shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about skills, projects, experience..."
              maxLength={500}
              disabled={isLoading}
              aria-label="Your message"
              className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/50 border border-border/40 text-text-primary text-sm
                         placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20
                         transition-all duration-300 disabled:opacity-50"
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              whileTap={{ scale: 0.95 }}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0
                         hover:bg-accent-hover transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <FiSend size={15} />
            </motion.button>
          </div>
          <p className="text-[11px] text-text-muted mt-2 text-center">
            Powered by Gemini · May occasionally make mistakes
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Trigger button ─────────────────────────────────────────────── */
/* Di-export dan dipakai di Hero.jsx + About.jsx                      */

export function AskAIButton({ className = '' }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-ask-ai'))
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border
                 text-text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent
                 hover:scale-105 active:scale-97 transition-all duration-200 cursor-pointer ${className}`}
    >
      <HiChatAlt2 size={16} />
      Ask AI About Me
    </button>
  )
}

/* ─── Root modal controller ──────────────────────────────────────── */
/* Di-render di App.jsx (di luar <main>, sejajar dengan Navbar)       */

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false)

  // Dengarkan custom event dari AskAIButton manapun
  useEffect(() => {
    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-ask-ai', handleOpen)
    return () => window.removeEventListener('open-ask-ai', handleOpen)
  }, [])

  // Lock body scroll saat modal terbuka — sama seperti Navbar mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && <AskAIModal onClose={() => setIsOpen(false)} />}
    </AnimatePresence>
  )
}
