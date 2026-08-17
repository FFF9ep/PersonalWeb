import { motion } from 'framer-motion'
import { HiArrowDown, HiOutlineMail } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { AskAIButton } from './AskAI'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            <span className="text-text-primary">Hi, I'm </span>
            <span className="text-accent relative">
              Fandi Ardyan
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path
                  d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-xl md:text-2xl text-text-secondary font-light mb-6 max-w-2xl"
          >
            Fullstack Developer with Real-World Execution Experience
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-text-muted text-base md:text-lg mb-10 max-w-xl leading-relaxed"
          >
            I build scalable and practical web solutions with a focus on
            performance, usability, and real-world application.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-primary font-semibold text-sm btn-glow hover:bg-accent-hover hover:scale-105 active:scale-97 transition-all duration-200"
            >
              View Projects
              <HiArrowDown className="rotate-[-90deg]" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border text-text-secondary font-medium text-sm hover:border-accent/40 hover:text-accent hover:scale-105 active:scale-97 transition-all duration-200"
            >
              <HiOutlineMail />
              Contact Me
            </a>
            <AskAIButton />
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center gap-4"
          >
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
                className="w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
          <HiArrowDown className="text-accent text-sm" />
        </motion.div>
      </motion.div>
    </section>
  )
}
