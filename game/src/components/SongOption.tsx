"use client"

import { Music, Check, X } from "lucide-react"
import { motion } from "framer-motion"

interface SongOptionProps {
  title: string
  isSelected: boolean
  isCorrect?: boolean | null
  isRevealed: boolean
  onSelect: () => void
  disabled: boolean
}

const SongOption = ({ title, isSelected, isCorrect, isRevealed, onSelect, disabled }: SongOptionProps) => {
  let bgColor = "bg-white/80"
  let borderColor = "border-purple-100"
  let textColor = "text-gray-800"
  let icon = <Music className="w-5 h-5 text-purple-500" />

  if (isSelected) {
    borderColor = "border-purple-500"
    bgColor = "bg-purple-50"
  }

  if (isRevealed) {
    if (isCorrect === true) {
      bgColor = "bg-green-50"
      borderColor = "border-green-500"
      textColor = "text-green-800"
      icon = <Check className="w-5 h-5 text-green-500" />
    } else if (isCorrect === false && isSelected) {
      bgColor = "bg-red-50"
      borderColor = "border-red-500"
      textColor = "text-red-800"
      icon = <X className="w-5 h-5 text-red-500" />
    }
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`flex items-center p-4 rounded-xl border-2 ${borderColor} ${bgColor} ${textColor} w-full transition-all duration-200 backdrop-blur-sm ${
        disabled ? "cursor-not-allowed opacity-80" : "hover:border-purple-400 hover:bg-purple-50 hover:shadow-md"
      }`}
      onClick={onSelect}
      disabled={disabled}
    >
      <div className="mr-3 flex-shrink-0">{icon}</div>
      <span className="font-medium">{title}</span>

      {isRevealed && isCorrect === true && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full"
        >
          CORRECT
        </motion.div>
      )}

      {isRevealed && isCorrect === false && isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full"
        >
          WRONG
        </motion.div>
      )}
    </motion.button>
  )
}

export default SongOption
