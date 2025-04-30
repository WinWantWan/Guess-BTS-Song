"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../context/GameContext"
import { RotateCcw, Share2, Trophy, Check, X, Music } from "lucide-react"
import { motion } from "framer-motion"

const Results = () => {
  const { gameState, isGameActive, resetGame } = useGame()
  const navigate = useNavigate()

  useEffect(() => {
    if (gameState.gameHistory.length === 0) {
      navigate("/")
    }
  }, [gameState.gameHistory.length])

  const scorePercentage = Math.round((gameState.score / gameState.totalRounds) * 100)

  const getScoreMessage = () => {
    if (scorePercentage >= 90) return "Amazing! You're a true ARMY!"
    if (scorePercentage >= 70) return "Great job! Your BTS knowledge is impressive!"
    if (scorePercentage >= 50) return "Not bad! You know your BTS songs!"
    if (scorePercentage >= 30) return "Keep practicing! You're getting there!"
    return "Don't worry! Even ARMYs start somewhere!"
  }

  const getScoreEmoji = () => {
    if (scorePercentage >= 90) return "🏆"
    if (scorePercentage >= 70) return "🎉"
    if (scorePercentage >= 50) return "👍"
    if (scorePercentage >= 30) return "😊"
    return "💜"
  }

  const handlePlayAgain = () => {
    resetGame()
  }

  const handleShare = () => {
    const text = `I scored ${gameState.score}/${gameState.totalRounds} (${scorePercentage}%) on the BTS Music Quiz! Can you beat my score?`

    if (navigator.share) {
      navigator.share({
        title: "BTS Music Quiz Results",
        text: text,
        url: window.location.origin,
      })
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Result copied to clipboard!")
        })
        .catch((err) => {
          console.error("Failed to copy: ", err)
        })
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Your Results {getScoreEmoji()}
        </h1>
        <p className="text-lg text-purple-700 font-medium">{getScoreMessage()}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-purple-100"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-yellow-100 p-3 rounded-xl mr-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                {gameState.score}/{gameState.totalRounds}
              </h2>
              <p className="text-gray-600">Correct answers</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-purple-600 rounded-full blur-md opacity-20"></div>
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-500 rounded-full h-28 w-28 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{scorePercentage}%</div>
                <div className="text-sm text-white/90">Score</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-pink-600">{gameState.bestStreak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">
              {gameState.difficulty < 1 ? `${(gameState.difficulty * 1000).toFixed(0)}ms` : `${gameState.difficulty}s`}
            </div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-8 border border-purple-100"
      >
        <div className="flex items-center mb-4">
          <Music className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-xl font-semibold text-purple-800">Game History</h3>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {gameState.gameHistory.map((round, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-4 rounded-xl border ${
                round.isCorrect
                  ? "border-green-200 bg-gradient-to-r from-green-50 to-green-100"
                  : "border-red-200 bg-gradient-to-r from-red-50 to-red-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      round.isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {round.isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium">
                      {index + 1}. {round.song.title}
                    </p>
                    {!round.isCorrect && <p className="text-sm text-red-600">Your guess: {round.userGuess}</p>}
                  </div>
                </div>
                <div
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    round.isCorrect ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {round.isCorrect ? "Correct" : "Incorrect"}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={handlePlayAgain}
          className="btn-primary flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </button>

        <button onClick={handleShare} className="btn-outline flex items-center justify-center">
          <Share2 className="w-5 h-5 mr-2" />
          Share Results
        </button>
      </motion.div>
    </div>
  )
}

export default Results
