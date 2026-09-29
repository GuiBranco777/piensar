"use client"

import { useState } from "react"
import type { GameId } from "@/lib/games"
import { LoginScreen } from "@/components/login-screen"
import { SiteHeader } from "@/components/site-header"
import { GameSidebar } from "@/components/game-sidebar"
import { GameDashboard } from "@/components/game-dashboard"
import { GameView } from "@/components/game-view"

export default function Page() {
  const [userName, setUserName] = useState<string | null>(null)
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [stars, setStars] = useState(0)
  const [solved, setSolved] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!userName) return <LoginScreen onLogin={setUserName} />

  function handleLogout() {
    setUserName(null)
    setActiveGame(null)
    setStars(0)
    setSolved(0)
    setSidebarOpen(false)
  }

  function handleEarnStars(points: number) {
    setStars((current) => current + points)
    setSolved((current) => Math.min(5, current + 1))
  }

  return <div className="min-h-dvh"><SiteHeader userName={userName} stars={stars} onLogout={handleLogout} onLoginClick={() => {}} onToggleSidebar={() => setSidebarOpen((value) => !value)} /><div className="mx-auto flex w-full max-w-7xl"><GameSidebar activeGame={activeGame} onSelect={setActiveGame} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="flex-1 p-4 md:p-8">{activeGame ? <GameView gameId={activeGame} onExit={() => setActiveGame(null)} onEarnStars={handleEarnStars} /> : <GameDashboard userName={userName} stars={stars} solved={solved} onSelect={setActiveGame} />}</main></div></div>
}
