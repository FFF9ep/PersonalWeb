import { SectionWrapper, SectionHeading, Input, Textarea } from './ui'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiOutlineMail } from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { FiSend, FiMapPin } from 'react-icons/fi'

const WHATSAPP_NUMBER = '6281234567890'

function buildWhatsAppUrl(name, message) {
  const text = encodeURIComponent(
    `Hi Fandi! 👋\n\nI'm ${name}.\n\n${message}`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

const contactInfo = [
  {
    icon: HiOutlineMail,
    label: 'Email',
    value: 'fandardyy@gmail.com',
    href: 'mailto:fandardyy@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+6282146667577',
    href: `https://wa.me/082146667577`,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: 'Indonesia',
    href: null,
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(buildWhatsAppUrl(formData.name, formData.message), '_blank')
  }

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let's make it happen."
      />

      <div className="grid md:grid-cols-5 gap-10 md:gap-16">
        {/* Contact info */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-text-secondary leading-relaxed text-sm md:text-base">
            Open to new projects, creative ideas, and collaboration.
            I typically respond within 24 hours.
          </p>

          <div className="space-y-4">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <info.icon className="text-accent" size={18} />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-wider">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-text-primary hover:text-accent transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-primary">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:scale-105 transition-all duration-300"
          >
            <FaWhatsapp size={18} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Name"
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />

            <Textarea
              label="Message"
              id="contact-message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
            />

            <div className="flex items-center gap-3">
              <motion.button
                type="submit"
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-primary font-semibold text-sm btn-glow hover:bg-accent-hover hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <FiSend size={14} />
                Send via WhatsApp
              </motion.button>
              <span className="text-xs text-text-muted">
                Opens WhatsApp with your message
              </span>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  )
}
