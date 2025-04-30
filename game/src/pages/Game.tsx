"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMusic } from "../context/MusicContext"
import { useGame } from "../context/GameContext"
import MusicPlayer from "../components/MusicPlayer"
import SongOption from "../components/SongOption"
import ScoreDisplay from "../components/ScoreDisplay"
import DifficultySelector from "../components/DifficultySelector"
import { Loader, Headphones } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { getRandomUnusedSong } from "../services/musicApi"

const Game = () => {
  const { songs, isLoading } = useMusic()
  const { gameState, isGameActive, submitGuess, nextRound, setDifficulty } = useGame()
  const [currentSong, setCurrentSong] = useState<any>(null)
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const navigate = useNavigate()

  const difficulties = [
    { value: 0.1, label: "0.1s" },
    { value: 0.15, label: "0.15s" },
    { value: 0.25, label: "0.25s" },
    { value: 0.3, label: "0.3s" },
    { value: 0.5, label: "0.5s" },
    { value: 1, label: "1s" },
    { value: 60, label: "1 min" },
  ]

  useEffect(() => {
    if (!isGameActive) {
      navigate("/")
      return
    }

    if (songs.length > 0 && gameState.currentRound < gameState.totalRounds) {
      prepareRound()
    }
  }, [songs, gameState.currentRound, isGameActive])

  const prepareRound = () => {
    // Reset state for new round
    setSelectedOption(null)
    setIsRevealed(false)
    setIsPlaying(false)

    // Get a random song that hasn't been used in this session
    const selected = getRandomUnusedSong(songs)

    if (!selected) {
      console.error("No songs available")
      return
    }

    setCurrentSong(selected)

    // Create a copy of songs without the current song
    const availableSongs = songs.filter((song) => song.id !== selected.id)

    // Determine how many wrong options we can show
    const maxWrongOptions = Math.min(3, availableSongs.length)

    // Get random wrong options
    const wrongOptions: string[] = []
    const usedIndices = new Set<number>()

    while (wrongOptions.length < maxWrongOptions) {
      const randomIndex = Math.floor(Math.random() * availableSongs.length)

      // Ensure we don't use the same wrong option twice
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex)
        wrongOptions.push(availableSongs[randomIndex].title)
      }
    }

    // Combine correct and wrong options and shuffle
    const allOptions = [selected.title, ...wrongOptions]
    shuffleArray(allOptions)
    setOptions(allOptions)
  }

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  const handleOptionSelect = (option: string) => {
    if (isRevealed) return

    setSelectedOption(option)
    setIsRevealed(true)
    setIsPlaying(false)

    submitGuess(currentSong, option)

    // Wait a moment before moving to next round
    setTimeout(() => {
      nextRound()
    }, 2000)
  }

  const handlePlayComplete = () => {
    setIsPlaying(false)
  }

  const handleDifficultyChange = (difficulty: number) => {
    setDifficulty(difficulty)
  }

  if (isLoading || !currentSong) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <Loader className="w-16 h-16 text-purple-600 animate-spin relative" />
        </div>
        <p className="text-lg text-gray-600 mt-6">Loading game...</p>
      </div>
    )
  }

  if (gameState.currentRound >= gameState.totalRounds) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <Loader className="w-16 h-16 text-purple-600 animate-spin relative" />
        </div>
        <p className="text-lg text-gray-600 mt-6">Finishing game...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pt-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Guess the Song
        </h1>
        <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-purple-800 font-medium">
          Round {gameState.currentRound + 1} of {gameState.totalRounds}
        </div>
      </motion.div>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <MusicPlayer
            audioUrl={currentSong.audio_url}
            duration={gameState.difficulty}
            onComplete={handlePlayComplete}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <DifficultySelector
            difficulties={difficulties}
            selectedDifficulty={gameState.difficulty}
            onChange={handleDifficultyChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          <div className="flex items-center mb-3">
            <Headphones className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-purple-800">Choose the correct song:</h3>
          </div>

          <AnimatePresence>
            {options.map((option, index) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <SongOption
                  title={option}
                  isSelected={selectedOption === option}
                  isCorrect={isRevealed ? option === currentSong.title : null}
                  isRevealed={isRevealed}
                  onSelect={() => handleOptionSelect(option)}
                  disabled={isRevealed}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <ScoreDisplay
            currentScore={gameState.score}
            totalQuestions={gameState.currentRound}
            currentStreak={gameState.currentStreak}
            bestStreak={gameState.bestStreak}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Game
