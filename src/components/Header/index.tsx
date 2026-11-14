import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './styles.css'
import { Button } from '../ui/button';

function Header() {
  const { t } = useTranslation()

  const scrollTo = (anchor: string) => {
    const el = document.querySelector(anchor)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header className="contentWidth1400 w-full min-h-screen flex gap-10 flex-col items-center justify-center px-6 md:px-10 2xl:px-0 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 w-full max-w-[900px]"
      >
        <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center leading-[1.1] tracking-tight">
          <span className="block mb-2">
            <span className="text-gray-900">{t('hero.title_line1')}</span>
          </span>
          <span className="pitch-gradient block">{t('hero.title_highlight')}</span>
          <span className="block mt-2">
            <span className="text-gray-900">{t('hero.title_line2')}</span>
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className='text-base md:text-lg lg:text-xl font-light text-center max-w-[640px] text-gray-600 leading-relaxed z-10'
      >
        {t('hero.subtitle')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 items-center mt-4 z-10"
      >
        <Button
          onClick={() => scrollTo('#contact-section')}
          className="btn-action text-sm md:text-base rounded-full px-8 py-3 h-auto bg-gradient-to-r from-mx-purple to-mx-pink hover:opacity-90 border-0 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
          size="lg"
        >
          {t('hero.cta_primary')}
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </Button>
        <Button
          variant="outline"
          onClick={() => scrollTo('#products')}
          className="text-sm md:text-base rounded-full px-8 py-3 h-auto border-2 border-gray-200 hover:border-mx-purple hover:text-mx-purple bg-white/50 backdrop-blur-sm transition-all duration-300 group font-medium"
          size="lg"
        >
          <span className="flex items-center gap-2">
            {t('hero.cta_secondary')}
            <div className="w-1.5 h-1.5 rounded-full bg-mx-purple group-hover:animate-ping"></div>
          </span>
        </Button>
      </motion.div>

      {/* Trust indicators — real, verifiable facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-8 text-sm text-gray-500 z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-mx-purple"></div>
          <span className="font-medium">{t('hero.trust_founded')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-mx-purple"></div>
          <span className="font-medium">{t('hero.trust_location')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-mx-purple"></div>
          <span className="font-medium">{t('hero.trust_approach')}</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase font-medium">{t('hero.scroll')}</span>
        <div className="scroll-indicator">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </motion.div>

    </header>
  )
}

export default Header
