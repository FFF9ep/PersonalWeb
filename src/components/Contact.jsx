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
        number="05"
        title="Get In Touch"
        subtitle="Have a project in mind? Let's make it happen."
      />

      <div className="max-w-3xl">
        {/* Intro text */}
        <p className="text-text-secondary leading-relaxed text-sm md:text-base mb-8">
          Open to new projects, creative ideas, and collaboration.
          I typically respond within 24 hours.
        </p>

        {/* Contact info — horizontal inline row */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
          {contactInfo.map((info) => (
            <div key={info.label} className="flex items-center gap-2 text-sm">
              <info.icon className="text-text-muted shrink-0" size={15} />
              {info.href ? (
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-text-primary hover:text-accent transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <span className="text-text-primary">{info.value}</span>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA — prominent standalone button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-primary text-sm font-semibold hover:bg-accent-hover transition-colors duration-150 mb-12"
        >
          <FaWhatsapp size={18} />
          Chat on WhatsApp
        </a>

        {/* Separator + form section */}
        <div className="border-t border-border pt-10">
          <p className="text-sm text-text-muted mb-6">Or send a message</p>

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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-primary font-semibold text-sm hover:bg-accent-hover transition-colors duration-150 cursor-pointer"
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
