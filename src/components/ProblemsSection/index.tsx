import FollowCursor from "@/components/FollowCursor"
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { containerVariants, itemVariants } from '@/lib/motion'

function ProblemsSection() {
  const { t } = useTranslation()

  const items = t('problems.items', { returnObjects: true }) as Array<{ title: string; desc: string }>

  return (
    <section id="problems" className="contentWidth1400 w-full flex items-center justify-center flex-col py-12 md:py-20 relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-12 md:mb-16 max-w-[700px] px-6'
      >
        <p className="text-xs font-semibold text-mx-purple mb-3 tracking-[0.2em] uppercase">{t('problems.label')}</p>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900'>{t('problems.title')}</h2>
      </motion.div>

      {/* Problem Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-[1100px] px-6'
      >
        {items.map((item, index) => (
          <motion.div key={index} variants={itemVariants} className="flex flex-col">
            <FollowCursor className="w-full h-full glass-card-light rounded-2xl p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="mb-3 text-lg md:text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </FollowCursor>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default ProblemsSection
