"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../context/GameContext"
import { Award, RotateCcw, Share2 } from "lucide-react"

const Results = () => {
  const { gameState, resetGame } = useGame()
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
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Results</h1>
        <p className="text-gray-600">{getScoreMessage()}</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Award className="w-12 h-12 text-yellow-500 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-purple-800">
                {gameState.score}/{gameState.totalRounds}
              </h2>
              <p className="text-gray-600">Correct answers</p>
            </div>
          </div>

          <div className="bg-purple-100 rounded-full h-24 w-24 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-800">{scorePercentage}%</div>
              <div className="text-sm text-purple-600">Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-pink-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">{gameState.bestStreak}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {gameState.difficulty < 1 ? `${(gameState.difficulty * 1000).toFixed(0)}ms` : `${gameState.difficulty}s`}
            </div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">Game History</h3>

        <div className="space-y-3">
          {gameState.gameHistory.map((round, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                round.isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {index + 1}. {round.song.title}
                  </p>
                  {!round.isCorrect && <p className="text-sm text-red-600">Your guess: {round.userGuess}</p>}
                </div>
                <div className={`text-sm font-medium ${round.isCorrect ? "text-green-600" : "text-red-600"}`}>
                  {round.isCorrect ? "Correct" : "Incorrect"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={handlePlayAgain} className="btn-primary flex items-center justify-center">
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </button>

        <button onClick={handleShare} className="btn-outline flex items-center justify-center">
          <Share2 className="w-5 h-5 mr-2" />
          Share Results
        </button>
      </div>
    </div>
  )
}

export default Results
