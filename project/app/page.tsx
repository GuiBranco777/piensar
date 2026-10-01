"use client"

import { useEffect, useState } from "react"
import { GAMES, type GameId } from "@/lib/games"
import { LoginScreen } from "@/components/login-screen"
import { SiteHeader } from "@/components/site-header"
import { GameSidebar } from "@/components/game-sidebar"
import { GameDashboard } from "@/components/game-dashboard"
import { GameView } from "@/components/game-view"
import { authClient } from "@/lib/auth-client"
import { getUserProgress } from "@/app/actions/groups"

export default function Page() {
  const { data: session, isPending } = authClient.useSession()
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [stars, setStars] = useState(0)
  const [solvedIds, setSolvedIds] = useState<Set<GameId>>(new Set())
  const [progress, setProgress] = useState<Array<{ gameId: string; stars: number; createdAt: Date }>>([])
  useEffect(() => {
    if (!session?.user.id) return
    getUserProgress().then(setProgress).catch(() => setProgress([]))
  }, [session?.user.id])
  const solved = solvedIds.size
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = session?.user.name ?? null

  const savedIds = new Set((progress ?? []).map((item) => item.gameId as GameId))
  const displayedSolvedIds = savedIds.size > 0 ? new Set([...savedIds, ...solvedIds]) : solvedIds
  const displayedStars = progress.length > 0 ? progress.reduce((total, item) => total + item.stars, 0) : stars
  const displayedSolved = displayedSolvedIds.size

  if (isPending) return <main className="flex min-h-dvh items-center justify-center text-muted-foreground">Carregando sua conta...</main>
  if (!userName) return <LoginScreen onAuthenticated={() => window.location.reload()} />

  async function handleLogout() {
    await authClient.signOut()
    setActiveGame(null)
    setStars(0)
    setSolvedIds(new Set())
    setSidebarOpen(false)
  }

  function handleEarnStars(gameId: GameId, _points: number) {
    setSolvedIds((current) => {
      if (current.has(gameId)) return current
      const next = new Set(current)
      next.add(gameId)
      return next
    })
    void getUserProgress().then(setProgress)
  }

  return <div className="min-h-dvh"><SiteHeader userName={userName} stars={displayedStars} onLogout={handleLogout} onLoginClick={() => {}} onToggleSidebar={() => setSidebarOpen((value) => !value)} /><div className="mx-auto flex w-full max-w-7xl"><GameSidebar activeGame={activeGame} onSelect={setActiveGame} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="flex-1 p-4 md:p-8">{activeGame ? <GameView gameId={activeGame} onExit={() => setActiveGame(null)} onEarnStars={handleEarnStars} /> : <GameDashboard userName={userName} stars={displayedStars} solved={displayedSolved} solvedIds={displayedSolvedIds} onSelect={setActiveGame} />}</main></div></div>
}
