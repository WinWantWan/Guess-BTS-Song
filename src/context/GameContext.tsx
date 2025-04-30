"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import type { Song } from "../types/music"
import { useNavigate } from "react-router-dom"

interface GameState {
  currentRound: number
  totalRounds: number
  score: number
  currentStreak: number
  bestStreak: number
  difficulty: number
  gameHistory: {
    song: Song
    userGuess: string | null
    isCorrect: boolean
    difficulty: number
  }[]
}

interface GameContextType {
  gameState: GameState
  isGameActive: boolean
  startGame: (totalRounds: number, difficulty: number) => void
  endGame: () => void
  submitGuess: (song: Song, userGuess: string) => void
  nextRound: () => void
  resetGame: () => void
  setDifficulty: (difficulty: number) => void
}

const initialGameState: GameState = {
  currentRound: 0,
  totalRounds: 10,
  score: 0,
  currentStreak: 0,
  bestStreak: 0,
  difficulty: 0.5, // Default to 0.5s
  gameHistory: [],
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)
  const [isGameActive, setIsGameActive] = useState(false)
  const navigate = useNavigate()

  const startGame = (totalRounds: number, difficulty: number) => {
    setGameState({
      ...initialGameState,
      totalRounds,
      difficulty,
    })
    setIsGameActive(true)
    navigate("/game")
  }

  const endGame = () => {
    setIsGameActive(false)
    navigate("/results")
  }

  const submitGuess = (song: Song, userGuess: string) => {
    const isCorrect = song.title === userGuess

    setGameState((prev) => {
      const newScore = isCorrect ? prev.score + 1 : prev.score
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0
      const newBestStreak = Math.max(prev.bestStreak, newStreak)

      return {
        ...prev,
        score: newScore,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        gameHistory: [
          ...prev.gameHistory,
          {
            song,
            userGuess,
            isCorrect,
            difficulty: prev.difficulty,
          },
        ],
      }
    })
  }

  const nextRound = () => {
    setGameState((prev) => {
      const newRound = prev.currentRound + 1

      if (newRound >= prev.totalRounds) {
        // End game if we've reached the total rounds
        setTimeout(() => endGame(), 1000)
      }

      return {
        ...prev,
        currentRound: newRound,
      }
    })
  }

  const resetGame = () => {
    setGameState(initialGameState)
    setIsGameActive(false)
    navigate("/")
  }

  const setDifficulty = (difficulty: number) => {
    setGameState((prev) => ({
      ...prev,
      difficulty,
    }))
  }

  return (
    <GameContext.Provider
      value={{
        gameState,
        isGameActive,
        startGame,
        endGame,
        submitGuess,
        nextRound,
        resetGame,
        setDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
