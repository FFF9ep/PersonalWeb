import { SectionWrapper, SectionHeading, Badge } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'

function ProjectImage({ src, alt, gradient, emoji, featured }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
        <div className="absolute top-5 left-6 w-12 h-12 rounded-xl bg-primary/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl">
          {emoji}
        </div>
        {featured && (
          <span className="absolute top-5 right-5 px-2.5 py-1 rounded-lg bg-accent/90 text-primary text-xs font-semibold backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="h-48 relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
      <div className="absolute top-4 left-5 w-10 h-10 rounded-xl bg-primary/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg">
        {emoji}
      </div>
      {featured && (
        <span className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-accent/90 text-primary text-xs font-semibold backdrop-blur-sm">
          Featured
        </span>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="group rounded-2xl border border-border/40 bg-secondary/30 shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
    >
      <ProjectImage
        src={project.image}
        alt={project.title}
        gradient={project.gradient}
        emoji={project.emoji}
        featured={project.featured}
      />

      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border/30">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
          >
            <FiExternalLink size={14} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
          >
            <FiGithub size={14} />
            Source Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        title="Projects"
        subtitle="Real-world applications I've built and shipped."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  )
}
