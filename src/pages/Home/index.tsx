import './styles.css'
import { motion } from 'framer-motion'
import FollowCursor from "@/components/FollowCursor"
import Header from "@/components/Header"
import Menu from "@/components/Menu"
import MeshGradient from '@/components/MeshGradient'
import ServicesSection from '@/components/ServicesSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import GradientBackground from '@/components/GradientBackground'
import { useRef, useEffect, useState } from 'react'

// Tech stack images
import reactImg from '@/assets/reactjs.png'
import nextjsImg from '@/assets/nextjs.png'
import typescriptImg from '@/assets/typescript.png'
import tailwindImg from '@/assets/tailwind.png'
import pythonImg from '@/assets/python.png'
import awsImg from '@/assets/aws.png'
import dockerImg from '@/assets/docker.png'
import postgresImg from '@/assets/postgres.png'
import graphqlImg from '@/assets/graphql.png'
import redisImg from '@/assets/redis.png'
import figmaImg from '@/assets/figma.png'
import mongoImg from '@/assets/mongo.png'

function Home() {
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const [darkOverlayOpacity, setDarkOverlayOpacity] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current) return

      const servicesRect = servicesRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate when to start showing the dark overlay
      // Start when bottom of services section reaches middle of viewport
      const triggerPoint = windowHeight * 0.5
      
      if (servicesRect.bottom <= triggerPoint) {
        // Calculate opacity based on how far we've scrolled past the trigger
        const scrollDistance = triggerPoint - servicesRect.bottom
        const maxScrollDistance = windowHeight * 0.5 // Full opacity after scrolling half viewport height
        const opacity = Math.min(1, scrollDistance / maxScrollDistance)
        setDarkOverlayOpacity(opacity)
      } else {
        setDarkOverlayOpacity(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <GradientBackground />
      <Menu />
      <Header />

      <main className="my-4 relative">
        {/* Tech Stack Showcase */}
        <section className="contentWidth1400 py-12 md:py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-purple-600 mb-4 tracking-wide">BUILT WITH MODERN TECHNOLOGY</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Tech Stack</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-[600px] mx-auto px-4">We use cutting-edge technologies to build fast, scalable, and maintainable solutions</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 items-center justify-center max-w-[800px] mx-auto"
          >
            {[
              { name: 'React', image: reactImg, bgColor: 'bg-cyan-100', borderColor: 'border-cyan-200' },
              { name: 'Next.js', image: nextjsImg, bgColor: 'bg-gray-100', borderColor: 'border-gray-200' },
              { name: 'TypeScript', image: typescriptImg, bgColor: 'bg-blue-100', borderColor: 'border-blue-200' },
              { name: 'Tailwind', image: tailwindImg, bgColor: 'bg-cyan-100', borderColor: 'border-cyan-200' },
              { name: 'MongoDB', image: mongoImg, bgColor: 'bg-green-100', borderColor: 'border-green-200' },
              { name: 'Python', image: pythonImg, bgColor: 'bg-yellow-100', borderColor: 'border-yellow-200' },
              { name: 'AWS', image: awsImg, bgColor: 'bg-orange-100', borderColor: 'border-orange-200' },
              { name: 'Docker', image: dockerImg, bgColor: 'bg-blue-100', borderColor: 'border-blue-200' },
              { name: 'PostgreSQL', image: postgresImg, bgColor: 'bg-indigo-100', borderColor: 'border-indigo-200' },
              { name: 'GraphQL', image: graphqlImg, bgColor: 'bg-pink-100', borderColor: 'border-pink-200' },
              { name: 'Redis', image: redisImg, bgColor: 'bg-red-100', borderColor: 'border-red-200' },
              { name: 'Figma', image: figmaImg, bgColor: 'bg-purple-100', borderColor: 'border-purple-200' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col items-center p-2 md:p-4 rounded-lg hover:-translate-y-1 transition-all group cursor-default`}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl ${tech.bgColor} border ${tech.borderColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-sm`}>
                  <img 
                    src={tech.image} 
                    alt={tech.name} 
                    className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional tech info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center max-w-[800px] mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-purple-100">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
                + Many More Technologies
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                We leverage a comprehensive ecosystem of tools and technologies including:
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center items-center">
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  AI/ML Tools (GPT, Claude, Gemini)
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  Performance (Vercel, Cloudflare)
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  Analytics (GA4, Mixpanel)
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  Testing (Jest, Cypress)
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  CI/CD (GitHub Actions, Jenkins)
                </span>
                <span className="px-3 py-1 bg-white/80 rounded-full text-xs md:text-sm font-medium text-gray-700 border border-gray-200">
                  Monitoring (Datadog, Sentry)
                </span>
              </div>
              <p className="mt-4 text-xs md:text-sm text-gray-500 italic">
                We select the best tools for each project's unique requirements
              </p>
            </div>
          </motion.div>
        </section>
        
        <section className="contentWidth1400 flex flex-col xl:flex-row relative gap-8 md:gap-16 h-full items-center justify-center py-12 md:py-20">
          <FollowCursor style={{
              width: 600,
              height: 700,
              display: "flex",
              placeItems: "center",
              placeContent: "center",
              perspective: 700,
          }} className="w-full h-full hover:shadow-lg backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 md:p-12 lg:p-16 rounded-2xl border border-neutral-400 transition duration-300 hover:border-purple-400">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">1</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#262626]">Why Choose Us?</h2>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8">We're not just another dev shop. <span className="font-semibold text-purple-600">We're your strategic technology partner</span> focused on delivering exceptional results from day one.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Full-Stack Expertise</h4>
                    <p className="text-xs md:text-sm text-gray-600">From beautiful UIs to scalable backend architectures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Modern Tech Stack</h4>
                    <p className="text-xs md:text-sm text-gray-600">Latest frameworks, tools, and best practices</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Agile Delivery</h4>
                    <p className="text-xs md:text-sm text-gray-600">Fast iterations with continuous feedback and improvement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-base md:text-lg mb-1">Quality First</h4>
                    <p className="text-xs md:text-sm text-gray-600">Comprehensive testing and clean, maintainable code</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors flex items-center gap-2 group">
                  Learn About Our Approach 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </FollowCursor>

          <FollowCursor style={{
              width: 600,
              height: 700,
              display: "flex",
              placeItems: "center",
              placeContent: "center",
              perspective: 700,
          }} className="w-full h-full hover:shadow-lg backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 md:p-12 lg:p-16 rounded-2xl border border-neutral-400 transition duration-300 hover:border-purple-400">
            <div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">2</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#262626]">How We Deliver Results</h2>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8">Our proven methodology combines <span className="font-semibold text-blue-600">technical excellence with business acumen</span> to deliver transformative solutions that drive real impact.</p>
              
              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm md:text-base">Discovery & Strategy</span>
                    <span className="text-xs md:text-sm text-gray-600">Week 1-2</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm md:text-base">Design & Prototyping</span>
                    <span className="text-xs md:text-sm text-gray-600">Week 3-6</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm md:text-base">Development & Testing</span>
                    <span className="text-xs md:text-sm text-gray-600">Week 7-12</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm md:text-base">Launch & Optimization</span>
                    <span className="text-xs md:text-sm text-gray-600">Ongoing</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm font-semibold text-blue-900 mb-1 md:mb-2">Average Client Results:</p>
                <div className="flex gap-4 md:gap-6">
                  <div>
                    <span className="text-lg md:text-2xl font-bold text-blue-600">3x</span>
                    <span className="text-xs text-gray-600 block">Faster Delivery</span>
                  </div>
                  <div>
                    <span className="text-lg md:text-2xl font-bold text-blue-600">45%</span>
                    <span className="text-xs text-gray-600 block">Cost Reduction</span>
                  </div>
                  <div>
                    <span className="text-lg md:text-2xl font-bold text-blue-600">250%</span>
                    <span className="text-xs text-gray-600 block">ROI in Year 1</span>
                  </div>
                </div>
              </div>
            </div>
          </FollowCursor>
        </section>

        <div ref={servicesRef}>
          <ServicesSection />
        </div>

        {/* Dark overlay that gradually covers the screen */}
        <div 
          className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-700 ease-out"
          style={{
            opacity: darkOverlayOpacity,
            zIndex: 5
          }}
        />

          {/* Contact section with fade-in effect */}
          <section 
            ref={contactRef} 
            id="contact-section" 
            className="relative w-full min-h-[90vh] flex items-center justify-center pt-72 pb-16 md:pt-52 md:pb-32 transition-opacity duration-700"
            style={{
              opacity: darkOverlayOpacity,
              zIndex: 10,
              pointerEvents: darkOverlayOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
              <div className='max-w-[1200px] w-[90%] mx-auto'>
                <div className='text-center mb-8 md:mb-16 px-4'>
                  <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>Ready to Transform Your Business?</h2>
                  <p className='text-lg md:text-xl text-gray-300 max-w-[600px] mx-auto'>Let's discuss how Multiexperience can help you achieve your digital transformation goals.</p>
                </div>
                
                <div className='bg-white/10 backdrop-blur-md rounded-2xl p-1'>
                  <div className='bg-gradient-to-r from-purple-500 to-pink-500 p-[2px] rounded-2xl'>
                    <div className='bg-neutral-900 rounded-2xl p-4 md:p-8 lg:p-12'>
                      <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
                        {/* Left side - Contact Info */}
                        <div className='text-white space-y-6 md:space-y-8'>
                          <div>
                            <h3 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6'>Get in Touch</h3>
                            <p className='text-sm md:text-base text-gray-300 mb-6 md:mb-8'>Choose your preferred way to connect with us. Our team typically responds within 24 hours.</p>
                          </div>
                          
                          <div className='space-y-4'>
                            <div className='flex items-center gap-4'>
                              <div className='w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center'>
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className='text-sm text-gray-400'>Email</p>
                                <p className='font-medium'>contact@multiexperience.com</p>
                              </div>
                            </div>
                            
                            <div className='flex items-center gap-4'>
                              <div className='w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center'>
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div>
                                <p className='text-sm text-gray-400'>Phone</p>
                                <p className='font-medium'>+55 (13) 99677-3215</p>
                              </div>
                            </div>
                            
                            <div className='flex items-center gap-4'>
                              <div className='w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center'>
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className='text-sm text-gray-400'>Office</p>
                                <p className='font-medium'>São Paulo, Brazil</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <p className='text-sm text-gray-400 mb-4'>Follow us</p>
                            <div className='flex gap-4'>
                              <a href="#" className='w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500/30 flex items-center justify-center transition-colors'>
                                <span className='text-white text-sm'>Li</span>
                              </a>
                              <a href="#" className='w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500/30 flex items-center justify-center transition-colors'>
                                <span className='text-white text-sm'>Tw</span>
                              </a>
                              <a href="#" className='w-10 h-10 rounded-full bg-white/10 hover:bg-purple-500/30 flex items-center justify-center transition-colors'>
                                <span className='text-white text-sm'>Gh</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - Contact Form */}
                        <form className='space-y-6'>
                          <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-300 mb-2'>Full Name</label>
                            <input 
                              type="text" 
                              id="name"
                              className='w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                              placeholder="John Doe"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-2'>Work Email</label>
                            <input 
                              type="email" 
                              id="email"
                              className='w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                              placeholder="john@company.com"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="company" className='block text-sm font-medium text-gray-300 mb-2'>Company</label>
                            <input 
                              type="text" 
                              id="company"
                              className='w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors'
                              placeholder="Your Company"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="message" className='block text-sm font-medium text-gray-300 mb-2'>How can we help?</label>
                            <textarea 
                              id="message"
                              rows={4}
                              className='w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none'
                              placeholder="Tell us about your project..."
                            />
                          </div>
                          
                          <button 
                            type="submit"
                            className='w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300'
                          >
                            Send Message
                          </button>
                          
                          <p className='text-xs text-gray-400 text-center'>
                            By submitting this form, you agree to our <a href="#" className='text-purple-400 hover:underline'>Privacy Policy</a>
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </section>
          
          {/* Footer with same fade-in effect */}
          <footer 
            className="relative bg-black w-full py-16 border-t border-gray-800 transition-opacity duration-700"
            style={{
              opacity: darkOverlayOpacity,
              zIndex: 10,
              pointerEvents: darkOverlayOpacity > 0.5 ? 'auto' : 'none'
            }}
          >
            <div className="contentWidth1400 mx-auto px-8 md:px-10 2xl:px-0">
              {/* Footer Top */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* Company Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">Multiexperience</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Transforming businesses through innovative technology solutions and exceptional digital experiences.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                      <span className="text-white text-xs">in</span>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                      <span className="text-white text-xs">tw</span>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                      <span className="text-white text-xs">gh</span>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-colors">
                      <span className="text-white text-xs">ig</span>
                    </a>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Digital Transformation</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Software Development</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">UX/UI Design</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cloud Solutions</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Consulting</a></li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Our Team</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Case Studies</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</a></li>
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4">Stay Updated</h4>
                  <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest insights and updates.</p>
                  <form className="flex flex-col gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="pt-8 border-t border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-gray-400 text-sm">
                    © 2024 Multiexperience. All rights reserved.
                  </p>
                  <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        <WhatsAppButton />
        <MeshGradient />  
      </main>
    </>
  ) 
}

export default Home