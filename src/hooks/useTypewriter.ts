import { useState, useEffect } from 'react'

export function useTypewriter(
  words: string[],
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseTime = 2400,
) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPausing, setIsPausing] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]

    if (isPausing) {
      const id = setTimeout(() => {
        setIsPausing(false)
        setIsDeleting(true)
      }, pauseTime)
      return () => clearTimeout(id)
    }

    const id = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, text.length + 1)
          setText(next)
          if (next === currentWord) setIsPausing(true)
        } else {
          const next = currentWord.slice(0, text.length - 1)
          setText(next)
          if (next === '') {
            setIsDeleting(false)
            setWordIndex((i) => (i + 1) % words.length)
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed,
    )

    return () => clearTimeout(id)
  }, [text, isDeleting, isPausing, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return text
}
