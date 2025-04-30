import { Music, Heart, Github, Twitter } from "lucide-react"

const About = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">About BTS Music Quiz</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A fun game created for ARMY to test their knowledge of BTS songs
        </p>
      </div>

      <div className="grid gap-8">
        <div className="card">
          <div className="flex items-center mb-4">
            <Music className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-semibold">The Project</h2>
          </div>

          <p className="text-gray-700 mb-4">
            BTS Music Quiz is a web application built with React, Vite, and Tailwind CSS. It uses the Free Music Archive
            API to fetch BTS songs and challenges users to identify songs from short snippets.
          </p>

          <p className="text-gray-700">
            This project was created as a fun way for ARMY to test their knowledge of BTS songs. The game features
            different difficulty levels, allowing you to challenge yourself with snippets as short as 0.1 seconds or as
            long as 1 minute.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-pink-500 mr-2" />
            <h2 className="text-xl font-semibold">For ARMY</h2>
          </div>

          <p className="text-gray-700 mb-4">
            This project is dedicated to ARMY worldwide. BTS has brought joy and inspiration to millions of fans, and
            this small game is a tribute to their amazing music.
          </p>

          <p className="text-gray-700">
            Whether you're a new fan or have been with BTS since the beginning, we hope this game brings you joy and
            maybe helps you discover some BTS songs you might have missed.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Technologies Used</h2>

          <ul className="grid grid-cols-2 gap-3 text-gray-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              React
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Vite
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Tailwind CSS
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              React Router
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Free Music Archive API
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Lucide React Icons
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Connect & Contribute</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/yourusername/bts-music-quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub Repository
            </a>

            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center"
            >
              <Twitter className="w-5 h-5 mr-2" />
              Follow on Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
