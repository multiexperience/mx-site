import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import './styles.css'
import { Button } from '../ui/button';

function Header() {
  return (
    <header className="contentWidth1400 w-full min-h-screen flex gap-12 flex-col items-center justify-center p-8 mt-20 md:px-10 2xl:px-0 relative">
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-16 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-lg animate-bounce"></div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/20 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-600">Available for new projects</span>
        </div>
        
        <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center leading-tight">
          <span className="block mb-4">
            <span className="text-gray-900">We build</span>
          </span>
          <span className="pitch-gradient text-transparent block">
            <TypeAnimation
              sequence={[
                'digital experiences', 2000,
                'modern solutions', 2000,
                'scalable platforms', 2000,
                'user-focused apps', 2000,
                'cloud architectures', 2000,
                'innovative products', 2000,
              ]}
              wrapper="span"
              cursor={true}
              speed={50}
              style={{ display: 'inline-block' }}
              repeat={Infinity}
            />
          </span>
          <span className="block mt-4">
            <span className="text-gray-900">that</span> <span className="pitch-gradient text-transparent">scale</span>
          </span>
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className='text-lg md:text-xl lg:text-2xl font-light text-center max-w-[700px] text-gray-600 leading-relaxed z-10 px-4'
      >
        From startup MVPs to enterprise platforms. We craft <span className="font-semibold text-purple-600">beautiful, functional</span> digital products that your users will love.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 items-center mt-8 z-10"
      >
        <Button 
          className="btn-action text-base hover:scale-105 transition-all shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0" 
          size="lg"
        >
          Start Your Project
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
          className="text-base border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all group" 
          size="lg"
        >
          <span className="flex items-center gap-2">
            See Our Work
            <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:animate-ping"></div>
          </span>
        </Button>
      </motion.div>
      
      {/* Trust indicators */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex items-center gap-8 mt-12 text-sm text-gray-500 z-10"
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white"></div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-400 border-2 border-white"></div>
          </div>
          <span>Trusted by innovative teams</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span>⚡</span>
          <span>Fast delivery</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span>🚀</span>
          <span>Modern stack</span>
        </div>
      </motion.div>
      {/* <MeshGradient /> */}
    </header>
  ) 
}

export default Header