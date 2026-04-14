import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ─── Layout ─────────────────────────────────────────────────────── */

export function SectionWrapper({ children, id, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
        {title}
        <span className="text-accent">.</span>
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
      <div className="w-16 h-1 bg-accent rounded-full mt-4" />
    </div>
  )
}

/* ─── Card ────────────────────────────────────────────────────────── */

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-secondary/50 p-6 rounded-2xl shadow-lg border border-border/40 ${
        hover ? 'hover:-translate-y-1 hover:shadow-xl hover:border-accent/20' : ''
      } transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/* ─── Badge ───────────────────────────────────────────────────────── */

export function Badge({ children, className = '' }) {
  return (
    <span
      className={`px-2.5 py-1 text-xs rounded-lg bg-primary/50 text-text-secondary border border-border/30 ${className}`}
    >
      {children}
    </span>
  )
}

/* ─── Button ──────────────────────────────────────────────────────── */

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer hover:scale-105 active:scale-97'
  const variants = {
    primary: 'bg-accent text-primary btn-glow hover:bg-accent-hover',
    secondary: 'border border-border text-text-secondary hover:border-accent/40 hover:text-accent',
    ghost: 'text-text-secondary hover:text-accent',
  }

  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ─── Input ───────────────────────────────────────────────────────── */

const inputBase = 'w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/40 text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300'

export function Input({ label, id, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-xs text-text-muted uppercase tracking-wider mb-2 block">
          {label}
        </label>
      )}
      <input id={id} className={`${inputBase} ${className}`} {...props} />
    </div>
  )
}

/* ─── Textarea ────────────────────────────────────────────────────── */

export function Textarea({ label, id, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-xs text-text-muted uppercase tracking-wider mb-2 block">
          {label}
        </label>
      )}
      <textarea id={id} className={`${inputBase} resize-none ${className}`} {...props} />
    </div>
  )
}
