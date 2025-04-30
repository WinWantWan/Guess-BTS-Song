import { Award, TrendingUp, Target } from "lucide-react"

interface ScoreDisplayProps {
  currentScore: number
  totalQuestions: number
  currentStreak: number
  bestStreak: number
}

const ScoreDisplay = ({ currentScore, totalQuestions, currentStreak, bestStreak }: ScoreDisplayProps) => {
  const scorePercentage = totalQuestions > 0 ? Math.round((currentScore / totalQuestions) * 100) : 0

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border border-purple-100">
      <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
        <Target className="w-5 h-5 mr-2 text-purple-600" />
        Your Score
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 flex items-center justify-between">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              {currentScore}
            </div>
            <div className="text-sm text-gray-600">of {totalQuestions}</div>
          </div>

          <div className="h-16 w-16 relative">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeDasharray={`${scorePercentage}, 100`}
                className="animate-dash"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-purple-800">
              {scorePercentage}%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 text-pink-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Current Streak:</span>
            <span className="ml-auto font-bold text-lg text-pink-600">{currentStreak}</span>
          </div>

          <div className="flex items-center">
            <Award className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Best Streak:</span>
            <span className="ml-auto font-bold text-lg text-yellow-600">{bestStreak}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
