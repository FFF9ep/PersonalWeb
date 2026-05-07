import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/30 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">FA</span>
            </div>
            <div>
              <p className="font-semibold text-text-primary text-sm">
                Fandi Ardyan
              </p>
              <p className="text-xs text-text-muted">
                Fullstack Developer
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { icon: FiGithub, href: 'https://github.com/fff9ep', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/fandiardyan', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:fandardyy@gmail.com', label: 'Email' },
              { icon: FaWhatsapp, href: 'https://wa.me/082146667577', label: 'WhatsApp' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/30 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-300"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {currentYear} Fandi Ardyan. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Built with <span className="text-accent">React</span> &{' '}
            <span className="text-accent">TailwindCSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
