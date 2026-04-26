import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LoadingScreen } from './components/LoadingScreen'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { ProjectsCarousel } from './components/ProjectsCarousel'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Film grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main site — fades in after loading */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="site"
            className="min-h-dvh bg-zinc-950 font-sans antialiased"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Cursor />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Experience />
              <Skills />
              <ProjectsCarousel />
              <Education />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
