import { SectionWrapper, SectionHeading } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiBriefcase, HiStar } from 'react-icons/hi'

const experiences = [
  {
    period: '2024 — Present',
    role: 'Freelance Fullstack Developer',
    company: 'Self-employed',
    description:
      'Working with diverse clients to build custom web applications, from e-commerce platforms to SaaS dashboards. Handling the entire development lifecycle independently — from requirements gathering to deployment and maintenance.',
    achievements: [
      'Delivered 10+ client projects on time and within budget',
      'Built scalable applications serving thousands of users',
      'Maintained 5-star client satisfaction ratings',
    ],
    type: 'freelance',
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Developer',
    company: 'Tech Startup',
    description:
      'Collaborated with a small team to build and ship product features for a B2B SaaS platform. Focused on creating responsive, accessible UI components and improving application performance.',
    achievements: [
      'Reduced page load time by 40% through code optimization',
      'Implemented design system used across 15+ pages',
      'Mentored junior developers on React best practices',
    ],
    type: 'employment',
  },
  {
    period: '2022 — 2023',
    role: 'Web Development Intern',
    company: 'Digital Agency',
    description:
      'Gained foundational experience in web development working on client projects. Learned agile methodologies, version control workflows, and professional coding standards.',
    achievements: [
      'Contributed to 5 client-facing projects',
      'Built reusable component library for the team',
      'Received full-time offer upon internship completion',
    ],
    type: 'internship',
  },
]

function ExperienceCard({ exp, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-[11px] top-3 bottom-0 w-px bg-border/50 last:hidden" />

      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-[23px] h-[23px] rounded-full bg-primary border-2 border-accent/50 flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
      </div>

      {/* Card */}
      <div className="p-5 md:p-6 rounded-2xl bg-secondary/30 border border-border/30 shadow-lg hover:border-accent/20 hover:shadow-xl transition-all duration-300 group">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors text-base md:text-lg">
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <HiBriefcase className="text-accent/60" size={14} />
              <span className="text-text-secondary">{exp.company}</span>
            </div>
          </div>
          <span className="text-xs text-text-muted bg-primary/50 px-3 py-1.5 rounded-lg border border-border/30 whitespace-nowrap self-start">
            {exp.period}
          </span>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {exp.description}
        </p>

        <ul className="space-y-2">
          {exp.achievements.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <HiStar className="text-accent/70 mt-0.5 shrink-0" size={14} />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey and key accomplishments."
      />

      <div className="max-w-3xl">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.period} exp={exp} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
