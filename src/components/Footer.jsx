import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          © {currentYear} Fandi Ardyan. All rights reserved.
        </p>

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
              className="text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
