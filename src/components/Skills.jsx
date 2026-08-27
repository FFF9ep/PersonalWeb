import { SectionWrapper, SectionHeading } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillCategories } from '../data/skills'

function SkillRow({ skill, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      className="group flex items-center gap-2.5 py-1.5 transition-colors duration-150"
      style={{ '--skill-color': skill.color }}
    >
      <skill.icon
        size={14}
        className="text-text-muted shrink-0 transition-colors duration-150 group-hover:text-[var(--skill-color)]"
      />
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-150">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        number="02"
        title="Skills & Technologies"
        subtitle="The tools and technologies I use to bring ideas to life."
      />

      <div className="grid md:grid-cols-3 gap-10 md:gap-12">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-widest pb-3 mb-4 border-b border-border">
              {category.title}
            </h3>
            <div className="space-y-0.5">
              {category.skills.map((skill, j) => (
                <SkillRow key={skill.name} skill={skill} delay={j * 0.04} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
