import { SectionWrapper, SectionHeading, Badge } from './ui'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { projects } from '../data/projects'

/* ─── Featured project image (reused from before, with error fallback) ─── */

function ProjectImage({ src, alt, gradient, emoji }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`w-full h-full min-h-[200px] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
        <div className="absolute top-5 left-6 w-12 h-12 rounded-xl bg-primary/40 border border-border/20 flex items-center justify-center text-2xl">
          {emoji}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full min-h-[200px] relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
      <div className="absolute top-4 left-5 w-10 h-10 rounded-xl bg-primary/50 border border-border/20 flex items-center justify-center text-lg">
        {emoji}
      </div>
    </div>
  )
}

/* ─── Featured project card — horizontal layout ────────────────────────── */

function FeaturedProject({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.12 }}
      className="group rounded-xl border border-border bg-card overflow-hidden hover:bg-card-hover hover:border-text-muted/30 transition-colors duration-150"
    >
      <div className="grid md:grid-cols-5">
        {/* Image — left 40% */}
        <div className="md:col-span-2 h-56 md:h-auto">
          <ProjectImage
            src={project.image}
            alt={project.title}
            gradient={project.gradient}
            emoji={project.emoji}
          />
        </div>

        {/* Content — right 60% */}
        <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
          <span className="text-xs text-text-muted uppercase tracking-widest mb-2">Featured</span>
          <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-150">
            {project.title}
          </h3>
          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <FiExternalLink size={14} />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <FiGithub size={14} />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Non-featured project — compact row, no image ─────────────────────── */

function CompactProject({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.1 }}
      className="group py-6 border-b border-border last:border-b-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
          >
            <FiExternalLink size={14} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary transition-colors duration-150"
          >
            <FiGithub size={14} />
            Source Code
          </a>
        </div>
      </div>
      <p className="text-text-muted text-sm leading-relaxed mb-3 max-w-2xl">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Main ─────────────────────────────────────────────────────────────── */

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        number="03"
        title="Projects"
        subtitle="Real-world applications I've built and shipped."
      />

      {/* Featured projects — horizontal cards, one per row */}
      <div className="space-y-6 mb-12">
        {featured.map((project, i) => (
          <FeaturedProject key={project.title} project={project} index={i} />
        ))}
      </div>

      {/* Non-featured projects — compact list */}
      {others.length > 0 && (
        <div className="border-t border-border">
          {others.map((project, i) => (
            <CompactProject key={project.title} project={project} index={i} />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
