import mxLogoIcon from "../../assets/mx-logo-full-white.png"
import instagramIcon from "../../assets/instagram-icon.png"
import linkedinIcon from "../../assets/linkedin-icon.png"
import xIcon from "../../assets/x-icon.png"
import whatsappIcon from "../../assets/whatsapp-icon.png"

function Header() {

  return (
    <header className="w-full z-20 absolute h-auto flex items-center justify-between p-8 pb-0 top-0 left-0">
        <img className="w-20" src={mxLogoIcon} alt="multiexperience logo" />

        <div className="flex gap-6">
            <a href="https://www.instagram.com/multiexperience.com.br/" className="text-[0px]" target="_blank">
                <img className="w-8 invert" src={instagramIcon} alt="logo instragram" />
            </a>

            <a href="https://www.linkedin.com/company/multiexperience" className="text-[0px]" target="_blank">
                <img className="w-8 invert" src={linkedinIcon} alt="logo linkedin" />
            </a>
            
            <a href="https://x.com/multiexperience" className="text-[0px]" target="_blank">
                <img className="w-8 invert" src={xIcon} alt="logo x" />
            </a>

            <a href="https://api.whatsapp.com/send?phone=5513981813437" className="text-[0px]" target="_blank">
                <img className="w-8 invert" src={whatsappIcon} alt="logo whatsapp" />
            </a>
        </div>
    </header>
  ) 
}

export default Header