import { motion } from 'framer-motion'
import { HiArrowDown, HiOutlineMail } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { AskAIButton } from './AskAI'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 w-full py-32 md:py-40">
        <div className="flex flex-col items-start text-left">
          {/* Intro label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm text-text-muted tracking-wide mb-4"
          >
            Hi, I'm
          </motion.span>

          {/* Name — split across two lines for typographic impact */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.95] text-text-primary mb-0"
          >
            Fandi<br />Ardyan
          </motion.h1>

          {/* Divider */}
          <motion.hr
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full max-w-xs border-t border-border my-8 origin-left"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-text-secondary font-light mb-4 max-w-xl"
          >
            Fullstack Developer with Real-World Execution Experience
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-text-muted text-base md:text-lg mb-10 max-w-lg leading-relaxed"
          >
            I build scalable and practical web solutions with a focus on
            performance, usability, and real-world application.
          </motion.p>

          {/* CTA buttons — left-aligned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-10"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-primary font-semibold text-sm hover:bg-accent-hover transition-colors duration-150"
            >
              View Projects
              <HiArrowDown className="rotate-[-90deg]" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary font-semibold text-sm hover:bg-secondary hover:border-text-muted/30 hover:text-accent transition-colors duration-150"
            >
              <HiOutlineMail />
              Contact Me
            </a>
            <AskAIButton />
          </motion.div>

          {/* Status + Social — single inline row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex items-center gap-4 text-text-muted text-sm"
          >
            <span>Available for work</span>
            <span className="text-border">·</span>
            {[
              { icon: FiGithub, href: 'https://github.com/fff9ep', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/fandiardyan', label: 'LinkedIn' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors duration-150"
              >
                <social.icon size={15} />
                {social.label}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
