import { Mail, Linkedin, Github, Download, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'
import { MagneticWrapper } from './ui/MagneticWrapper'
import { portfolioData } from '../data/portfolio'

export function Contact() {
  const { personal } = portfolioData

  return (
    <section id="contact" className="py-24 md:py-36 bg-zinc-950 relative overflow-hidden" aria-labelledby="contact-title">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-400 mb-4">— Contact —</p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-50 tracking-tight mb-6" id="contact-title">
            Travaillons
            <br />
            <span className="text-gradient">Ensemble.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            À la recherche d&apos;un CDI Fullstack / DevOps à partir d&apos;{' '}
            <span className="text-zinc-200 font-medium">octobre 2026</span>.
            Ouvert à toute discussion autour de défis techniques ambitieux.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <MagneticWrapper strength={0.35} radius={120}>
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-3.5 md:px-8 md:py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm md:text-lg font-semibold transition-colors duration-200 hover:shadow-2xl hover:shadow-indigo-500/30 mb-12 max-w-full"
            >
              <Mail size={20} aria-hidden="true" />
              {personal.email}
            </motion.a>
          </MagneticWrapper>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-2 text-zinc-600 text-sm font-mono mb-10">
            <MapPin size={13} aria-hidden="true" />
            <span>{personal.location}</span>
            <span className="text-zinc-800">·</span>
            <span className="text-emerald-500">{personal.availability}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-200 text-sm font-medium" aria-label="Profil LinkedIn">
              <Linkedin size={16} aria-hidden="true" />LinkedIn
            </a>
            <span className="text-zinc-800 text-xs" aria-hidden="true">·</span>
            <a href={personal.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-200 text-sm font-medium" aria-label="Profil GitHub">
              <Github size={16} aria-hidden="true" />GitHub
            </a>
            <span className="text-zinc-800 text-xs" aria-hidden="true">·</span>
            <a href={personal.cvUrl} download
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors duration-200 text-sm font-medium" aria-label="Télécharger le CV">
              <Download size={16} aria-hidden="true" />Télécharger le CV
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
