import { useState, useEffect, useRef } from 'react'

export function useCountUp(target: string, duration = 1600) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const done = useRef(false)

  // Parse "4+" → { num: 4, suffix: "+" }
  const match = target.match(/^([\d.]+)(.*)$/)
  const numTarget = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''

  useEffect(() => {
    const el = ref.current
    if (!el || done.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        observer.disconnect()

        const startTime = performance.now()

        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1)
          // Ease out expo
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          const cur = Math.round(eased * numTarget)
          setDisplay(t < 1 ? `${cur}${suffix}` : target)
          if (t < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, numTarget, suffix, duration])

  return { display, ref }
}
