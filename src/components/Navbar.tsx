"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Music, Play, Home, Info, Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navLinks = [
    { path: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/game", label: "Play Game", icon: <Play className="w-5 h-5" /> },
    { path: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Music className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-purple-800">BTS Music Quiz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 hover:text-purple-700 focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
