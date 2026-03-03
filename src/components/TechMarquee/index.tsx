import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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

const techRow1 = [
  { name: 'React', image: reactImg },
  { name: 'Next.js', image: nextjsImg },
  { name: 'TypeScript', image: typescriptImg },
  { name: 'Tailwind', image: tailwindImg },
  { name: 'Python', image: pythonImg },
  { name: 'AWS', image: awsImg },
]

const techRow2 = [
  { name: 'Docker', image: dockerImg },
  { name: 'PostgreSQL', image: postgresImg },
  { name: 'GraphQL', image: graphqlImg },
  { name: 'Redis', image: redisImg },
  { name: 'Figma', image: figmaImg },
  { name: 'MongoDB', image: mongoImg },
]

function TechItem({ name, image }: { name: string; image: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 mx-3 glass-card-light rounded-xl hover:scale-105 transition-transform duration-300 cursor-default shrink-0">
      <img src={image} alt={name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function TechMarquee() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <p className="text-xs font-semibold text-mx-purple mb-3 tracking-[0.2em] uppercase">{t('tech.label')}</p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{t('tech.title')}</h2>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {[...techRow1, ...techRow1, ...techRow1, ...techRow1].map((tech, i) => (
            <TechItem key={`r1-${i}`} {...tech} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(40,20%,98%)] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(40,20%,98%)] to-transparent pointer-events-none z-10" />
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="flex animate-marquee-reverse" style={{ width: 'max-content' }}>
          {[...techRow2, ...techRow2, ...techRow2, ...techRow2].map((tech, i) => (
            <TechItem key={`r2-${i}`} {...tech} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(40,20%,98%)] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(40,20%,98%)] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  )
}
