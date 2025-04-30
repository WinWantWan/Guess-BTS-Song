import { Heart, Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} BTS Music Quiz. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-gray-600">
              Made with <Heart className="w-4 h-4 text-pink-500 mx-1" /> for ARMY
            </span>

            <a
              href="https://github.com/yourusername/bts-music-quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-700 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
