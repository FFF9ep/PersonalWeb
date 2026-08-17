import { SectionWrapper, SectionHeading, Card } from './ui'
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
        title="About Me"
        subtitle="Building practical solutions with real-world impact."
      />

      <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
        {/* Bio */}
        <div className="md:col-span-3 space-y-5">
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

          {/* Stats */}
          <div ref={statsRef} className="flex gap-6 pt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <AskAIButton className="mt-6" />
        </div>

        {/* Highlight cards — using Card primitive */}
        <div className="md:col-span-2 space-y-4">
          {highlights.map((item) => (
            <Card key={item.title} className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  {item.icon ? (
                    <item.icon className="text-accent" size={18} />
                  ) : (
                    <span className="text-accent text-sm">{item.emoji}</span>
                  )}
                </div>
                <h3 className="font-semibold text-text-primary text-sm">{item.title}</h3>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
