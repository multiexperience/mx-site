import './styles.css'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FollowCursor from "@/components/FollowCursor"
import Header from "@/components/Header"
import Menu from "@/components/Menu"
import ServicesSection from '@/components/ServicesSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import GradientBackground from '@/components/GradientBackground'
import TechMarquee from '@/components/TechMarquee'
import ProductSection from '@/components/ProductSection'
import mxFullLogoWhite from '@/assets/mx-logo-full-white.png'
import { useRef, useEffect, useState } from 'react'

function Home() {
  const { t } = useTranslation()
  const contactRef = useRef<HTMLDivElement>(null)
  const darkTransitionRef = useRef<HTMLDivElement>(null)
  const [darkProgress, setDarkProgress] = useState(0)

  // Contact form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const el = darkTransitionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const totalScroll = rect.height - windowHeight
      const scrolled = -rect.top

      if (scrolled <= 0) {
        setDarkProgress(0)
      } else if (scrolled >= totalScroll) {
        setDarkProgress(1)
      } else {
        setDarkProgress(scrolled / totalScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parts = []
    if (formName) parts.push(`*${formName}*`)
    if (formEmail) parts.push(`Email: ${formEmail}`)
    if (formMessage) parts.push(`\n${formMessage}`)
    const text = parts.length > 0
      ? parts.join('\n')
      : t('whatsapp.default_message')
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/5513996773215?text=${encoded}`, '_blank')
  }

  const scrollTo = (anchor: string) => {
    const el = document.querySelector(anchor)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const aboutItems = t('about.card1_items', { returnObjects: true }) as Array<{ title: string; desc: string }>
  const aboutSteps = t('about.card2_steps', { returnObjects: true }) as Array<{ step: string; label: string; desc: string }>
  const footerServices = t('footer.services_items', { returnObjects: true }) as string[]
  const footerCompany = t('footer.company_items', { returnObjects: true }) as string[]
  const footerProducts = t('footer.product_items', { returnObjects: true }) as string[]

  return (
    <>
      <GradientBackground />
      <Menu />
      <Header />

      <main className="relative">
        {/* Tech Stack Marquee */}
        <TechMarquee />

        {/* ========== ABOUT: Who We Are + How We Work ========== */}
        <section id="about" className="contentWidth1400 grid grid-cols-1 xl:grid-cols-2 items-stretch gap-8 md:gap-12 py-12 md:py-20 px-6">
          {/* Card 1 — Who We Are */}
          <FollowCursor className="h-full glass-card-light rounded-2xl p-6 md:p-10 lg:p-14 hover:shadow-xl transition-shadow duration-300">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-mx-purple to-mx-pink flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{t('about.card1_title')}</h2>
              </div>

              <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-600">
                {t('about.card1_intro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 flex-1">
                {aboutItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mx-purple mt-2 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-xs md:text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FollowCursor>

          {/* Card 2 — How We Work */}
          <FollowCursor className="h-full glass-card-light rounded-2xl p-6 md:p-10 lg:p-14 hover:shadow-xl transition-shadow duration-300">
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{t('about.card2_title')}</h2>
              </div>

              <p className="text-sm md:text-base leading-relaxed mb-8 text-gray-600">
                {t('about.card2_intro')}
              </p>

              <div className="space-y-6 mb-8">
                {aboutSteps.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl font-bold gradient-text-blue shrink-0 w-8">{item.step}</span>
                    <div>
                      <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-0.5">{item.label}</h4>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FollowCursor>
        </section>

        {/* Services */}
        <div id="services">
          <ServicesSection />
        </div>

        {/* ========== PRODUCT SPOTLIGHT — DARK TRANSITION ========== */}
        <div ref={darkTransitionRef} id="dark-transition" className="relative" style={{ height: '180vh' }}>
          <div id="products" />
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-[hsl(240,20%,4%)]"
              style={{ opacity: darkProgress }}
            />
            <div className="relative z-10 w-full py-20">
              <ProductSection darkProgress={darkProgress} />
            </div>
          </div>
        </div>

        {/* ========== DARK SECTIONS ========== */}
        <div id="contact-section" className="relative bg-[hsl(240,20%,4%)]" style={{ zIndex: 2 }}>
          {/* CTA Heading */}
          <section className="contentWidth1400 text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
            >
              {t('contact.heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-base md:text-lg max-w-[550px] mx-auto text-gray-400 mb-16"
            >
              {t('contact.subtitle')}
            </motion.p>
          </section>

          {/* Contact Card */}
          <motion.section
            ref={contactRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="w-full flex items-center justify-center pb-16 md:pb-32"
          >
            <div className="max-w-[1100px] w-[92%] mx-auto">
              <div className="glass-card glass-accent-top rounded-2xl p-8 md:p-12 lg:p-14">
                <div className="flex flex-col md:flex-row gap-10 md:gap-0">
                  {/* Left — Contact Info */}
                  <div className="text-white flex-1 md:pr-12 space-y-8">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{t('contact.info_title')}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{t('contact.info_subtitle')}</p>
                    </div>

                    <div className="space-y-4">
                      <a href={`mailto:${t('contact.email')}`} className="flex items-center gap-4 group">
                        <div className="glass-icon">
                          <svg className="w-[18px] h-[18px] text-mx-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-white/30 mb-0.5">{t('contact.email_label')}</p>
                          <p className="text-sm font-medium group-hover:text-mx-purple transition-colors">{t('contact.email')}</p>
                        </div>
                      </a>

                      <a href="https://wa.me/5513996773215" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                        <div className="glass-icon">
                          <svg className="w-[18px] h-[18px] text-mx-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-white/30 mb-0.5">{t('contact.phone_label')}</p>
                          <p className="text-sm font-medium group-hover:text-mx-purple transition-colors">{t('contact.phone')}</p>
                        </div>
                      </a>

                      <div className="flex items-center gap-4 group">
                        <div className="glass-icon">
                          <svg className="w-[18px] h-[18px] text-mx-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[11px] uppercase tracking-wider text-white/30 mb-0.5">{t('contact.location_label')}</p>
                          <p className="text-sm font-medium">{t('contact.location')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/30 mb-3">{t('contact.social_label')}</p>
                      <a
                        href="https://instagram.com/multiexperience.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-pill"
                      >
                        <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        <span className="text-white/70 text-xs font-medium">@multiexperience.com.br</span>
                      </a>
                    </div>
                  </div>

                  {/* Glass divider */}
                  <div className="glass-divider-v hidden md:block" />
                  <div className="glass-divider-h md:hidden" />

                  {/* Right — Contact Form → WhatsApp */}
                  <form onSubmit={handleFormSubmit} className="flex-1 md:pl-12 space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-[11px] uppercase tracking-wider text-white/30 mb-2">{t('contact.form_name')}</label>
                      <input
                        type="text"
                        id="name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="glass-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-white/30 mb-2">{t('contact.form_email')}</label>
                      <input
                        type="email"
                        id="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="glass-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[11px] uppercase tracking-wider text-white/30 mb-2">{t('contact.form_message_label')}</label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="glass-input"
                        placeholder={t('contact.form_message_placeholder')}
                      />
                    </div>

                    <button type="submit" className="glass-submit">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                      </svg>
                      {t('contact.form_submit')}
                    </button>

                    <p className="text-xs text-white/25 text-center">
                      {t('contact.form_or')}{' '}
                      <a href={`mailto:${t('contact.email')}`} className="text-mx-purple hover:text-mx-pink transition-colors">
                        {t('contact.email')}
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ========== FOOTER ========== */}
          <footer className="w-full pt-8 pb-16 px-6">
            <div className="contentWidth1400 mx-auto">
              <div className="glass-card glass-accent-top rounded-2xl p-8 md:p-12 lg:p-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                  {/* Brand — takes more space */}
                  <div className="md:col-span-5 lg:col-span-5">
                    <img src={mxFullLogoWhite} alt="multiexperience" className="h-8 mb-4 opacity-70" />
                    <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-[380px]">
                      {t('footer.tagline')}
                    </p>
                    <a
                      href="https://instagram.com/multiexperience.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-pill"
                    >
                      <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                      <span className="text-white/60 text-xs font-medium">@multiexperience.com.br</span>
                    </a>
                  </div>

                  {/* Services + Products */}
                  <div className="md:col-span-4 lg:col-span-4">
                    <h4 className="text-[11px] uppercase tracking-wider text-white/30 mb-4">{t('footer.services_title')}</h4>
                    <ul className="space-y-2.5 mb-8">
                      {footerServices.map((item) => (
                        <li key={item}>
                          <button onClick={() => scrollTo('#services')} className="footer-link text-sm">
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-[11px] uppercase tracking-wider text-white/30 mb-4">{t('footer.product_title')}</h4>
                    <ul className="space-y-2.5">
                      {footerProducts.map((item, i) => {
                        const urls = ['https://mxclinics.com.br', 'https://coincoin.com.br', 'https://espacoadapta.com.br']
                        return (
                          <li key={item}>
                            <a href={urls[i]} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                              {item}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* Company */}
                  <div className="md:col-span-3 lg:col-span-3">
                    <h4 className="text-[11px] uppercase tracking-wider text-white/30 mb-4">{t('footer.company_title')}</h4>
                    <ul className="space-y-2.5">
                      {footerCompany.map((item, i) => (
                        <li key={item}>
                          <button
                            onClick={() => scrollTo(i === 0 ? '#about' : '#contact-section')}
                            className="footer-link text-sm"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Bottom */}
                <div className="glass-divider-h mt-10 mb-6" />
                <p className="text-white/20 text-xs text-center">
                  © {new Date().getFullYear()} {t('footer.copyright')}
                </p>
              </div>
            </div>
          </footer>
        </div>

        <WhatsAppButton />
      </main>
    </>
  )
}

export default Home
