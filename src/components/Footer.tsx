import { ArrowUp } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 border-t border-zinc-200 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-zinc-500 text-sm">
            © 2025 <span className="text-zinc-800 font-medium">Dorian Obert</span>
          </span>
          <span className="text-zinc-300 text-xs" aria-hidden="true">·</span>
          <span className="font-mono text-zinc-400 text-xs">React + Framer Motion</span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-800 transition-colors duration-200 text-xs font-mono group"
          aria-label="Retour en haut"
        >
          <span>Retour en haut</span>
          <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
