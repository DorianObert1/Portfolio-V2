import { useState } from 'react'
import { Monitor, Server, Cloud, Database, Code2, Wrench } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { TechIcon } from './ui/TechIcon'
import { portfolioData } from '../data/portfolio'

const ICONS = [Monitor, Server, Cloud, Database, Code2, Wrench]

const ACCENTS = [
  '#818cf8', // indigo  — Frontend
  '#67e8f9', // cyan    — Backend
  '#a78bfa', // violet  — DevOps & Cloud
  '#34d399', // emerald — Databases
  '#fbbf24', // amber   — Langages
  '#f472b6', // pink    — Outils
]

export function Skills() {
  const [active, setActive] = useState(0)
  const group = portfolioData.skills[active]
  const accent = ACCENTS[active]

  return (
    <section id="skills" className="py-24 md:py-36 bg-zinc-50" aria-labelledby="skills-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle
            label="Compétences"
            title="Stack Technique"
            subtitle="Du fullstack au pipeline — chaque couche de la chaîne de livraison logicielle moderne."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* ── Category list (left) ─────────────────────────── */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible lg:w-64 shrink-0 pb-1 lg:pb-0">
              {portfolioData.skills.map((g, i) => {
                const Icon = ICONS[i]
                const color = ACCENTS[i]
                const isActive = i === active
                return (
                  <button
                    key={g.category}
                    onClick={() => setActive(i)}
                    className="relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 shrink-0 lg:shrink lg:w-full group"
                    style={{
                      background: isActive ? `${color}12` : 'rgba(255,255,255,0.9)',
                      border: `1px solid ${isActive ? `${color}40` : 'rgba(0,0,0,0.10)'}`,
                      boxShadow: isActive ? `0 2px 12px ${color}18` : 'none',
                    }}
                    aria-pressed={isActive}
                    aria-label={g.category}
                  >
                    {/* Active indicator bar */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all duration-300"
                      style={{
                        height: isActive ? '60%' : '0%',
                        backgroundColor: color,
                      }}
                      aria-hidden="true"
                    />

                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                      style={{
                        background: isActive ? `${color}15` : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${isActive ? `${color}35` : 'rgba(0,0,0,0.10)'}`,
                      }}
                    >
                      <Icon size={14} style={{ color: isActive ? color : '#71717a' }} />
                    </div>

                    {/* Label */}
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium leading-tight truncate transition-colors duration-200"
                        style={{ color: isActive ? '#09090b' : '#3f3f46' }}
                      >
                        {g.category}
                      </p>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: isActive ? color : '#71717a' }}>
                        {g.items.length} techs
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── Skills panel (right) ─────────────────────────── */}
            <div
              className="relative flex-1 rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${accent}35`, background: `linear-gradient(135deg, ${accent}08 0%, rgba(255,255,255,1) 100%)`, boxShadow: `0 4px 24px ${accent}12` }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 80% 20%, ${accent}0A 0%, transparent 65%)` }}
                aria-hidden="true"
              />
              {/* Large ghost letter */}
              <div
                className="absolute -bottom-8 -right-4 font-display font-black text-[160px] leading-none select-none pointer-events-none"
                style={{ color: `${accent}07` }}
                aria-hidden="true"
              >
                {group.category.charAt(0)}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="relative p-6 lg:p-8"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
                      >
                        {(() => { const Icon = ICONS[active]; return <Icon size={15} style={{ color: accent }} /> })()}
                      </div>
                      <h3 className="font-display font-bold text-zinc-900 text-lg">{group.category}</h3>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full" style={{ color: accent, background: `${accent}12`, border: `1px solid ${accent}25` }}>
                      {group.items.length} techs
                    </span>
                  </div>

                  {/* Skill cards grid */}
                  <div
                    className="grid gap-2.5"
                    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}
                    role="list"
                    aria-label={`Technologies ${group.category}`}
                  >
                    {group.items.map((skill, i) => (
                      <motion.div
                        key={skill}
                        role="listitem"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
                        className="group relative flex flex-col justify-between p-3.5 rounded-xl cursor-default overflow-hidden"
                        style={{
                          background: `rgba(255,255,255,0.9)`,
                          border: `1px solid ${accent}25`,
                        }}
                        whileHover={{ y: -2, transition: { duration: 0.15 } }}
                        onHoverStart={(e) => {
                          const el = (e.target as HTMLElement).closest('[role="listitem"]') as HTMLElement
                          if (el) {
                            el.style.background = `${accent}0E`
                            el.style.borderColor = `${accent}35`
                          }
                        }}
                        onHoverEnd={(e) => {
                          const el = (e.target as HTMLElement).closest('[role="listitem"]') as HTMLElement
                          if (el) {
                            el.style.background = `${accent}10`
                            el.style.borderColor = `${accent}40`
                          }
                        }}
                      >
                        {/* Top row: icon or index */}
                        <div className="flex items-center justify-between mb-2.5">
                          <TechIcon
                            name={skill}
                            size={18}
                            color={`${accent}70`}
                            className="group-hover:opacity-100 transition-opacity duration-200"
                          />
                          <p className="font-mono text-[10px] transition-colors duration-200"
                            style={{ color: `${accent}50` }}>
                            {String(i + 1).padStart(2, '0')}
                          </p>
                        </div>
                        {/* Skill name */}
                        <p className="font-display font-semibold text-sm text-zinc-800 group-hover:text-zinc-900 transition-colors duration-200 leading-snug">
                          {skill}
                        </p>
                        {/* Bottom accent line */}
                        <div
                          className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300"
                          style={{
                            width: '0%',
                            background: accent,
                          }}
                          ref={(el) => {
                            if (!el) return
                            const parent = el.closest('[role="listitem"]')
                            if (!parent) return
                            parent.addEventListener('mouseenter', () => { el.style.width = '100%' })
                            parent.addEventListener('mouseleave', () => { el.style.width = '0%' })
                          }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
