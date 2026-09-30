"use client"

import { useState } from "react"
import { GAMES, type GameId } from "@/lib/games"
import { LoginScreen } from "@/components/login-screen"
import { SiteHeader } from "@/components/site-header"
import { GameSidebar } from "@/components/game-sidebar"
import { GameDashboard } from "@/components/game-dashboard"
import { GameView } from "@/components/game-view"
import { authClient } from "@/lib/auth-client"

export default function Page() {
  const { data: session, isPending } = authClient.useSession()
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [stars, setStars] = useState(0)
  const [solvedIds, setSolvedIds] = useState<Set<GameId>>(new Set())
  const solved = solvedIds.size
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = session?.user.name ?? null

  if (isPending) return <main className="flex min-h-dvh items-center justify-center text-muted-foreground">Carregando sua conta...</main>
  if (!userName) return <LoginScreen onAuthenticated={() => window.location.reload()} />

  async function handleLogout() {
    await authClient.signOut()
    setActiveGame(null)
    setStars(0)
    setSolvedIds(new Set())
    setSidebarOpen(false)
  }

  function handleEarnStars(gameId: GameId, points: number) {
    setSolvedIds((current) => {
      if (current.has(gameId)) return current
      const next = new Set(current)
      next.add(gameId)
      setStars((value) => value + points)
      return next
    })
  }

  return <div className="min-h-dvh"><SiteHeader userName={userName} stars={stars} onLogout={handleLogout} onLoginClick={() => {}} onToggleSidebar={() => setSidebarOpen((value) => !value)} /><div className="mx-auto flex w-full max-w-7xl"><GameSidebar activeGame={activeGame} onSelect={setActiveGame} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="flex-1 p-4 md:p-8">{activeGame ? <GameView gameId={activeGame} onExit={() => setActiveGame(null)} onEarnStars={handleEarnStars} /> : <GameDashboard userName={userName} stars={stars} solved={solved} solvedIds={solvedIds} onSelect={setActiveGame} />}</main></div></div>
}
