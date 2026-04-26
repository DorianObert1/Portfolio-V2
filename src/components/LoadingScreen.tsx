import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'DORIAN OBERT'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 900)
    const t2 = setTimeout(() => setPhase('exit'), 1600)
    const t3 = setTimeout(() => onComplete(), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 hero-grid opacity-50" />

          {/* Orb */}
          <motion.div
            className="absolute w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Letters */}
          <div className="relative flex gap-[0.06em]" aria-label={NAME}>
            {NAME.split('').map((char, i) => (
              <motion.span
                key={i}
                className="font-display font-black text-zinc-50 select-none"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.02em', display: char === ' ' ? 'block' : undefined, width: char === ' ' ? '0.5em' : undefined }}
                initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                animate={phase !== 'enter' ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Underline */}
          <motion.div
            className="relative mt-4 h-px rounded-full overflow-hidden"
            style={{ width: 'clamp(200px, 40vw, 380px)', background: 'rgba(99,102,241,0.15)' }}
            initial={{ scaleX: 0 }}
            animate={phase !== 'enter' ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 w-full"
              style={{ background: 'linear-gradient(90deg, transparent, #6366f1, #a78bfa, transparent)' }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Role subtitle */}
          <motion.p
            className="mt-5 font-mono text-xs tracking-[0.35em] uppercase text-zinc-600"
            initial={{ opacity: 0 }}
            animate={phase !== 'enter' ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            Développeur Fullstack · DevOps
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
