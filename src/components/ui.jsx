import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ─── Layout ─────────────────────────────────────────────────────── */

export function SectionWrapper({ children, id, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id={id} ref={ref} className={`py-20 md:py-32 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function SectionHeading({ number, title, subtitle }) {
  return (
    <div className="mb-16 md:mb-20">
      {number && (
        <span className="block text-sm font-medium text-text-muted tracking-widest mb-3">
          {number}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}

/* ─── Card ────────────────────────────────────────────────────────── */

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-card p-5 md:p-6 rounded-xl border border-border ${
        hover ? 'hover:bg-card-hover hover:border-text-muted/30' : ''
      } transition-colors duration-150 ${className}`}
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
      className={`px-2 py-0.5 text-xs font-medium rounded-md bg-secondary text-text-secondary border border-border ${className}`}
    >
      {children}
    </span>
  )
}

/* ─── Button ──────────────────────────────────────────────────────── */

export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-150 cursor-pointer'
  const variants = {
    primary: 'bg-accent text-primary hover:bg-accent-hover',
    secondary: 'border border-border text-text-secondary hover:bg-secondary hover:border-text-muted/30 hover:text-accent',
    ghost: 'text-text-secondary hover:bg-secondary hover:text-accent',
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

const inputBase = 'w-full px-4 py-3 rounded-lg bg-primary border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-colors duration-150'

export function Input({ label, id, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
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
        <label htmlFor={id} className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2 block">
          {label}
        </label>
      )}
      <textarea id={id} className={`${inputBase} resize-none ${className}`} {...props} />
    </div>
  )
}
