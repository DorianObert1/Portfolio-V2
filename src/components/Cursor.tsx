import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const [ready, setReady] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 1400, damping: 60 })
  const dotY = useSpring(mouseY, { stiffness: 1400, damping: 60 })
  const ringX = useSpring(mouseX, { stiffness: 130, damping: 16, mass: 0.7 })
  const ringY = useSpring(mouseY, { stiffness: 130, damping: 16, mass: 0.7 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('cursor-custom')
    setReady(true)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsHidden(false)

      const el = e.target as HTMLElement
      const tag = el.tagName.toLowerCase()
      const cur = window.getComputedStyle(el).cursor
      setIsPointer(tag === 'a' || tag === 'button' || cur === 'pointer' || cur === 'grab')
    }
    const onLeave = () => setIsHidden(true)
    const onEnter = () => setIsHidden(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.documentElement.classList.remove('cursor-custom')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY])

  if (!ready) return null

  return (
    <>
      {/* Outer ring — slow lag */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isPointer ? 44 : 34,
          height: isPointer ? 44 : 34,
          borderColor: isPointer ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.45)',
          opacity: isHidden ? 0 : 1,
          scale: isPointer ? 1.15 : 1,
          backgroundColor: isPointer ? 'rgba(99,102,241,0.06)' : 'transparent',
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Inner dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-400"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isPointer ? 5 : 4,
          height: isPointer ? 5 : 4,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.12 }}
      />
    </>
  )
}
