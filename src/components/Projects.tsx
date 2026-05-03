import { ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionTitle } from './ui/SectionTitle'
import { portfolioData } from '../data/portfolio'

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-36 bg-white" aria-labelledby="projects-title">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionTitle
            label="Projects"
            title="Selected Work"
            subtitle="Production applications built for real clients and personal exploration."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group relative flex flex-col h-full p-6 md:p-7 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(255,255,255,1) 100%)',
                  border: '1px solid rgba(99,102,241,0.18)',
                  boxShadow: '0 2px 20px rgba(99,102,241,0.07)',
                }}
              >
                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col h-full">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                        project.type === 'Projet Client'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}
                    >
                      {project.type}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors duration-200 text-xs font-mono shrink-0 mt-1"
                      aria-label={`Visit ${project.name}`}
                    >
                      <span className="hidden group-hover:inline">Visit</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  {/* Project name + tagline */}
                  <h3 className="font-display text-xl font-bold text-zinc-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-indigo-600 text-sm font-medium mb-4">{project.tagline}</p>

                  {/* Description */}
                  <p className="text-zinc-600 text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-6" aria-label="Key features">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-xs text-zinc-600">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-indigo-500/70 shrink-0"
                          aria-hidden="true"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mt-auto" aria-label="Tech stack">
                    {project.stack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-zinc-600 text-xs font-mono"
                        style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 6 && (
                      <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-500 text-xs font-mono border border-zinc-200">
                        +{project.stack.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
