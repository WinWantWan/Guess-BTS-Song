"use client"

import { Music } from "lucide-react"

interface SongOptionProps {
  title: string
  isSelected: boolean
  isCorrect?: boolean | null
  isRevealed: boolean
  onSelect: () => void
  disabled: boolean
}

const SongOption = ({ title, isSelected, isCorrect, isRevealed, onSelect, disabled }: SongOptionProps) => {
  let bgColor = "bg-white"
  let borderColor = "border-gray-200"
  let textColor = "text-gray-800"

  if (isSelected) {
    borderColor = "border-purple-500"
    bgColor = "bg-purple-50"
  }

  if (isRevealed) {
    if (isCorrect === true) {
      bgColor = "bg-green-50"
      borderColor = "border-green-500"
      textColor = "text-green-800"
    } else if (isCorrect === false && isSelected) {
      bgColor = "bg-red-50"
      borderColor = "border-red-500"
      textColor = "text-red-800"
    }
  }

  return (
    <button
      className={`flex items-center p-4 rounded-lg border-2 ${borderColor} ${bgColor} ${textColor} w-full transition-all duration-200 ${
        disabled ? "cursor-not-allowed opacity-80" : "hover:border-purple-400 hover:bg-purple-50"
      }`}
      onClick={onSelect}
      disabled={disabled}
    >
      <Music className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="font-medium">{title}</span>
    </button>
  )
}

export default SongOption
