import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import '../TransitionRays/styles.css'
import mxClinicsScreenshot from '@/assets/mx-clinics-screenshot.png'

function lerpColor(dark: number) {
  const headingR = Math.round(17 + (255 - 17) * dark)
  const headingG = Math.round(24 + (255 - 24) * dark)
  const headingB = Math.round(39 + (255 - 39) * dark)

  const quoteR = Math.round(55 + (209 - 55) * dark)
  const quoteG = Math.round(65 + (213 - 65) * dark)
  const quoteB = Math.round(81 + (219 - 81) * dark)

  const subR = Math.round(107 + (156 - 107) * dark)
  const subG = Math.round(114 + (163 - 114) * dark)
  const subB = Math.round(128 + (175 - 128) * dark)

  return {
    heading: `rgb(${headingR}, ${headingG}, ${headingB})`,
    quote: `rgb(${quoteR}, ${quoteG}, ${quoteB})`,
    sub: `rgb(${subR}, ${subG}, ${subB})`,
  }
}

// Fixed status badge style (green)
const statusStyle = { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }

const accentGradients = [
  'from-purple-500 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-blue-500 to-cyan-500',
]

// Neon glow colors per product slot — primary, secondary, accent
const glowColors = [
  // slot 0 (MX Clinics): purple → pink
  {
    primary: 'radial-gradient(ellipse at 50% 50%, hsla(263,80%,55%,0.6) 0%, hsla(270,70%,48%,0.35) 30%, hsla(280,60%,40%,0.15) 55%, transparent 100%)',
    secondary: 'radial-gradient(ellipse at 55% 55%, hsla(330,90%,58%,0.55) 0%, hsla(320,80%,50%,0.3) 30%, hsla(310,65%,45%,0.1) 60%, transparent 100%)',
    accent: 'radial-gradient(ellipse at 45% 45%, hsla(280,80%,60%,0.4) 0%, hsla(290,70%,50%,0.18) 35%, transparent 70%)',
  },
  // slot 1: amber → orange
  {
    primary: 'radial-gradient(ellipse at 50% 50%, hsla(38,90%,50%,0.6) 0%, hsla(30,85%,45%,0.35) 30%, hsla(25,75%,40%,0.15) 55%, transparent 100%)',
    secondary: 'radial-gradient(ellipse at 55% 55%, hsla(25,95%,55%,0.55) 0%, hsla(20,85%,48%,0.3) 30%, hsla(15,70%,42%,0.1) 60%, transparent 100%)',
    accent: 'radial-gradient(ellipse at 45% 45%, hsla(45,95%,55%,0.4) 0%, hsla(40,85%,48%,0.18) 35%, transparent 70%)',
  },
  // slot 2: blue → cyan
  {
    primary: 'radial-gradient(ellipse at 50% 50%, hsla(217,90%,55%,0.6) 0%, hsla(210,80%,48%,0.35) 30%, hsla(200,70%,42%,0.15) 55%, transparent 100%)',
    secondary: 'radial-gradient(ellipse at 55% 55%, hsla(187,96%,45%,0.55) 0%, hsla(190,85%,42%,0.3) 30%, hsla(195,70%,38%,0.1) 60%, transparent 100%)',
    accent: 'radial-gradient(ellipse at 45% 45%, hsla(205,90%,55%,0.4) 0%, hsla(200,80%,48%,0.18) 35%, transparent 70%)',
  },
]

interface ProductSectionProps {
  darkProgress?: number
}

export default function ProductSection({ darkProgress = 0 }: ProductSectionProps) {
  const { t } = useTranslation()
  const colors = lerpColor(darkProgress)
  const [activeIndex, setActiveIndex] = useState(0)

  const items = t('products.items', { returnObjects: true }) as Array<{
    name: string
    description: string
    tags: string[]
    status: string
    status_note: string
    url: string
    cta: string
    image_alt: string
  }>

  const isDark = darkProgress > 0.5
  const glowIntensity = Math.max(0, Math.min(1, (darkProgress - 0.15) / 0.6))
  const hasMultiple = items.length > 1
  const safeIndex = activeIndex < items.length ? activeIndex : 0
  const active = items[safeIndex]
  const slot = safeIndex % glowColors.length

  return (
    <div className="max-w-[1000px] mx-auto px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-xs font-semibold text-mx-purple mb-3 tracking-[0.2em] uppercase">
          {t('products.label')}
        </p>
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: colors.heading }}
        >
          {t('products.title')}
        </h2>
        <p
          className="text-base md:text-lg font-light max-w-[500px] mx-auto"
          style={{ color: colors.sub }}
        >
          {t('products.subtitle')}
        </p>
      </motion.div>

      {/* Product selector tabs — only when there is more than one product */}
      {hasMultiple && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="flex justify-center gap-2 mb-10 flex-wrap"
      >
        {items.map((item, i) => {
          const isActive = i === safeIndex
          return (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
                ${isActive
                  ? `bg-gradient-to-r ${accentGradients[i % accentGradients.length]} text-white border-transparent shadow-lg`
                  : isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
                }
              `}
              style={!isActive ? { color: colors.quote } : undefined}
            >
              {item.name}
            </button>
          )
        })}
      </motion.div>
      )}

      {/* Active product card with neon glow */}
      <div className="relative">
        {/* Neon glow — sits behind the card only, colors + movement match active product */}
        {glowIntensity > 0 && (
          <div className={`absolute inset-0 -z-10 pointer-events-none glow-movement-${slot}`} aria-hidden="true">
            <div
              className="neon-glow neon-glow-primary"
              style={{ opacity: glowIntensity * 0.7, background: glowColors[slot].primary, transition: 'opacity 0.4s ease-out, background 0.6s ease-in-out' }}
            />
            <div
              className="neon-glow neon-glow-secondary"
              style={{ opacity: glowIntensity * 0.5, background: glowColors[slot].secondary, transition: 'opacity 0.4s ease-out, background 0.6s ease-in-out' }}
            />
            <div
              className="neon-glow neon-glow-accent"
              style={{ opacity: glowIntensity * 0.35, background: glowColors[slot].accent, transition: 'opacity 0.4s ease-out, background 0.6s ease-in-out' }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-2xl p-6 md:p-10 border"
            style={{
              backgroundColor: `rgba(255, 255, 255, ${(0.45 - 0.41 * darkProgress).toFixed(3)})`,
              borderColor: `rgba(255, 255, 255, ${(0.6 - 0.52 * darkProgress).toFixed(3)})`,
              backdropFilter: `blur(${Math.round(24 - 24 * darkProgress)}px)`,
              WebkitBackdropFilter: `blur(${Math.round(24 - 24 * darkProgress)}px)`,
              boxShadow: darkProgress < 1
                ? `inset 0 1px 0 0 rgba(255,255,255,${(0.4 - 0.4 * darkProgress).toFixed(2)}), 0 4px 24px -4px rgba(0,0,0,${(0.05 - 0.05 * darkProgress).toFixed(3)})`
                : 'none',
              transition: 'background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
              {/* Left — info */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <h3
                    className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${accentGradients[slot]} bg-clip-text text-transparent`}
                  >
                    {active.name}
                  </h3>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyle.bg} ${statusStyle.border} ${statusStyle.color}`}>
                    {active.status}
                  </span>
                </div>

                <p
                  className="text-sm md:text-base leading-relaxed mb-3"
                  style={{ color: colors.quote }}
                >
                  {active.description}
                </p>

                {active.status_note && (
                  <p className="text-xs md:text-sm mb-6" style={{ color: colors.sub }}>
                    {active.status_note}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {active.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-300"
                      style={{
                        color: colors.sub,
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={active.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r ${accentGradients[slot]} text-white font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                >
                  {active.cta} →
                </a>
              </div>

              {safeIndex === 0 && (
                <div className="md:w-[48%] shrink-0 self-center">
                  <img
                    src={mxClinicsScreenshot}
                    alt={active.image_alt}
                    loading="lazy"
                    width={2000}
                    height={1091}
                    className="w-full h-auto rounded-xl border"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots — only when there is more than one product */}
      {hasMultiple && (
        <div className="flex justify-center gap-2.5 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === safeIndex
                  ? `w-8 h-2.5 bg-gradient-to-r ${accentGradients[i % accentGradients.length]}`
                  : `w-2.5 h-2.5 ${isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
              }`}
            />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-sm md:text-base font-light" style={{ color: colors.sub }}>
        {t('products.sites_note')}
      </p>
    </div>
  )
}
