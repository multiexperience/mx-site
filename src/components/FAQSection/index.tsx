import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { containerVariants, itemVariants } from '@/lib/motion'
import './styles.css'

function FAQSection() {
  const { t } = useTranslation()

  const items = t('faq.items', { returnObjects: true }) as Array<{ q: string; a: string }>

  return (
    <section id="faq" className="contentWidth1400 w-full flex items-center justify-center flex-col py-12 md:py-20 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-10 md:mb-14 max-w-[700px] px-6'
      >
        <p className="text-xs font-semibold text-mx-purple mb-3 tracking-[0.2em] uppercase">{t('faq.label')}</p>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900'>{t('faq.title')}</h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full max-w-[800px] px-6 space-y-4"
      >
        {items.map((item, index) => (
          <motion.details key={index} variants={itemVariants} className="faq-item glass-card-light rounded-2xl group">
            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-mx-purple">
              <span className="text-base md:text-lg font-semibold text-gray-900">{item.q}</span>
              <span aria-hidden="true" className="faq-icon text-2xl leading-none font-light text-mx-purple shrink-0">+</span>
            </summary>
            <p className="px-5 md:px-6 pb-5 md:pb-6 -mt-1 text-sm md:text-base text-gray-500 leading-relaxed">
              {item.a}
            </p>
          </motion.details>
        ))}
      </motion.div>
    </section>
  )
}

export default FAQSection
