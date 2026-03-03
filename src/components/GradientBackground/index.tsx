import './styles.css'

function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Base warm white */}
      <div className="absolute inset-0 bg-[hsl(40,20%,98%)]" />

      {/* Crystalline mesh — slow-drifting tonal variations across the surface */}
      <div className="absolute inset-0 crystal-mesh" />

      {/* Lava lamp blobs — large, colorful, slow-morphing shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[80vw] h-[80vh]">
          {/* Cyan blob — sharper, foreground plane */}
          <div className="lava-blob lava-blob-1" />
          {/* Blue blob */}
          <div className="lava-blob lava-blob-2" />
          {/* Indigo blob — sharpest, creates definition */}
          <div className="lava-blob lava-blob-3" />
          {/* Purple blob */}
          <div className="lava-blob lava-blob-4" />
          {/* Pink blob — sharper foreground */}
          <div className="lava-blob lava-blob-5" />
          {/* Red-pink blob */}
          <div className="lava-blob lava-blob-6" />
        </div>
      </div>

      {/* Coarse grain — visible organic texture like volcanic glass surface */}
      <div className="absolute inset-0 grain-coarse" />

      {/* Fine stipple — micro-texture for printed/physical feel */}
      <div className="absolute inset-0 grain-fine" />

      {/* Soft vignette — focuses the volcanic energy toward center */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  )
}

export default GradientBackground
