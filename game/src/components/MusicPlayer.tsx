"use client"

import type React from "react"

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
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const progressIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [isMuted, volume])

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
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current)
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
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current)
      }

      progressIntervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          const currentProgress = (audioRef.current.currentTime / duration) * 100
          setProgress(Math.min(currentProgress, 100))

          if (audioRef.current.currentTime >= duration) {
            if (progressIntervalRef.current) {
              window.clearInterval(progressIntervalRef.current)
            }
          }
        }
      }, 50)
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

    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current)
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto border border-purple-100">
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 left-0 h-full w-full"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 10px,
              rgba(255, 255, 255, 0.3) 10px,
              rgba(255, 255, 255, 0.3) 20px
            )`,
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={togglePlay}
          className={`rounded-full p-4 transition-all duration-300 ${
            isPlaying
              ? "bg-pink-500 text-white shadow-md hover:bg-pink-600"
              : "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md hover:shadow-lg"
          }`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <div className="text-center">
          <div className="inline-block px-4 py-1 bg-purple-100 rounded-full text-purple-800 font-medium">
            {duration < 1 ? `${(duration * 1000).toFixed(0)}ms snippet` : `${duration}s snippet`}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative group">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 group-hover:bg-purple-100"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <div className="hidden group-hover:block absolute bottom-full right-0 mb-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-purple-600"
              />
            </div>
          </div>

          <button
            onClick={skipSnippet}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-purple-700"
            aria-label="Skip"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer
