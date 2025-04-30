"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react"

interface MusicPlayerProps {
  audioUrl: string
  duration: number
  onComplete: () => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

const MusicPlayer = ({ audioUrl, duration, onComplete, isPlaying, setIsPlaying }: MusicPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.7
    }
  }, [isMuted])

  useEffect(() => {
    if (isPlaying) {
      playSnippet()
    } else {
      stopSnippet()
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [isPlaying, duration, audioUrl])

  const playSnippet = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()

      // Set timeout to stop after specified duration
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        stopSnippet()
        onComplete()
      }, duration * 1000)

      // Update progress
      const interval = setInterval(() => {
        if (audioRef.current) {
          const currentProgress = (audioRef.current.currentTime / duration) * 100
          setProgress(Math.min(currentProgress, 100))

          if (audioRef.current.currentTime >= duration) {
            clearInterval(interval)
          }
        }
      }, 100)
    }
  }

  const stopSnippet = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const skipSnippet = () => {
    stopSnippet()
    onComplete()
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-md mx-auto">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button onClick={togglePlay} className="btn-primary rounded-full p-3" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            {duration < 1 ? `${(duration * 1000).toFixed(0)}ms snippet` : `${duration}s snippet`}
          </p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button onClick={skipSnippet} className="p-2 rounded-full text-gray-600 hover:bg-gray-100" aria-label="Skip">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
