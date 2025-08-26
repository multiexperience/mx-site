import FollowCursor from "@/components/FollowCursor"
import { motion } from 'framer-motion'
import KanbanBoard from '@/assets/svg/kanban-board.svg?react'
import InventionIdea from '@/assets/svg/invention-idea.svg?react'
import Component from '@/assets/svg/components.svg?react'

const services = [
  {
    title: "Digital Transformation",
    description: "End-to-end digital transformation strategies that modernize your operations and create competitive advantage.",
    icon: InventionIdea,
    benefits: [
      "Digital maturity assessment",
      "Strategic roadmap development",
      "Process automation & optimization",
      "Change management support"
    ],
    cta: "Start Your Journey",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Architecture & Development",
    description: "Build scalable, secure, and future-proof software solutions with our expert development team.",
    icon: KanbanBoard,
    benefits: [
      "Cloud-native applications",
      "Microservices architecture",
      "API design & integration",
      "Legacy system modernization"
    ],
    cta: "Explore Solutions",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Experience Design",
    description: "Create memorable digital experiences that delight users and drive engagement across all touchpoints.",
    icon: Component,
    benefits: [
      "UX research & discovery",
      "Design system development",
      "Prototyping & validation",
      "Multiplatform experiences"
    ],
    cta: "View Our Work",
    color: "from-green-500 to-teal-500"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

function ServicesSection() {
  return (
    <section className="contentWidth1400 w-full min-h-screen flex items-center justify-center flex-col py-16 md:py-32 relative">
      {/* Impact Metrics */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-20 w-full max-w-[900px] px-4"
      >
        {[
          { value: "300+", label: "Projects Delivered" },
          { value: "50+", label: "Expert Team" },
          { value: "15+", label: "Years Experience" },
          { value: "95%", label: "Client Satisfaction" }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm lg:text-base text-gray-600 mt-1 md:mt-2">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='text-center mb-10 md:mb-16 max-w-[768px] px-4'
      >
        <h2 className='text-3xl md:text-4xl lg:text-5xl mb-4 font-bold'>Our Services</h2>
        <p className='text-lg md:text-xl lg:text-2xl font-thin'>
          Transform your business with our comprehensive technology solutions designed to accelerate growth, 
          enhance user experience, and drive innovation.
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='flex relative items-center justify-center w-full lg:flex-nowrap flex-wrap gap-6 md:gap-10'
      >
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <FollowCursor 
                style={{
                  width: 350,
                  height: 400,
                  display: "flex",
                  placeItems: "center",
                  placeContent: "center",
                  perspective: 400,
                }} 
                className="relative w-full h-auto min-h-[400px] md:h-[450px] hover:shadow-lg max-w-[400px] backdrop-blur-md bg-neutral-300/25 p-4 md:p-8 rounded-2xl border border-neutral-500 transition duration-75 linear hover:ease-in-out"
              >
                <div className="absolute -bottom-4 right-8 opacity-65">
                  <IconComponent className="h-full w-full" />
                </div>
                
                <div className='h-full flex flex-col items-start'>
                  <h3 className="mb-3 md:mb-4 text-lg md:text-xl lg:text-2xl font-medium text-[#262626]">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base mb-3 md:mb-4 text-gray-700">
                    {service.description}
                  </p>
                  <ul className="text-xs md:text-sm space-y-1 md:space-y-2 mb-auto opacity-80">
                    {service.benefits.map((benefit, i) => (
                      <li key={i}>• {benefit}</li>
                    ))}
                  </ul>
                  <button 
                    className='pointer-events-auto mt-4 md:mt-6 text-sm md:text-base px-4 md:px-6 py-2 md:py-2.5 rounded-full cursor-pointer bg-white border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 font-medium'
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
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 md:mt-20 text-center px-4"
      >
        <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">
          Not sure which service is right for you?
        </p>
        <button className="text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Schedule a Free Consultation
        </button>
      </motion.div>
    </section>
  )
}

export default ServicesSection