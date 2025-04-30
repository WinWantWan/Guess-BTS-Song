"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface DifficultySelectorProps {
  difficulties: { value: number; label: string }[]
  selectedDifficulty: number
  onChange: (difficulty: number) => void
}

const DifficultySelector = ({ difficulties, selectedDifficulty, onChange }: DifficultySelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-md">
      <div className="flex items-center mb-3">
        <Clock className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-medium text-purple-800">Snippet Length</h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedDifficulty === difficulty.value
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100"
            }`}
            onClick={() => onChange(difficulty.value)}
          >
            {difficulty.label}
          </motion.button>
        ))}
      </div>

      <div className="mt-3 text-center text-sm text-purple-600">
        {selectedDifficulty <= 0.1 && "Expert mode! Can you recognize a song in just a split second?"}
        {selectedDifficulty > 0.1 && selectedDifficulty <= 0.25 && "Very challenging! Only true ARMY can master this!"}
        {selectedDifficulty > 0.25 && selectedDifficulty <= 0.5 && "A good challenge for BTS fans!"}
        {selectedDifficulty > 0.5 && selectedDifficulty < 60 && "Standard difficulty, perfect for most players."}
        {selectedDifficulty >= 60 && "Easy mode - take your time to recognize the song!"}
      </div>
    </div>
  )
}

export default DifficultySelector
