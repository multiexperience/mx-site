import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { useRef, ReactNode } from "react"

interface FollowCursorProps {
  className?: string
  children?: ReactNode
}

export default function FollowCursor({ className = '', children }: FollowCursorProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const rotateX = useSpring(rawX, springConfig)
  const rotateY = useSpring(rawY, springConfig)

  const glowBg = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.35), transparent 80%)`

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rawX.set((py - 0.5) * 5)
    rawY.set((0.5 - px) * 5)
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 700 }}
      className="w-full h-full"
    >
      <motion.div
        className={`relative ${className}`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl z-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: glowBg }}
        />
        <div className="relative z-10 pointer-events-none">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
