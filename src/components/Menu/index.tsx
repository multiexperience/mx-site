import { Link } from "react-router-dom"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import mxFullLogo from '../../assets/mx-logo-full.png'
import mxLogo from '../../assets/mx-logo.png'


function Menu() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const hideMenu = !isMenuOpen && '-right-full'
  const logoWidth = !isMenuOpen ? 'w-96' : 'w-32'

  return (
    <nav className="fixed top-0 w-full z-30">
      <div className="contentWidth1200 px-3 py-16 flex w-full h-20 items-center text-4xl">
        <ul className="list-none flex w-full items-center">
          <li className="mr-auto"><Link to="/"><img className={logoWidth} src={!isMenuOpen ? mxFullLogo : mxLogo} alt="logo multiexperience" /></Link></li>
          
          <div className={twMerge("transition-all duration-300 absolute top-0 right-0 w-3/4 h-screen bg-[#F3F4F6] p-10 pt-28 pr-4 text-5xl border-l border-l-neutral-400", hideMenu)}>
            <li className=""><Link to="/">Home</Link></li>
            <li className="mt-10"><Link to="/about">About</Link></li>
            <li className="mt-10"><Link to="/solutions">Solutions</Link></li>
            <li className="mt-10"><Link to="/clients">Clients/Cases</Link></li>
            <li className="mt-10"><Link to="/contact">Contact</Link></li>
          </div>
        </ul>

        <button className="text-7xl z-30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <svg className="w-16 h-16 text-neutral-950" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#1B1919"/>
            </svg>
          ) : (
            <svg className="w-16 h-16 text-neutral-950" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          )}  
        </button>
      </div>
    </nav>
  ) 
}

export default Menu