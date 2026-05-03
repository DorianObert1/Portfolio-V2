import { motion } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { portfolioData } from '../data/portfolio'
import { useCountUp } from '../hooks/useCountUp'

const bioAccents = [
  null,
  { word: 'Alstom', color: 'text-indigo-600' },
  { word: 'Vallourec', color: 'text-cyan-600' },
  { word: 'DO Development', color: 'text-violet-600' },
]

function AnimatedStat({ stat }: { stat: { value: string; label: string; description: string } }) {
  const { display, ref } = useCountUp(stat.value, 1800)
  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3, borderColor: 'rgba(99,102,241,0.4)' }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-2xl transition-all duration-300 bg-white"
      style={{ border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 2px 16px rgba(99,102,241,0.08)' }}
    >
      <div className="font-display text-4xl font-bold text-gradient mb-1.5 tabular-nums">{display}</div>
      <div className="text-zinc-800 font-semibold text-sm mb-1">{stat.label}</div>
      <div className="text-zinc-500 text-xs leading-relaxed">{stat.description}</div>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-zinc-50" aria-labelledby="about-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle
            label="À propos"
            title="Le Développeur"
            subtitle="Expérience industrielle et ambition entrepreneuriale au service de projets qui comptent."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          <ScrollReveal delay={0.1}>
            <div className="space-y-5 text-zinc-700 text-[1.0625rem] leading-[1.75]">
              {portfolioData.personal.bio.map((para, i) => {
                const accent = bioAccents[i]
                if (!accent) return <p key={i}>{para}</p>
                const parts = para.split(accent.word)
                return (
                  <p key={i}>
                    {parts[0]}
                    <span className={`font-semibold ${accent.color}`}>{accent.word}</span>
                    {parts[1]}
                  </p>
                )
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {portfolioData.stats.map((stat, i) => (
                <AnimatedStat key={i} stat={stat} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
