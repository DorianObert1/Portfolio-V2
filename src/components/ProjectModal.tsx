import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import type { Project, ProjectImage } from '../data/portfolio'

// ─── Tech colors ──────────────────────────────────────────────────────────────

const TECH_CAT: Record<string, string> = {
  'React 19': 'frontend', 'React 18': 'frontend', 'React': 'frontend',
  'Angular': 'frontend', 'TypeScript': 'frontend', 'JavaScript': 'frontend',
  'Tailwind': 'frontend', 'Tailwind CSS': 'frontend', 'Framer Motion': 'frontend',
  'Vite': 'frontend', 'Zustand': 'frontend', 'HTML/CSS': 'frontend',
  'Node.js': 'backend', 'Express.js': 'backend', 'Fastify': 'backend',
  'FastAPI': 'backend', 'Nodemailer': 'backend', 'JWT': 'backend',
  'PostgreSQL': 'data', 'MySQL': 'data', 'MongoDB': 'data', 'Prisma': 'data', 'Prisma ORM': 'data',
  'Docker': 'devops', 'GitLab CI/CD': 'devops', 'GitHub Actions': 'devops',
  'Nginx': 'devops', 'Caddy': 'devops', 'Tailscale': 'devops',
}
const CAT_COLORS: Record<string, string> = {
  frontend: '#818cf8', backend: '#34d399', data: '#f59e0b', devops: '#60a5fa', autres: '#a1a1aa',
}

// ─── Image gallery (left panel) ───────────────────────────────────────────────

function ImageGallery({ images, accent }: { images: ProjectImage[]; accent: string }) {
  const [idx, setIdx] = useState(0)

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const img = images[idx]

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — natural height, no dead space */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${img.gradientFrom} 0%, ${img.gradientVia} 50%, ${img.gradientTo} 100%)` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {img.src && (
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-auto block"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Label + counter */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <span
            className="font-mono text-xs px-3 py-1 rounded-full border backdrop-blur-sm"
            style={{ backgroundColor: `${accent}25`, color: accent, borderColor: `${accent}50` }}
          >
            {img.label}
          </span>
          {images.length > 1 && (
            <span className="font-mono text-xs text-white/40">{idx + 1} / {images.length}</span>
          )}
        </div>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all duration-150 backdrop-blur-sm"
              aria-label="Image précédente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all duration-150 backdrop-blur-sm"
              aria-label="Image suivante"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="relative flex-1 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                aspectRatio: '16/9',
                background: `linear-gradient(135deg, ${image.gradientFrom} 0%, ${image.gradientVia} 50%, ${image.gradientTo} 100%)`,
                outline: i === idx ? `2px solid ${accent}` : '2px solid transparent',
                outlineOffset: '2px',
                opacity: i === idx ? 1 : 0.45,
              }}
              aria-label={image.label}
            >
              {image.src && (
                <img src={image.src} alt={image.label} className="w-full h-full object-cover object-top" />
              )}
              {i === idx && (
                <div className="absolute inset-0 rounded-lg" style={{ boxShadow: `inset 0 0 0 2px ${accent}` }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 inset-4 md:inset-[3vh_3vw] flex flex-col rounded-2xl overflow-hidden border bg-zinc-950"
            style={{
              borderColor: `${project.accentColor}30`,
              boxShadow: `0 0 80px ${project.accentColor}18, 0 40px 120px rgba(0,0,0,0.8)`,
              maxWidth: 1280,
              maxHeight: '94vh',
              margin: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-6 py-3.5 border-b shrink-0"
              style={{ borderColor: `${project.accentColor}18`, background: 'rgba(0,0,0,0.3)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full border"
                  style={{ backgroundColor: `${project.accentColor}18`, color: project.accentColor, borderColor: `${project.accentColor}35` }}
                >
                  {project.type}
                </span>
                <h2 className="font-display text-lg font-bold text-zinc-50 tracking-tight">{project.name}</h2>
                <span className="text-sm text-zinc-600 hidden sm:block">— {project.tagline}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 transition-colors duration-200"
                >
                  Voir le site <ExternalLink size={11} />
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-colors duration-200"
                  aria-label="Fermer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">

              {/* Left — image gallery : hauteur fixe sur mobile pour rester visible */}
              <div className="h-[42vh] shrink-0 md:h-auto md:flex-1 md:min-w-0 p-4 md:p-5 overflow-y-auto">
                <ImageGallery images={project.images} accent={project.accentColor} />
              </div>

              {/* Right — project details */}
              <div
                className="flex-1 md:flex-none md:w-80 lg:w-96 flex flex-col overflow-y-auto border-t md:border-t-0 md:border-l"
                style={{ borderColor: `${project.accentColor}12` }}
              >
                <div className="p-6 flex flex-col gap-6">

                  {/* Description */}
                  <div>
                    <p className="text-sm font-semibold mb-2" style={{ color: project.accentColor }}>
                      {project.tagline}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Points clés</p>
                    <ul className="space-y-2.5">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-[5px]"
                            style={{ backgroundColor: `${project.accentColor}90` }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack */}
                  <div>
                    <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest mb-3">Stack technique</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => {
                        const cat = TECH_CAT[tech] ?? 'autres'
                        const color = CAT_COLORS[cat]
                        return (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md text-xs font-mono border"
                            style={{ backgroundColor: `${color}12`, color, borderColor: `${color}28` }}
                          >
                            {tech}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                </div>

                {/* Footer CTA */}
                <div className="mt-auto p-6 pt-0">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 hover:brightness-110"
                    style={{
                      backgroundColor: `${project.accentColor}18`,
                      borderColor: `${project.accentColor}40`,
                      color: project.accentColor,
                    }}
                  >
                    Visiter {project.name} <ExternalLink size={13} />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
