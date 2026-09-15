'use client'

import { useState } from 'react'
import type { GameId } from '@/lib/games'
import { SiteHeader } from '@/components/site-header'
import { GameSidebar } from '@/components/game-sidebar'
import { GameDashboard } from '@/components/game-dashboard'
import { GameView } from '@/components/game-view'
import { GroupPanel } from '@/components/group-panel'
import { authClient } from '@/lib/auth-client'

export function AppShell({ userName }: { userName: string }) {
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [stars, setStars] = useState(0); const [solved, setSolved] = useState(0); const [sidebarOpen, setSidebarOpen] = useState(false)
  async function logout() { await authClient.signOut(); window.location.href = '/sign-in' }
  function earn(points: number) { setStars(v => v + points); setSolved(v => Math.min(5, v + 1)) }
  return <div className="min-h-dvh"><SiteHeader userName={userName} stars={stars} onLogout={logout} onLoginClick={() => {}} onToggleSidebar={() => setSidebarOpen(v => !v)} /><div className="mx-auto flex w-full max-w-7xl"><GameSidebar activeGame={activeGame} onSelect={setActiveGame} open={sidebarOpen} onClose={() => setSidebarOpen(false)} /><main className="flex flex-1 flex-col gap-6 p-4 md:p-8">{activeGame ? <GameView gameId={activeGame} onExit={() => setActiveGame(null)} onEarnStars={earn} /> : <><GroupPanel /><GameDashboard userName={userName} stars={stars} solved={solved} onSelect={setActiveGame} /></>}</main></div></div>
}
