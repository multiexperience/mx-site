import './styles.css'

interface TransitionRaysProps {
  darkProgress: number
}

export default function TransitionRays({ darkProgress }: TransitionRaysProps) {
  const intensity = Math.max(0, Math.min(1, (darkProgress - 0.15) / 0.6))

  if (intensity <= 0) return null

  return (
    <div
      className="absolute inset-0 z-[5] pointer-events-none overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Neon glow container — sized to match the product card area */}
      <div className="neon-container">
        {/* Primary purple glow — the dominant backlight */}
        <div
          className="neon-glow neon-glow-purple"
          style={{ opacity: intensity * 0.7 }}
        />

        {/* Pink accent glow — offset for color depth */}
        <div
          className="neon-glow neon-glow-pink"
          style={{ opacity: intensity * 0.5 }}
        />

        {/* Cyan accent — subtle cool contrast */}
        <div
          className="neon-glow neon-glow-cyan"
          style={{ opacity: intensity * 0.35 }}
        />

        {/* Noise texture for organic feel */}
        <div
          className="absolute inset-0 neon-noise rounded-3xl"
          style={{ opacity: intensity * 0.08 }}
        />
      </div>
    </div>
  )
}
