import { Link } from "react-router-dom"
import { useEffect, useState, useCallback, useRef } from "react"
import { useTranslation } from 'react-i18next'
import { twMerge } from "tailwind-merge"
import mxFullLogo from '@/assets/mx-logo-full.png'
import mxFullLogoWhite from '@/assets/mx-logo-full-white.png'
import mxLogo from '@/assets/mx-logo.png'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

const languages = [
  { code: 'pt-BR', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
]

function TranslateIcon({ className }: { className?: string }) {
  return (
    <Languages className={className} />
  )
}

function LanguageDropdown({ isDark }: { isDark: boolean }) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={twMerge(
          "p-2 rounded-full transition-all duration-300 hover:scale-110",
          isDark
            ? 'text-gray-300 hover:text-white'
            : 'text-gray-600 hover:text-gray-900'
        )}
        aria-label="Change language"
      >
        <TranslateIcon className="w7 h-7" />
      </button>

      {open && (
        <div
          className={twMerge(
            "absolute top-full right-0 mt-2 rounded-xl border overflow-hidden min-w-[150px] shadow-xl z-50",
            isDark
              ? 'bg-[hsl(240,20%,8%)]/95 border-white/10 backdrop-blur-xl'
              : 'bg-white/95 border-gray-200 backdrop-blur-xl'
          )}
        >
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); setOpen(false) }}
              className={twMerge(
                "w-full text-left px-4 py-2.5 text-sm flex items-center justify-between gap-3 transition-colors",
                isDark
                  ? 'hover:bg-white/8 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700',
                lang.code === i18n.language && (isDark ? 'text-mx-purple bg-white/5' : 'text-mx-purple bg-purple-50')
              )}
            >
              <span>{lang.name}</span>
              {lang.code === i18n.language && (
                <svg className="w-3.5 h-3.5 text-mx-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Menu() {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hideMenu = !isMenuOpen && '-right-full'
  const logoWidth = !isMenuOpen ? 'w-72' : 'w-32 min-w-0'

  const menuOptions = [
    { title: t('nav.home'), anchor: '#top' },
    { title: t('nav.services'), anchor: '#services' },
    { title: t('nav.about'), anchor: '#about' },
    { title: t('nav.products'), anchor: '#products' },
    { title: t('nav.contact'), anchor: '#contact-section' },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [darkProgress, setDarkProgress] = useState(0)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)

    let progress = 0
    const darkTransition = document.getElementById('dark-transition')
    if (darkTransition) {
      const rect = darkTransition.getBoundingClientRect()
      const totalScroll = rect.height - window.innerHeight
      const scrolled = -rect.top

      if (scrolled > 0) {
        progress = Math.min(1, scrolled / totalScroll)
      }
    }

    const contactSection = document.getElementById('contact-section')
    const footer = document.querySelector('footer')
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect()
      if (rect.top <= 80 && rect.bottom >= 80) progress = 1
    }
    if (footer) {
      const rect = footer.getBoundingClientRect()
      if (rect.top <= 80 && rect.bottom >= 80) progress = 1
    }

    setDarkProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollTo = (anchor: string) => {
    setIsMenuOpen(false)
    if (anchor === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(anchor)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const isDark = darkProgress > 0.5
  const navTextClass = isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'

  const lightness = Math.round(255 * (1 - darkProgress))
  const navBgStyle: React.CSSProperties = isScrolled || darkProgress > 0
    ? {
        backgroundColor: `rgba(${lightness}, ${lightness}, ${lightness}, ${Math.max(0.6, darkProgress * 0.85)})`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.05)'
          : '1px solid rgba(0,0,0,0.08)',
      }
    : {}

  const currentLogo = isMenuOpen ? mxLogo : (isDark ? mxFullLogoWhite : mxFullLogo)

  return (
    <nav
      className="fixed top-0 w-full z-30"
      style={navBgStyle}
    >
      <div className="contentWidth1400 my-4 flex w-full h-16 md:h-20 items-center justify-between md:my-0">
        <Link to="/" onClick={() => scrollTo('#top')}>
          <img
            className={twMerge('min-w-64 transition-all duration-300', logoWidth)}
            src={currentLogo}
            alt="logo multiexperience"
          />
        </Link>

        {/* Mobile menu drawer */}
        <ul className={twMerge("list-none w-full items-center")}>
          <div className={twMerge(
            "transition-all duration-300 absolute top-0 right-0 w-3/4 h-screen bg-white/95 backdrop-blur-xl p-10 pt-28 text-3xl border-l border-gray-200 z-20",
            hideMenu
          )}>
            {menuOptions.map((option, index) => (
              <li key={option.anchor} className={index !== 0 ? 'mt-8' : ''}>
                <button
                  onClick={() => scrollTo(option.anchor)}
                  className="text-gray-800 hover:text-mx-purple transition-colors font-medium"
                >
                  {option.title}
                </button>
              </li>
            ))}
            {/* Language selector in mobile */}
            <li className="mt-10 flex items-center gap-2">
              <TranslateIcon className="w-5 h-5 text-gray-500" />
              <div className="flex gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => i18n.changeLanguage(lang.code)}
                    className={twMerge(
                      "text-sm font-semibold px-3 py-1.5 rounded-full border transition-all",
                      lang.code === i18n.language
                        ? 'border-mx-purple text-mx-purple bg-purple-50'
                        : 'border-gray-300 text-gray-600 hover:border-mx-purple'
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </li>
          </div>
          <div
            onClick={() => setIsMenuOpen(false)}
            className={twMerge(
              "transition-opacity absolute top-0 left-0 w-screen h-screen bg-black opacity-0 z-10 invisible",
              isMenuOpen && 'opacity-35 visible'
            )}
          />
        </ul>

        {/* Desktop nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuOptions.map(option => (
              <button
                key={option.anchor}
                onClick={() => scrollTo(option.anchor)}
                className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-mx-purple after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center"
              >
                <NavigationMenuItem className={twMerge(
                  navigationMenuTriggerStyle(),
                  'flex bg-transparent hover:bg-transparent text-sm font-medium',
                  navTextClass
                )}>
                  {option.title}
                </NavigationMenuItem>
              </button>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Language dropdown + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageDropdown isDark={isDark} />

          <Button
            onClick={() => scrollTo('#contact-section')}
            className="text-sm rounded-full px-6 bg-gradient-to-r from-mx-purple to-mx-pink hover:opacity-90 text-white border-0 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            size="lg"
          >
            {t('nav.cta')}
          </Button>
        </div>

        <button className="md:hidden text-7xl z-30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg className="w-10 h-10 text-neutral-950" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#1B1919"/>
            </svg>
          ) : (
            <svg className={twMerge("w-10 h-10", isDark ? 'text-white' : 'text-neutral-950')} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}

export default Menu
