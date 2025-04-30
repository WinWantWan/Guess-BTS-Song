import { Heart, Github, Music } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900/90 to-pink-800/90 text-white shadow-inner py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="bg-white/10 p-2 rounded-full mr-3">
                <Music className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">BTS Music Quiz</span>
            </div>
            <p className="text-purple-200 mt-2 text-center md:text-left">
              © {new Date().getFullYear()} BTS Music Quiz. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center space-x-4 mb-3">
              <a
                href="https://github.com/yourusername/bts-music-quiz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
              >
                <Github className="w-5 h-5" />
              </a>
              <span className="flex items-center text-purple-200">
                Made with <Heart className="w-4 h-4 text-pink-400 mx-1 animate-pulse" /> for ARMY
              </span>
            </div>
            <p className="text-purple-300 text-sm">Designed with 💜 for BTS fans worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
