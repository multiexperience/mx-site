import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import mxFullLogo from '@/assets/mx-logo-full.png'
import mxLogo from '@/assets/mx-logo.png'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

function Menu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hideMenu = !isMenuOpen && '-right-full'
  const logoWidth = !isMenuOpen ? 'w-72' : 'w-32 min-w-0'

  const menuOptions = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Solutions', path: '/solutions' },
    { title: 'Clients', path: '/clients' },
    { title: 'Contact', path: '/contact' },
  ]

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolled = window.scrollY > 100;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }

      // Check if contact section or footer is in view
      const contactSection = document.getElementById('contact-section');
      const footer = document.querySelector('footer.bg-black');
      let isInDarkArea = false;
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        isInDarkArea = rect.top <= 80 && rect.bottom >= 80;
      }
      
      if (!isInDarkArea && footer) {
        const footerRect = footer.getBoundingClientRect();
        isInDarkArea = footerRect.top <= 80 && footerRect.bottom >= 80;
      }
      
      if (isInDarkArea !== isDarkSection) {
        setIsDarkSection(isInDarkArea);
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled, isDarkSection]);
  
  return (
    <nav className={`fixed top-0 w-full z-30 transition-all duration-300 ${
      isDarkSection 
        ? "shadow-lg backdrop-blur-md bg-white/95" 
        : isScrolled 
          ? "shadow-sm backdrop-blur-md bg-white/45"
          : ""
    }`}>
      <div className="contentWidth1400 my-4 flex w-full h-20 items-center justify-between text-4xl md:my-0 ">
        <Link to="/"><img className={twMerge('min-w-64', logoWidth)} src={!isMenuOpen ? mxFullLogo : mxLogo} alt="logo multiexperience" /></Link>

        <ul className={twMerge("list-none w-full items-center")}>
          <div className={twMerge("transition-all duration-300 absolute top-0 right-0 w-3/4 h-screen bg-[#F3F4F6] p-10 pt-28 text-4xl border-l border-l-neutral-400 z-20", hideMenu)}>
            {menuOptions.map((option, index) => <li key={option.title} className={index !== 0 && 'mt-10' || ''}><Link to={option.path}>{option.title}</Link></li>)}
          </div>
          <div onClick={() => setIsMenuOpen(false)} className={twMerge("transition-opacity absolute top-0 left-0 w-screen h-screen bg-black opacity-0 z-10 invisible", isMenuOpen && 'opacity-35 visible')}></div>
        </ul>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuOptions.map(option => (
              <Link to={option.path} className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">
                <NavigationMenuItem className={twMerge(navigationMenuTriggerStyle(), 'flex bg-transparent hover:bg-transparent text-base font-medium')}>
                      {option.title}
                </NavigationMenuItem>
              </Link>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className=" hidden lg:flex text-base ml-4" size="lg">Get in touch</Button>

        <button className="md:hidden text-7xl z-30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg className="w-12 h-12 text-neutral-950" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#1B1919"/>
            </svg>
          ) : (
            <svg className="w-12 h-12 text-neutral-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          )}  
        </button>
      </div>
    </nav>
  ) 
}

export default Menu