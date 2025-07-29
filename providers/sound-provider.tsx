"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"

interface SoundContextType {
  isMuted: boolean
  toggleMute: () => void
  playClickSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const playClickSound = useCallback(() => {
    if (!isMuted && typeof window !== "undefined") {
      // Create a simple click sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }, [isMuted])

  return <SoundContext.Provider value={{ isMuted, toggleMute, playClickSound }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
