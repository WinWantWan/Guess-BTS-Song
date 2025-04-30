"use client"

import { Music, Heart, Github, Twitter, Code, Users } from "lucide-react"
import { motion } from "framer-motion"

const About = () => {
  return (
    <div className="max-w-3xl mx-auto pt-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          About BTS Music Quiz
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A fun game created for ARMY to test their knowledge of BTS songs
        </p>
      </motion.div>

      <div className="grid gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <Music className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              The Project
            </h2>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">
            BTS Music Quiz is a web application built with React, Vite, and Tailwind CSS. It uses the Free Music Archive
            API to fetch BTS songs and challenges users to identify songs from short snippets.
          </p>

          <p className="text-gray-700 leading-relaxed">
            This project was created as a fun way for ARMY to test their knowledge of BTS songs. The game features
            different difficulty levels, allowing you to challenge yourself with snippets as short as 0.1 seconds or as
            long as 1 minute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-pink-100 p-3 rounded-xl mr-4">
              <Heart className="w-6 h-6 text-pink-500" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              For ARMY
            </h2>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">
            This project is dedicated to ARMY worldwide. BTS has brought joy and inspiration to millions of fans, and
            this small game is a tribute to their amazing music.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Whether you're a new fan or have been with BTS since the beginning, we hope this game brings you joy and
            maybe helps you discover some BTS songs you might have missed.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <Code className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Technologies Used
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "React",
              "Vite",
              "Tailwind CSS",
              "React Router",
              "Free Music Archive API",
              "Lucide React Icons",
              "Framer Motion",
              "TypeScript",
            ].map((tech, index) => (
              <div
                key={tech}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center shadow-sm border border-purple-100"
              >
                <span className="font-medium text-purple-800">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-xl mr-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Connect & Contribute
            </h2>
          </div>

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
        </motion.div>
      </div>
    </div>
  )
}

export default About
