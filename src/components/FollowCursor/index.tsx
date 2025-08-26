import './styles.css'
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { MouseEvent, useState, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface FollowCursorProps {
  style: {
    width: number;
    height: number;
    display: string;
    placeItems: string;
    placeContent: string;
    perspective: number;
  };
  className?: string;
  children?: ReactNode;
}

export default function FollowCursor(props: FollowCursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(props.style.width/2)
  const y = useMotionValue(props.style.height/2)

  const rotateX = useTransform(y, [0, props.style.height], [-2.5, 2.5])
  const rotateY = useTransform(x, [0, props.style.width], [2.5, -2.5])

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouse(event: MouseEvent) {
    setIsHovering(true)
    const rect = event.currentTarget.getBoundingClientRect();
    
    mouseY.set(event.clientY - rect.top);
    mouseX.set(event.clientX - rect.left);
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }
  
  function setDefault() {
    setIsHovering(false)
    x.set(props.style.width/2);
    y.set(props.style.height/2);
  }

  const trackingMouseStyle = {
    background: useMotionTemplate`radial-gradient(550px circle at ${mouseX}px ${mouseY}px, rgb(255, 255, 255, 0.4), transparent 80%)`,
    zIndex: '-30'
  }

  const defaultCardStyle = {
    background: 'transparent'
  }

  return ( 
      <div
          style={props.style}
          onMouseMove={handleMouse}
          onMouseLeave={setDefault}
      >
          <motion.div
              className={twMerge(props.className, 'relative')}
              style={{
                rotateX,
                rotateY
              }}
          >
            <motion.div
              className={`z-10 gradient-div absolute w-full h-full top-0 left-0 transition-all rounded-xl`}
              style={isHovering ? trackingMouseStyle : defaultCardStyle}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="w-full h-full z-20 pointer-events-none">
              {props.children}
            </div>
          </motion.div>
      </div>
  )
}