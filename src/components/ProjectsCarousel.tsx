import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2 } from 'lucide-react'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { portfolioData } from '../data/portfolio'
import { ProjectModal } from './ProjectModal'
import type { Project, ProjectImage } from '../data/portfolio'

// ─── Mockup SVG Overlays ──────────────────────────────────────────────────────

function MockupLanding() {
  return (
    <svg viewBox="0 0 420 240" fill="none" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <rect x="0" y="0" width="420" height="32" fill="white" fillOpacity="0.06" />
      <rect x="16" y="10" width="36" height="12" rx="3" fill="white" fillOpacity="0.35" />
      <rect x="300" y="10" width="40" height="12" rx="6" fill="white" fillOpacity="0.2" />
      <rect x="350" y="10" width="54" height="12" rx="6" fill="white" fillOpacity="0.4" />
      <rect x="60" y="70" width="180" height="22" rx="4" fill="white" fillOpacity="0.3" />
      <rect x="60" y="102" width="130" height="14" rx="3" fill="white" fillOpacity="0.18" />
      <rect x="60" y="124" width="150" height="14" rx="3" fill="white" fillOpacity="0.12" />
      <rect x="60" y="156" width="96" height="28" rx="8" fill="white" fillOpacity="0.35" />
      <rect x="168" y="156" width="80" height="28" rx="8" fill="white" fillOpacity="0.12" />
      <rect x="264" y="50" width="130" height="150" rx="12" fill="white" fillOpacity="0.05" />
      <rect x="278" y="68" width="102" height="70" rx="6" fill="white" fillOpacity="0.08" />
      <rect x="278" y="148" width="60" height="10" rx="3" fill="white" fillOpacity="0.18" />
      <rect x="278" y="164" width="80" height="10" rx="3" fill="white" fillOpacity="0.1" />
    </svg>
  )
}

function MockupCatalog() {
  return (
    <svg viewBox="0 0 420 240" fill="none" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <rect x="0" y="0" width="420" height="28" fill="white" fillOpacity="0.06" />
      <rect x="16" y="8" width="36" height="12" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="16" y="44" width="90" height="10" rx="3" fill="white" fillOpacity="0.2" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 16 + col * 136
        const y = 68 + row * 90
        return (
          <g key={i}>
            <rect x={x} y={y} width="122" height="72" rx="8" fill="white" fillOpacity="0.05" />
            <rect x={x} y={y} width="122" height="44" rx="8" fill="white" fillOpacity="0.07" />
            <rect x={x + 8} y={y + 52} width="60" height="8" rx="2" fill="white" fillOpacity="0.2" />
            <rect x={x + 8} y={y + 63} width="40" height="6" rx="2" fill="white" fillOpacity="0.12" />
          </g>
        )
      })}
    </svg>
  )
}

function MockupDashboard() {
  return (
    <svg viewBox="0 0 420 240" fill="none" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <rect x="0" y="0" width="90" height="240" fill="white" fillOpacity="0.04" />
      <rect x="12" y="12" width="66" height="18" rx="4" fill="white" fillOpacity="0.2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="12" y={44 + i * 30} width="66" height="18" rx="4" fill="white" fillOpacity={i === 0 ? 0.25 : 0.1} />
      ))}
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        return <rect key={i} x={104 + col * 160} y={10 + row * 68} width="148" height="56" rx="8" fill="white" fillOpacity="0.06" />
      })}
      <rect x="104" y="150" width="308" height="78" rx="8" fill="white" fillOpacity="0.05" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="112" y={162 + i * 12} width={160 + i * 20} height="6" rx="2" fill="white" fillOpacity="0.1" />
      ))}
    </svg>
  )
}

function MockupGallery() {
  return (
    <svg viewBox="0 0 420 240" fill="none" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <rect x="0" y="0" width="420" height="28" fill="white" fillOpacity="0.06" />
      <rect x="16" y="8" width="36" height="12" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="16" y="42" width="190" height="110" rx="8" fill="white" fillOpacity="0.06" />
      <rect x="218" y="42" width="90" height="52" rx="6" fill="white" fillOpacity="0.06" />
      <rect x="314" y="42" width="90" height="52" rx="6" fill="white" fillOpacity="0.06" />
      <rect x="218" y="100" width="90" height="52" rx="6" fill="white" fillOpacity="0.08" />
      <rect x="314" y="100" width="90" height="52" rx="6" fill="white" fillOpacity="0.04" />
      <rect x="16" y="162" width="386" height="58" rx="8" fill="white" fillOpacity="0.04" />
      <rect x="28" y="172" width="80" height="10" rx="3" fill="white" fillOpacity="0.2" />
      <rect x="28" y="188" width="120" height="8" rx="3" fill="white" fillOpacity="0.12" />
    </svg>
  )
}

function MockupCollection() {
  return (
    <svg viewBox="0 0 420 240" fill="none" className="absolute inset-0 w-full h-full opacity-[0.18]">
      <rect x="0" y="0" width="420" height="28" fill="white" fillOpacity="0.06" />
      <rect x="16" y="8" width="36" height="12" rx="3" fill="white" fillOpacity="0.3" />
      <rect x="300" y="6" width="104" height="16" rx="8" fill="white" fillOpacity="0.15" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={16 + i * 80} y="40" width="72" height="48" rx="8" fill="white" fillOpacity={i === 2 ? 0.12 : 0.05} />
          <rect x={22 + i * 80} y="94" width="46" height="7" rx="2" fill="white" fillOpacity="0.15" />
          <rect x={22 + i * 80} y="105" width="30" height="5" rx="2" fill="white" fillOpacity="0.1" />
        </g>
      ))}
      <rect x="16" y="126" width="386" height="2" fill="white" fillOpacity="0.06" />
      <rect x="16" y="138" width="100" height="14" rx="4" fill="white" fillOpacity="0.2" />
      <rect x="16" y="162" width="386" height="64" rx="8" fill="white" fillOpacity="0.05" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={28} y={174 + i * 16} width={280 + (i === 1 ? 40 : i === 2 ? -40 : 0)} height="8" rx="3" fill="white" fillOpacity="0.12" />
      ))}
    </svg>
  )
}

const mockupComponents = {
  landing: MockupLanding,
  catalog: MockupCatalog,
  dashboard: MockupDashboard,
  gallery: MockupGallery,
  collection: MockupCollection,
}

// ─── Tech Code Block ──────────────────────────────────────────────────────────

const TECH_CAT: Record<string, string> = {
  'React 19': 'frontend', 'React 18': 'frontend', 'React': 'frontend',
  'Angular': 'frontend', 'TypeScript': 'frontend', 'JavaScript': 'frontend',
  'Tailwind': 'frontend', 'Tailwind CSS': 'frontend', 'HTML/CSS': 'frontend',
  'Framer Motion': 'frontend', 'Vite': 'frontend', 'Zustand': 'frontend',
  'Node.js': 'backend', 'Express.js': 'backend', 'Fastify': 'backend',
  'FastAPI': 'backend', 'Nodemailer': 'backend', 'JWT': 'backend', 'PHP': 'backend',
  'PostgreSQL': 'data', 'MySQL': 'data', 'MongoDB': 'data',
  'MariaDB': 'data', 'Prisma': 'data', 'Prisma ORM': 'data',
  'Docker': 'devops', 'GitLab CI/CD': 'devops', 'GitHub Actions': 'devops',
  'Nginx': 'devops', 'Caddy': 'devops', 'Tailscale': 'devops',
}

const CAT_ORDER = ['frontend', 'backend', 'data', 'devops', 'autres']

function groupStack(stack: string[]) {
  const g: Record<string, string[]> = {}
  stack.forEach((t) => {
    const c = TECH_CAT[t] ?? 'autres'
    ;(g[c] ??= []).push(t)
  })
  return CAT_ORDER.filter((c) => g[c]).map((c) => ({ cat: c, items: g[c] }))
}

function TechCodeBlock({ stack, accent }: { stack: string[]; accent: string }) {
  const groups = groupStack(stack)
  return (
    <div className="mt-auto">
      <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.05]">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <span className="ml-2 font-mono text-[10px] text-zinc-600 tracking-wide">stack.config</span>
        </div>
        <div className="px-4 py-3 space-y-1.5 font-mono text-[11px]" aria-label="Stack technique">
          <div className="text-zinc-700 select-none">const stack = {'{'}</div>
          {groups.map(({ cat, items }) => (
            <div key={cat} className="flex items-start gap-0 pl-4">
              <span className="text-zinc-500 shrink-0 w-[68px]">{cat}</span>
              <span className="text-zinc-700 shrink-0 mx-2">:</span>
              <span className="flex flex-wrap gap-x-2 gap-y-1 leading-relaxed" style={{ color: `${accent}D0` }}>
                {items.map((tech, i) => (
                  <span key={tech}>
                    "{tech}"{i < items.length - 1 && <span className="text-zinc-700">,</span>}
                  </span>
                ))}
              </span>
            </div>
          ))}
          <div className="text-zinc-700 select-none">{'}'}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Mini Image Carousel ──────────────────────────────────────────────────────

function ProjectImageSlide({ image }: { image: ProjectImage }) {
  const Mockup = mockupComponents[image.mockupType]
  return (
    <div
      className="absolute inset-0 w-full h-full rounded-t-2xl overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${image.gradientFrom} 0%, ${image.gradientVia} 50%, ${image.gradientTo} 100%)` }}
    >
      {image.src ? (
        <img src={image.src} alt={image.label} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
      ) : (
        <Mockup />
      )}
      <div className="absolute inset-0 opacity-[0.035]" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)' }} />
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-zinc-950/60 to-transparent" />
      <div className="absolute bottom-2.5 left-3">
        <span className="font-mono text-[10px] text-white/35 tracking-wider uppercase">{image.label}</span>
      </div>
    </div>
  )
}

function MiniImageCarousel({ images, isActive, accentColor }: { images: ProjectImage[]; isActive: boolean; accentColor: string }) {
  const [idx, setIdx] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!isActive) { setIdx(0); return }
    intervalRef.current = setInterval(() => setIdx((i) => (i + 1) % images.length), 2800)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isActive, images.length])

  return (
    <div className="relative w-full h-44 rounded-t-2xl overflow-hidden bg-zinc-900">
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
          <ProjectImageSlide image={images[idx]} />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i) }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: i === idx ? accentColor : 'rgba(255,255,255,0.2)', transform: i === idx ? 'scale(1.3)' : 'scale(1)' }}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── 3D Carousel config ───────────────────────────────────────────────────────

const spring = { type: 'spring' as const, stiffness: 240, damping: 28, mass: 0.85 }

function getVariant(idx: number, current: number, total: number) {
  const diff = ((idx - current) % total + total) % total
  if (diff === 0) return 'center'
  if (diff === 1) return 'right'
  return 'left'
}

const CARD_W = 420

const variants = {
  center: { x: 0,               rotateY: 0,   z: 0,    scale: 1,    opacity: 1,    filter: 'brightness(1)' },
  left:   { x: -(CARD_W * 0.8), rotateY: 42,  z: -280, scale: 0.78, opacity: 0.5,  filter: 'brightness(0.45)' },
  right:  { x:  (CARD_W * 0.8), rotateY: -42, z: -280, scale: 0.78, opacity: 0.5,  filter: 'brightness(0.45)' },
}

// ─── Main Carousel ────────────────────────────────────────────────────────────

export function ProjectsCarousel() {
  const total = portfolioData.projects.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const prefersReduced = useReducedMotion()
  const isDragging = useRef(false)

  const navigate = useCallback((dir: 1 | -1) => {
    setCurrent((c) => ((c + dir) % total + total) % total)
  }, [total])

  // Auto-advance
  useEffect(() => {
    if (paused || prefersReduced || selectedProject) return
    const id = setInterval(() => navigate(1), 4500)
    return () => clearInterval(id)
  }, [paused, navigate, prefersReduced, selectedProject])

  // Keyboard navigation
  useEffect(() => {
    if (selectedProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, selectedProject])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50
    if (info.offset.x < -threshold || info.velocity.x < -150) navigate(1)
    else if (info.offset.x > threshold || info.velocity.x > 150) navigate(-1)
    setTimeout(() => { isDragging.current = false }, 50)
  }

  const handleCardClick = (project: Project, pos: string) => {
    if (isDragging.current) return
    if (pos === 'center') {
      setSelectedProject(project)
    } else {
      const idx = portfolioData.projects.findIndex((p) => p.id === project.id)
      setCurrent(idx)
    }
  }

  return (
    <>
      <section
        id="projects"
        className="py-24 md:py-36 bg-zinc-950 overflow-hidden"
        aria-labelledby="projects-title"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <SectionTitle
              label="Projets"
              title="Réalisations"
              subtitle="Applications en production pour de vrais clients et explorations personnelles."
            />
          </ScrollReveal>
        </div>

        {/* 3D Stage */}
        <ScrollReveal delay={0.1}>
          <motion.div
            className="relative mx-auto select-none cursor-grab active:cursor-grabbing"
            style={{ height: '620px', maxWidth: '100vw', perspective: '1400px', perspectiveOrigin: '50% 40%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.04}
            onDragStart={() => { isDragging.current = true }}
            onDragEnd={handleDragEnd}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {portfolioData.projects.map((project, i) => {
              const pos = getVariant(i, current, total)
              const v = variants[pos]
              const isCenter = pos === 'center'

              return (
                <motion.div
                  key={project.id}
                  animate={v}
                  transition={spring}
                  className="absolute top-0 left-1/2"
                  style={{
                    width: CARD_W,
                    marginLeft: -(CARD_W / 2),
                    transformStyle: 'preserve-3d',
                    zIndex: isCenter ? 10 : 5,
                    cursor: isCenter ? 'pointer' : 'pointer',
                  }}
                  onClick={() => handleCardClick(project, pos)}
                >
                  <ProjectCard3D
                    project={project}
                    isActive={isCenter}
                    onOpenDetail={() => setSelectedProject(project)}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </ScrollReveal>

        {/* Controls */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-6 mt-6">
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 transition-colors duration-200"
              aria-label="Projet précédent"
            >
              <ChevronLeft size={18} />
            </motion.button>

            <div className="flex items-center gap-2.5" role="tablist" aria-label="Navigation projets">
              {portfolioData.projects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Aller à ${p.name}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === current ? portfolioData.projects[current].accentColor : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(1)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 transition-colors duration-200"
              aria-label="Projet suivant"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Hint keyboard */}
          <p className="text-center text-zinc-700 text-xs font-mono mt-3 tracking-wide">
            ← → pour naviguer · cliquer pour voir le détail
          </p>
        </ScrollReveal>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

// ─── Individual 3D Card ───────────────────────────────────────────────────────

function ProjectCard3D({
  project,
  isActive,
  onOpenDetail,
}: {
  project: Project
  isActive: boolean
  onOpenDetail: () => void
}) {
  const accent = project.accentColor

  return (
    <motion.article
      initial={false}
      animate={{
        boxShadow: isActive
          ? `0 0 60px ${accent}22, 0 40px 80px rgba(0,0,0,0.6)`
          : '0 20px 40px rgba(0,0,0,0.4)',
      }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col group"
      style={{ borderColor: isActive ? `${accent}30` : undefined }}
      aria-label={`${project.name} — ${project.tagline}`}
    >
      {/* Image carousel */}
      <div className="relative">
        <MiniImageCarousel images={project.images} isActive={isActive} accentColor={accent} />

        {/* Overlay "Voir le détail" on center card hover */}
        {isActive && (
          <div
            className="absolute inset-0 rounded-t-2xl flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => { e.stopPropagation(); onOpenDetail() }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium pointer-events-none"
              style={{ backgroundColor: `${accent}20`, borderColor: `${accent}50`, color: accent }}
            >
              <Maximize2 size={14} />
              Voir en détail
            </div>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full border"
            style={{ backgroundColor: `${accent}15`, color: accent, borderColor: `${accent}30` }}
          >
            {project.type}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-200 text-xs font-mono transition-colors duration-200"
            aria-label={`Voir ${project.name}`}
          >
            Voir le site <ExternalLink size={12} />
          </a>
        </div>

        <h3 className="font-display text-xl font-bold text-zinc-50 mb-0.5">{project.name}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: accent }}>{project.tagline}</p>
        <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        <ul className="space-y-1.5 mb-5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2.5 text-xs text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `${accent}90` }} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mt-auto" aria-label="Stack technique">
          {project.stack.slice(0, 6).map((tech) => (
            <span key={tech} className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-500 text-xs font-mono border border-zinc-700/40">
              {tech}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-800/50 text-zinc-700 text-xs font-mono border border-zinc-800">
              +{project.stack.length - 6}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
