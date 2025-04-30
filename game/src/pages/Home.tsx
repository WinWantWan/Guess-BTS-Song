"use client"

import { useState } from "react"
import { useMusic } from "../context/MusicContext"
import { useGame } from "../context/GameContext"
import { Music, Play, Award, Loader, Clock, Hash } from "lucide-react"
import { motion } from "framer-motion"

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
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <Loader className="w-16 h-16 text-purple-600 animate-spin relative" />
        </div>
        <p className="text-lg text-gray-600 mt-6">Loading BTS songs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl mb-6 inline-block max-w-md mx-auto shadow-md border border-red-100">
          <p className="font-medium">{error}</p>
        </div>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pt-24">
      <div className="text-center mb-16">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-700 via-pink-600 to-purple-700 bg-clip-text text-transparent">
            BTS Music Quiz
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your ARMY knowledge! Can you identify BTS songs from just a short snippet?
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              How to Play
            </h2>
          </div>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                1
              </span>
              <span className="pt-1">Listen to a short snippet of a BTS song</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                2
              </span>
              <span className="pt-1">Choose the correct song title from the options</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                3
              </span>
              <span className="pt-1">Earn points for each correct answer</span>
            </li>
            <li className="flex items-start">
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                4
              </span>
              <span className="pt-1">Try to build the longest streak of correct answers</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Game Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <Hash className="w-5 h-5 text-purple-600 mr-2" />
                <label className="block text-gray-700 font-medium">Number of Rounds</label>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {roundOptions.map((rounds) => (
                  <button
                    key={rounds}
                    className={`py-3 rounded-xl text-center transition-all duration-200 ${
                      selectedRounds === rounds
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md font-medium"
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }`}
                    onClick={() => setSelectedRounds(rounds)}
                  >
                    {rounds}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <label className="block text-gray-700 font-medium">Difficulty (Snippet Length)</label>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    className={`py-2 px-1 rounded-xl text-sm text-center transition-all duration-200 ${
                      selectedDifficulty === diff.value
                        ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md font-medium"
                        : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                    }`}
                    onClick={() => setSelectedDifficulty(diff.value)}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={handleStartGame}
          className="btn-primary text-lg px-8 py-4 flex items-center mx-auto rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
          disabled={isLoading || songs.length === 0}
        >
          <Play className="w-6 h-6 mr-2" />
          Start Game
        </button>

        <p className="mt-4 text-gray-600">
          {songs.length} BTS songs available to guess
          {songs.length >= 25 && (
            <span className="ml-1 text-purple-600 font-medium">- Perfect for a challenging game!</span>
          )}
        </p>
      </motion.div>
    </div>
  )
}

export default Home
