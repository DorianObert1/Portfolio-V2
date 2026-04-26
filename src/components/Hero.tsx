import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, Download } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useIsMobile } from '../hooks/useIsMobile'
import { MagneticWrapper } from './ui/MagneticWrapper'
import { portfolioData } from '../data/portfolio'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
})

const ORBS = [
  { color: 'rgba(99,102,241,0.22)',  size: 640, x: '68%',  y: '-10%', dur: 14 },
  { color: 'rgba(6,182,212,0.12)',   size: 480, x: '-5%',  y: '80%',  dur: 18 },
  { color: 'rgba(139,92,246,0.14)',  size: 400, x: '85%',  y: '65%',  dur: 22 },
  { color: 'rgba(244,114,182,0.07)', size: 300, x: '35%',  y: '40%',  dur: 16 },
]

export function Hero() {
  const animatedRole = useTypewriter(portfolioData.personal.animatedRoles, 80, 45, 2400)
  const sectionRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 40, damping: 25 })
  const springY = useSpring(rawY, { stiffness: 40, damping: 25 })

  const orb0X = useTransform(springX, v => v * 0.04)
  const orb0Y = useTransform(springY, v => v * 0.04)
  const orb1X = useTransform(springX, v => v * -0.03)
  const orb1Y = useTransform(springY, v => v * -0.03)
  const orb2X = useTransform(springX, v => v * 0.06)
  const orb2Y = useTransform(springY, v => v * 0.06)
  const orb3X = useTransform(springX, v => v * -0.05)
  const orb3Y = useTransform(springY, v => v * -0.05)
  const orbOffsets = [{ x: orb0X, y: orb0Y }, { x: orb1X, y: orb1Y }, { x: orb2X, y: orb2Y }, { x: orb3X, y: orb3Y }]

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    rawX.set(e.clientX)
    rawY.set(e.clientY)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
      onMouseMove={handleMouseMove}
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-zinc-950 hero-grid" />

      {/* Animated orbs — static on mobile (blur+animation are GPU-heavy) */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: isMobile ? 'blur(24px)' : 'blur(48px)',
            x: isMobile ? 0 : orbOffsets[i].x,
            y: isMobile ? 0 : orbOffsets[i].y,
            marginLeft: -(orb.size / 2),
            marginTop: -(orb.size / 2),
          }}
          animate={isMobile ? {} : {
            x: [0, 30, -20, 0],
            y: [0, -25, 20, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 2.5 }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-4xl">

          {/* Badge disponibilité */}
          <motion.div {...fadeUp(0.35)}>
            <MagneticWrapper>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/25 bg-emerald-500/5 mb-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-emerald-400 text-sm font-mono">{portfolioData.personal.availability}</span>
              </div>
            </MagneticWrapper>
          </motion.div>

          {/* Nom */}
          <motion.h1
            {...fadeUp(0.5)}
            className="font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.95] tracking-tight text-zinc-50 mb-5"
          >
            Dorian
            <br />
            <span className="text-gradient">Obert.</span>
          </motion.h1>

          {/* Sous-titre animé — deux lignes sur mobile pour éviter le layout shift du typewriter */}
          <motion.div
            {...fadeUp(0.7)}
            className="mb-7 font-display text-xl md:text-2xl text-zinc-400 font-medium"
            aria-label={`Développeur Fullstack & ${animatedRole}`}
          >
            {/* Desktop : inline — Mobile : bloc séparé */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-x-3">
              <span>Développeur Fullstack</span>
              <div className="flex items-center gap-x-3 h-8 md:h-auto">
                <span className="text-zinc-700" aria-hidden="true">·</span>
                <span className="text-indigo-400 whitespace-nowrap" aria-live="polite">
                  {animatedRole}
                  <span className="inline-block w-px h-[1.1em] bg-indigo-400 ml-0.5 align-middle animate-blink" aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p {...fadeUp(0.85)} className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            4+ ans à construire des logiciels de production pour des entreprises de premier plan.
            Des simulateurs embarqués chez{' '}
            <span className="text-zinc-200 font-medium">Alstom</span> aux plateformes B2B mondiales chez{' '}
            <span className="text-zinc-200 font-medium">Vallourec</span> —{' '}
            je construis des solutions qui passent à l&apos;échelle.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(1.0)} className="flex flex-wrap items-center gap-4 mb-14">
            <MagneticWrapper>
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 inline-block"
              >
                Voir les projets →
              </a>
            </MagneticWrapper>
            <MagneticWrapper>
              <a
                href={portfolioData.personal.cvUrl}
                download
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-50 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={15} />
                Télécharger le CV
              </a>
            </MagneticWrapper>
          </motion.div>

          {/* Liens sociaux */}
          <motion.div {...fadeUp(1.15)} className="flex items-center gap-6">
            {[
              { href: portfolioData.personal.github, Icon: Github, label: 'GitHub' },
              { href: portfolioData.personal.linkedin, Icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${portfolioData.personal.email}`, Icon: Mail, label: portfolioData.personal.email },
            ].map(({ href, Icon, label }) => (
              <MagneticWrapper key={label} strength={0.3} radius={60}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200 text-sm"
                  aria-label={label}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline font-mono">{label}</span>
                </a>
              </MagneticWrapper>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-700"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Défiler</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
