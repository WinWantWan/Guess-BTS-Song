import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Results from "./pages/Results"
import About from "./pages/About"
import { MusicProvider } from "./context/MusicContext"
import { GameProvider } from "./context/GameContext"

function App() {
  return (
    <Router>
      <MusicProvider>
        <GameProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </GameProvider>
      </MusicProvider>
    </Router>
  )
}

export default App