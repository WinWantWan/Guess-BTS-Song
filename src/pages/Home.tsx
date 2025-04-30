"use client"

import { useState } from "react"
import { useMusic } from "../context/MusicContext"
import { useGame } from "../context/GameContext"
import { Music, Play, Award, Loader } from "lucide-react"

const Home = () => {
  const { songs, isLoading, error } = useMusic()
  const { startGame } = useGame()
  const [selectedRounds, setSelectedRounds] = useState(10)
  const [selectedDifficulty, setSelectedDifficulty] = useState(0.5)

  const difficulties = [
    { value: 0.1, label: "0.1s" },
    { value: 0.15, label: "0.15s" },
    { value: 0.25, label: "0.25s" },
    { value: 0.5, label: "0.5s" },
    { value: 0.3, label: "0.3s" },
    { value: 1, label: "1s" },
    { value: 60, label: "1 min" },
  ]

  const roundOptions = [5, 10, 15, 20]

  const handleStartGame = () => {
    startGame(selectedRounds, selectedDifficulty)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader className="w-12 h-12 text-purple-600 animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading BTS songs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 inline-block">
          <p>{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-purple-800">BTS Music Quiz</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Test your ARMY knowledge! Can you identify BTS songs from just a short snippet?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card">
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">How to Play</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                1
              </span>
              <span>Listen to a short snippet of a BTS song</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                2
              </span>
              <span>Choose the correct song title from the options</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                3
              </span>
              <span>Earn points for each correct answer</span>
            </li>
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                4
              </span>
              <span>Try to build the longest streak of correct answers</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <Award className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">Game Settings</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Number of Rounds</label>
              <div className="grid grid-cols-4 gap-2">
                {roundOptions.map((rounds) => (
                  <button
                    key={rounds}
                    className={`py-2 rounded-lg text-center transition-colors ${
                      selectedRounds === rounds
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedRounds(rounds)}
                  >
                    {rounds}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Difficulty (Snippet Length)</label>
              <div className="grid grid-cols-3 gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    className={`py-2 px-1 rounded-lg text-sm text-center transition-colors ${
                      selectedDifficulty === diff.value
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedDifficulty(diff.value)}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleStartGame}
          className="btn-primary text-lg px-8 py-3 flex items-center mx-auto hover:bg-purple-600 hover:text-white"
          disabled={isLoading || songs.length === 0}
        >
          <Play className="w-5 h-5 mr-2" />
          Start Game
        </button>

        <p className="mt-4 text-gray-600">{songs.length} BTS songs available to guess</p>
      </div>
    </div>
  )
}

export default Home
