"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMusic } from "../context/MusicContext"
import { useGame } from "../context/GameContext"
import MusicPlayer from "../components/MusicPlayer"
import SongOption from "../components/SongOption"
import ScoreDisplay from "../components/ScoreDisplay"
import DifficultySelector from "../components/DifficultySelector"
import { Loader } from "lucide-react"

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

    // Get a random song for this round
    const availableSongs = [...songs]
    const randomIndex = Math.floor(Math.random() * availableSongs.length)
    const selected = availableSongs[randomIndex]
    setCurrentSong(selected)

    // Remove the selected song from options
    availableSongs.splice(randomIndex, 1)

    // Get 3 random wrong options
    const wrongOptions: string[] = []
    for (let i = 0; i < 3; i++) {
      if (availableSongs.length > 0) {
        const wrongIndex = Math.floor(Math.random() * availableSongs.length)
        wrongOptions.push(availableSongs[wrongIndex].title)
        availableSongs.splice(wrongIndex, 1)
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
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading game...</p>
      </div>
    )
  }

  if (gameState.currentRound >= gameState.totalRounds) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Finishing game...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Guess the Song</h1>
        <p className="text-gray-600">
          Round {gameState.currentRound + 1} of {gameState.totalRounds}
        </p>
      </div>

      <div className="grid gap-8">
        <div className="mb-4">
          <MusicPlayer
            audioUrl={currentSong.audio_url}
            duration={gameState.difficulty}
            onComplete={handlePlayComplete}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>

        <div className="mb-6">
          <DifficultySelector
            difficulties={difficulties}
            selectedDifficulty={gameState.difficulty}
            onChange={handleDifficultyChange}
          />
        </div>

        <div className="space-y-3 mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Choose the correct song:</h3>
          {options.map((option) => (
            <SongOption
              key={option}
              title={option}
              isSelected={selectedOption === option}
              isCorrect={isRevealed ? option === currentSong.title : null}
              isRevealed={isRevealed}
              onSelect={() => handleOptionSelect(option)}
              disabled={isRevealed}
            />
          ))}
        </div>

        <ScoreDisplay
          currentScore={gameState.score}
          totalQuestions={gameState.currentRound}
          currentStreak={gameState.currentStreak}
          bestStreak={gameState.bestStreak}
        />
      </div>
    </div>
  )
}

export default Game
