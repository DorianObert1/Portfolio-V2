import { useRef } from 'react'
import { MapPin, Calendar } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { portfolioData } from '../data/portfolio'
import type { ColorKey } from '../data/portfolio'

const colorMap: Record<
  ColorKey,
  { dot: string; dotHex: string; badge: string; company: string; border: string; chevron: string }
> = {
  indigo: {
    dot: 'bg-indigo-500',
    dotHex: '#6366f1',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    company: 'text-indigo-600',
    border: 'hover:border-indigo-400',
    chevron: 'text-indigo-500',
  },
  cyan: {
    dot: 'bg-cyan-500',
    dotHex: '#06b6d4',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    company: 'text-cyan-600',
    border: 'hover:border-cyan-400',
    chevron: 'text-cyan-500',
  },
  violet: {
    dot: 'bg-violet-500',
    dotHex: '#8b5cf6',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    company: 'text-violet-600',
    border: 'hover:border-violet-400',
    chevron: 'text-violet-500',
  },
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.3'],
  })

  // Timeline line draws itself as you scroll
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-36 bg-white" aria-labelledby="experience-title">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle
            label="Expériences"
            title="Parcours Professionnel"
            subtitle="4 ans à construire de vrais produits dans des environnements industriels — des systèmes embarqués aux plateformes SaaS mondiales."
          />
        </ScrollReveal>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-4 md:left-5 top-2 bottom-8 w-px bg-zinc-200 overflow-hidden">
            <motion.div
              className="w-full origin-top"
              style={{
                scaleY: lineScaleY,
                opacity: lineOpacity,
                background: 'linear-gradient(to bottom, #6366f1, #06b6d4, #8b5cf6)',
                height: '100%',
              }}
            />
          </div>

          <ol className="space-y-10">
            {portfolioData.experiences.map((exp, i) => {
              const c = colorMap[exp.color]

              return (
                <ScrollReveal key={exp.id} delay={i * 0.12}>
                  <li className="relative pl-14 md:pl-16">
                    {/* Dot on timeline */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                      className="absolute left-1.5 md:left-2 top-5 z-10"
                    >
                      <div
                        className={`w-5 h-5 rounded-full ${c.dot} ring-4 ring-white`}
                        style={{ boxShadow: `0 0 14px ${c.dotHex}80` }}
                      />
                    </motion.div>

                    {/* Card */}
                    <motion.article
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`p-6 md:p-8 rounded-2xl ${c.border} transition-all duration-300`}
                      style={{
                        background: `linear-gradient(135deg, ${c.dotHex}08 0%, rgba(255,255,255,1) 100%)`,
                        border: `1px solid ${c.dotHex}30`,
                        boxShadow: `0 2px 20px ${c.dotHex}10`,
                      }}
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div>
                          <span className={`inline-flex text-xs font-mono px-2.5 py-1 rounded-full border ${c.badge} mb-3`}>
                            {exp.type}
                          </span>
                          <h3 className={`font-display text-xl md:text-2xl font-bold ${c.company}`}>
                            {exp.company}
                          </h3>
                          <p className="text-zinc-700 font-semibold mt-0.5">{exp.role}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 text-xs text-zinc-500 font-mono shrink-0">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} aria-hidden="true" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={11} aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-zinc-600 text-sm leading-relaxed mb-5">{exp.description}</p>

                      <ul className="space-y-2 mb-6" aria-label="Key contributions">
                        {exp.highlights.map((h, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + j * 0.05 + 0.3, duration: 0.4 }}
                            className="flex items-start gap-3 text-sm text-zinc-600"
                          >
                            <span className={`mt-1 shrink-0 text-base leading-none ${c.chevron}`} aria-hidden="true">›</span>
                            <span>{h}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2" aria-label="Technologies utilisées">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg text-zinc-700 text-xs font-mono"
                            style={{ background: `${c.dotHex}0C`, border: `1px solid ${c.dotHex}30` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  </li>
                </ScrollReveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
