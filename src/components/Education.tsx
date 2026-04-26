import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { GraduationCap, Award, BookOpen } from 'lucide-react'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { portfolioData } from '../data/portfolio'
import { useIsMobile } from '../hooks/useIsMobile'
import type { Education as EduType } from '../data/portfolio'

const ACCENTS = ['#6366f1', '#06b6d4', '#8b5cf6']

const EDU_META = [
  { level: 'Bac+5', Icon: Award,      school_short: 'Ynov' },
  { level: 'Bac+3', Icon: GraduationCap, school_short: 'UPHF' },
  { level: 'Bac',   Icon: BookOpen,    school_short: 'LN'   },
]

function EduCard({ edu, i }: { edu: EduType; i: number }) {
  const accent  = ACCENTS[i]
  const { level, Icon } = EDU_META[i]
  const startYear = edu.period.split('—')[0].trim()
  const endYear   = edu.period.split('—')[1]?.trim() ?? ''
  const isMobile = useIsMobile()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spring = { stiffness: 380, damping: 32 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [9, -9]), spring)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), spring)

  const [spot, setSpot] = useState({ x: 50, y: 50, on: false })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px   = (e.clientX - rect.left) / rect.width  - 0.5
    const py   = (e.clientY - rect.top)  / rect.height - 0.5
    mouseX.set(px)
    mouseY.set(py)
    setSpot({ x: (px + 0.5) * 100, y: (py + 0.5) * 100, on: true })
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setSpot(s => ({ ...s, on: false }))
  }

  const isActive = edu.badge === 'En cours'

  return (
    <ScrollReveal delay={i * 0.13}>
      <div style={{ perspective: isMobile ? undefined : '900px' }} className="h-full">
        <motion.article
          style={{ rotateX: isMobile ? 0 : rotateX, rotateY: isMobile ? 0 : rotateY }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative flex flex-col h-full rounded-2xl overflow-hidden cursor-default select-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.13, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Gradient border wrapper ── */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: 1,
              background: isActive
                ? `linear-gradient(135deg, ${accent}60 0%, ${accent}20 40%, transparent 60%)`
                : `linear-gradient(135deg, ${accent}30 0%, transparent 60%)`,
            }}
          />

          {/* ── Card background ── */}
          <div
            className="absolute inset-[1px] rounded-2xl pointer-events-none"
            style={{ background: 'rgba(9,9,11,0.95)' }}
          />

          {/* ── Ambient gradient ── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${accent}0C 0%, transparent 70%)`,
            }}
          />

          {/* ── Spotlight ── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
            style={{
              opacity: spot.on ? 1 : 0,
              background: `radial-gradient(circle 220px at ${spot.x}% ${spot.y}%, ${accent}16 0%, transparent 70%)`,
            }}
          />

          {/* ── Scan line for active card ── */}
          {isActive && (
            <motion.div
              className="absolute inset-x-0 h-px pointer-events-none z-20"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* ── Ghost year ── */}
          <div
            className="absolute -bottom-4 -right-2 font-display font-black leading-none pointer-events-none select-none"
            style={{
              fontSize: 'clamp(80px, 14vw, 140px)',
              color: `${accent}09`,
              letterSpacing: '-0.04em',
            }}
            aria-hidden="true"
          >
            {endYear || startYear}
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col flex-1 p-6 lg:p-7">

            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              {/* Icon emblem */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `${accent}12`,
                  border: `1px solid ${accent}30`,
                  boxShadow: `0 0 20px ${accent}18`,
                }}
              >
                <Icon size={20} style={{ color: accent }} />
              </div>

              {/* Badge */}
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full"
                  style={{
                    color: isActive ? accent : 'rgba(161,161,170,0.8)',
                    background: isActive ? `${accent}12` : 'rgba(39,39,42,0.6)',
                    border: `1px solid ${isActive ? `${accent}30` : 'rgba(63,63,70,0.5)'}`,
                  }}
                >
                  {isActive && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  {edu.badge}
                </span>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                  style={{ color: `${accent}90`, background: `${accent}0A`, border: `1px solid ${accent}18` }}
                >
                  {level}
                </span>
              </div>
            </div>

            {/* Period */}
            <p className="font-mono text-xs mb-3" style={{ color: `${accent}80` }}>
              {edu.period}
            </p>

            {/* Degree */}
            <h3 className="font-display font-bold text-zinc-50 leading-snug mb-1.5" style={{ fontSize: 'clamp(15px, 2vw, 18px)' }}>
              {edu.degree.split('—')[0].trim()}
            </h3>

            {/* School */}
            <p className="text-sm font-semibold mb-4" style={{ color: accent }}>
              {edu.school}
            </p>

            {/* Divider */}
            <div
              className="h-px mb-4 rounded-full"
              style={{ background: `linear-gradient(to right, ${accent}35, transparent)` }}
            />

            {/* Description */}
            <p className="text-zinc-500 text-sm leading-relaxed flex-1">
              {edu.description}
            </p>

            {/* Progress bar for active */}
            {isActive && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-zinc-600">Progression</span>
                  <span className="font-mono text-[10px]" style={{ color: accent }}>En cours</span>
                </div>
                <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '65%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
          </div>
        </motion.article>
      </div>
    </ScrollReveal>
  )
}

export function Education() {
  return (
    <section id="education" className="py-24 md:py-36 bg-zinc-950" aria-labelledby="education-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle
            label="Formation"
            title="Parcours Académique"
            subtitle="Une base technique solide construite en parallèle d'une expérience industrielle réelle."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {portfolioData.education.map((edu, i) => (
            <EduCard key={i} edu={edu} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
