import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScramble } from '../../hooks/useScramble'

interface SectionTitleProps {
  label: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

function RevealWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {word}
      </motion.span>
    </span>
  )
}

export function SectionTitle({ label, title, subtitle, align = 'center' }: SectionTitleProps) {
  const isCenter = align === 'center'
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const scrambledLabel = useScramble(label, inView, 750)

  const words = title.split(' ')

  return (
    <div ref={ref} className={`mb-16 ${isCenter ? 'text-center' : 'text-left'}`}>
      <motion.p
        className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-600 mb-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
      >
        — {scrambledLabel} —
      </motion.p>

      <h2 className="font-display text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">
        {words.map((word, i) => (
          <RevealWord key={i} word={word} delay={0.08 + i * 0.09} />
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className={`text-zinc-600 text-lg leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
