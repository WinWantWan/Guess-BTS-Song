"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import type { Song } from "../types/music"
import { fetchBTSSongs } from "../services/musicApi"

interface MusicContextType {
  songs: Song[]
  isLoading: boolean
  error: string | null
  refreshSongs: () => Promise<void>
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSongs = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const btsSongs = await fetchBTSSongs()
      setSongs(btsSongs)
    } catch (err) {
      setError("Failed to load BTS songs. Please try again later.")
      console.error("Error loading songs:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSongs()
  }, [])

  const refreshSongs = async () => {
    await loadSongs()
  }

  return <MusicContext.Provider value={{ songs, isLoading, error, refreshSongs }}>{children}</MusicContext.Provider>
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
