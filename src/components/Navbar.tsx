import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#about', label: 'À propos' },
  { href: '#experience', label: 'Expériences' },
  { href: '#skills', label: 'Compétences' },
  { href: '#projects', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const el = progressRef.current
      if (!el) return
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0
      el.style.transform = `scaleX(${progress})`
      el.style.opacity = progress < 0.02 ? '0' : '1'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section detection
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-zinc-950/75 backdrop-blur-2xl shadow-xl shadow-zinc-950/20'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      {/* Separator — always in DOM, opacity transition only (évite le flash du border-b) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-zinc-800/60 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: scrolled ? 1 : 0 }}
      />

      {/* Progress bar — par-dessus le separator */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-px origin-left opacity-0 pointer-events-none"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(to right, #6366f1, #8b5cf6, #06b6d4)',
          willChange: 'transform, opacity',
        }}
      />

      <nav
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          aria-label="Dorian Obert — Home"
        >
          DO.
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium ${
                    isActive ? 'text-zinc-50' : 'text-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-zinc-800"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href="mailto:dorian.obert@icloud.com"
            className="px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-px"
          >
            Me contacter →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-zinc-950/90 backdrop-blur-2xl border-b border-zinc-800/60"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-4 py-3 text-sm text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50 rounded-xl transition-all font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:dorian.obert@icloud.com"
                  className="block px-4 py-3 rounded-xl bg-indigo-500 text-white text-sm font-semibold text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Me contacter →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
