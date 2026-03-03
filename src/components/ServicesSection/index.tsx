import FollowCursor from "@/components/FollowCursor"
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import KanbanBoard from '@/assets/svg/kanban-board.svg?react'
import InventionIdea from '@/assets/svg/invention-idea.svg?react'
import Component from '@/assets/svg/components.svg?react'

const servicesMeta = [
  {
    icon: InventionIdea,
    accentColor: "from-purple-500 to-pink-500",
    borderAccent: "bg-gradient-to-r from-purple-500 to-pink-500",
    action: 'scroll' as const,
  },
  {
    icon: KanbanBoard,
    accentColor: "from-blue-500 to-cyan-500",
    borderAccent: "bg-gradient-to-r from-blue-500 to-cyan-500",
    action: 'scroll' as const,
  },
  {
    icon: Component,
    accentColor: "from-emerald-500 to-teal-500",
    borderAccent: "bg-gradient-to-r from-emerald-500 to-teal-500",
    action: 'scroll-products' as const,
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

function ServicesSection() {
  const { t } = useTranslation()

  const items = t('services.items', { returnObjects: true }) as Array<{
    title: string
    description: string
    benefits: string[]
    cta: string
  }>

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleCtaClick = (index: number) => {
    if (servicesMeta[index].action === 'scroll-products') {
      scrollToSection('products')
    } else {
      scrollToSection('contact-section')
    }
  }

  return (
    <section className="contentWidth1400 w-full flex items-center justify-center flex-col py-20 md:py-32 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-12 md:mb-20 max-w-[700px] px-6'
      >
        <p className="text-xs font-semibold text-mx-purple mb-3 tracking-[0.2em] uppercase">{t('services.label')}</p>
        <h2 className='text-2xl md:text-3xl lg:text-4xl mb-4 font-bold text-gray-900'>{t('services.title')}</h2>
        <p className='text-base md:text-lg text-gray-600 font-light leading-relaxed'>
          {t('services.subtitle')}
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='flex relative items-stretch justify-center w-full lg:flex-nowrap flex-wrap gap-6 md:gap-8 px-6'
      >
        {items.map((service, index) => {
          const meta = servicesMeta[index]
          return (
            <motion.div key={index} variants={itemVariants} className="flex-1 min-w-[280px] max-w-[400px] flex flex-col">
              <FollowCursor
                className="relative w-full h-full glass-card-light rounded-2xl hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`h-1 ${meta.borderAccent}`} />

                <div className='p-6 md:p-8 h-full flex flex-col items-start relative'>
                  <h3 className="mb-3 text-lg md:text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="text-sm space-y-2 mb-auto">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${meta.accentColor} shrink-0`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCtaClick(index)}
                    className='pointer-events-auto mt-6 text-sm px-5 py-2.5 rounded-full cursor-pointer bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 font-medium hover:shadow-lg'
                  >
                    {service.cta} →
                  </button>
                </div>
              </FollowCursor>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 text-center px-6"
      >
        <p className="text-base md:text-lg text-gray-500 mb-5">
          {t('services.bottom_text')}
        </p>
        <button
          onClick={() => {
            const el = document.getElementById('contact-section')
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY
              window.scrollTo({ top, behavior: 'smooth' })
            }
          }}
          className="text-sm md:text-base px-8 py-3 rounded-full bg-gradient-to-r from-mx-purple to-mx-pink text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
        >
          {t('services.bottom_cta')} →
        </button>
      </motion.div>
    </section>
  )
}

export default ServicesSection
