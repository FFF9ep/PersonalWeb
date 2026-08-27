import { SectionWrapper, SectionHeading } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiCode, HiLightningBolt } from 'react-icons/hi'
import { AskAIButton } from './AskAI'

const stats = [
  { value: '10+', label: 'Projects Delivered' },
  { value: '2+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
]

const highlights = [
  {
    icon: HiCode,
    title: 'Fullstack Focus',
    text: 'End-to-end solutions — frontend to backend to deployment.',
  },
  {
    icon: HiLightningBolt,
    title: 'Freelance Proven',
    text: 'Client-facing experience with real deadlines and deliverables.',
  },
  {
    icon: null,
    emoji: '🚀',
    title: 'Performance First',
    text: 'Optimized loading, efficient queries, and minimal bundle sizes.',
  },
]

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-40px' })

  return (
    <SectionWrapper id="about">
      <SectionHeading
        number="01"
        title="About Me"
        subtitle="Building practical solutions with real-world impact."
      />

      {/* Single-column prose — no grid */}
      <div className="max-w-3xl space-y-5">
        <p className="text-text-secondary leading-relaxed text-base md:text-lg">
          I'm a fullstack developer who turns ideas into production-ready web
          applications. With hands-on freelance experience, I've shipped projects
          end-to-end — from scoping requirements to deploying scalable code.
        </p>
        <p className="text-text-secondary leading-relaxed text-base md:text-lg">
          I focus on clean architecture, performance, and user experience. Whether
          it's a React frontend, a Node.js API, or a full-stack SaaS — I deliver
          solutions that work in the real world.
        </p>
      </div>

      {/* Stats bar — horizontal, border-top + border-bottom */}
      <div
        ref={statsRef}
        className="grid grid-cols-3 border-y border-border my-12 md:my-16 max-w-3xl"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="py-6 md:py-8 text-center"
          >
            <p className="text-2xl md:text-3xl font-extrabold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Highlights — simple list with inline icons, not cards */}
      <div className="max-w-3xl space-y-6">
        {highlights.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="text-text-muted mt-0.5 shrink-0">
              {item.icon ? (
                <item.icon size={16} />
              ) : (
                <span className="text-sm">{item.emoji}</span>
              )}
            </span>
            <div>
              <h3 className="font-semibold text-text-primary text-sm mb-0.5">{item.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <AskAIButton />
      </div>
    </SectionWrapper>
  )
}
