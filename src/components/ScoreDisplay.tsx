import { Award, TrendingUp } from "lucide-react"

interface ScoreDisplayProps {
  currentScore: number
  totalQuestions: number
  currentStreak: number
  bestStreak: number
}

const ScoreDisplay = ({ currentScore, totalQuestions, currentStreak, bestStreak }: ScoreDisplayProps) => {
  const scorePercentage = totalQuestions > 0 ? Math.round((currentScore / totalQuestions) * 100) : 0

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-purple-700 mb-3">Your Score</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-800">{currentScore}</div>
          <div className="text-sm text-gray-600">of {totalQuestions}</div>
          <div className="mt-1 text-sm font-medium text-purple-600">{scorePercentage}% correct</div>
        </div>

        <div className="flex flex-col justify-center border-l border-gray-200 pl-4">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-pink-500 mr-2" />
            <span className="text-sm text-gray-600">Current Streak:</span>
            <span className="ml-auto font-semibold">{currentStreak}</span>
          </div>

          <div className="flex items-center">
            <Award className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600">Best Streak:</span>
            <span className="ml-auto font-semibold">{bestStreak}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreDisplay
