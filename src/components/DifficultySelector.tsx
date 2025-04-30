"use client"

interface DifficultySelectorProps {
  difficulties: { value: number; label: string }[]
  selectedDifficulty: number
  onChange: (difficulty: number) => void
}

const DifficultySelector = ({ difficulties, selectedDifficulty, onChange }: DifficultySelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Select Difficulty</h3>
      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty.value}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              selectedDifficulty === difficulty.value
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onChange(difficulty.value)}
          >
            {difficulty.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector
