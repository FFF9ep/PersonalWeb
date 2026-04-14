import { SectionWrapper, SectionHeading } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillCategories } from '../data/skills'

function SkillCard({ skill, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay }}
      className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/30 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${skill.color}15` }}
      >
        <skill.icon size={16} style={{ color: skill.color }} />
      </div>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
        {skill.name}
      </span>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        title="Skills & Technologies"
        subtitle="The tools and technologies I use to bring ideas to life."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title}>
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              {category.title}
            </h3>
            <div className="space-y-2.5">
              {category.skills.map((skill, j) => (
                <SkillCard key={skill.name} skill={skill} delay={j * 0.06} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
