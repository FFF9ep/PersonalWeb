import { SectionWrapper, SectionHeading } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    period: 'Apr 2025 — Agu 2025',
    role: 'Future Talks Coordinator',
    company: 'Mindworks Lab · Kontrak',
    location: 'Area DKI Jakarta · Jarak jauh',
    duration: '5 bln',
    description:
      'Future Talks is a program by MindWorks collaborating with Kok Bisa and ThinkPolicy designed to empower people from diverse backgrounds to better understand the challenges of the future, build critical thinking skills, and inspire action toward solving real-world problems in an ever-changing world.',
    achievements: [
      'Team Leadership',
      'Teamwork',
    ],
    type: 'freelance',
  },
  {
    period: 'Jan 2024 — Jul 2024',
    role: 'Asistant Lab Informatics',
    company: 'University Of Muhammadiyah Malang · Magang',
    location: 'Malang, Jawa Timur, Indonesia · Di lokasi',
    duration: '7 bln',
    description:
      'As an Informatics Laboratory Assistant, the primary responsibilities include supporting the setup, maintenance, and operation of laboratory equipment and assisting students and faculty in various lab activities.',
    achievements: [
      'Team Leadership',
    ],
    type: 'internship',
  },
]

function ExperienceEntry({ exp, index, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className={`py-8 md:py-10 ${!isLast ? 'border-b border-border' : ''}`}
    >
      {/* Top row: role + period */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="font-bold text-text-primary text-lg md:text-xl">
          {exp.role}
        </h3>
        <span className="text-sm text-text-muted whitespace-nowrap">
          {exp.period}
        </span>
      </div>

      {/* Company */}
      <p className="text-sm text-text-secondary mb-4">{exp.company}</p>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed mb-4 max-w-3xl">
        {exp.description}
      </p>

      {/* Achievements — inline text separated by · */}
      <p className="text-sm text-text-secondary">
        {exp.achievements.join(' · ')}
      </p>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        number="04"
        title="Experience"
        subtitle="My professional journey and key accomplishments."
      />

      <div className="max-w-3xl">
        {experiences.map((exp, i) => (
          <ExperienceEntry
            key={exp.period}
            exp={exp}
            index={i}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
