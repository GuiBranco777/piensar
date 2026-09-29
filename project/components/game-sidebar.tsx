"use client"

import { GAMES, type GameId, type GameLevel } from "@/lib/games"
import { Home, X } from "lucide-react"
import { cn } from "@/lib/utils"

type GameSidebarProps = {
  activeGame: GameId | null
  onSelect: (id: GameId | null) => void
  open: boolean
  onClose: () => void
}

export function GameSidebar({ activeGame, onSelect, open, onClose }: GameSidebarProps) {
  return (
    <>
      {/* Overlay no mobile */}
      {open && (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm md:hidden"
          aria-label="Fechar menu"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col gap-2 border-r border-sidebar-border bg-sidebar p-4 transition-transform duration-300 md:sticky md:top-16 md:z-0 md:h-[calc(100dvh-4rem)] md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between md:hidden">
          <span className="font-display text-lg font-bold text-sidebar-foreground">Jogos</span>
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-sidebar-foreground hover:bg-sidebar-accent"
            aria-label="Fechar menu"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p className="hidden px-2 pt-2 text-xs font-bold uppercase tracking-wide text-muted-foreground md:block">
          Menu
        </p>

        <button
          type="button"
          onClick={() => {
            onSelect(null)
            onClose()
          }}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-3 py-3 text-left font-semibold transition-colors",
            activeGame === null
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent",
          )}
        >
          <Home className="size-5 shrink-0" aria-hidden="true" />
          Início
        </button>

        <p className="px-2 pt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">Jogos por nível</p>

        <nav className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-1" aria-label="Jogos organizados por nível">
          {(["Iniciante", "Intermediário", "Desafio"] as GameLevel[]).map((level) => {
            const levelGames = GAMES.filter((game) => game.level === level)
            return (
              <section key={level} aria-labelledby={`sidebar-level-${level}`}>
                <div className="mb-1.5 flex items-center justify-between px-2">
                  <h2 id={`sidebar-level-${level}`} className="text-xs font-bold text-sidebar-foreground">{level}</h2>
                  <span className="text-[11px] font-semibold text-muted-foreground">{levelGames.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {levelGames.map((game) => {
                    const Icon = game.icon
                    const isActive = activeGame === game.id
                    return (
                      <button
                        key={game.id}
                        type="button"
                        onClick={() => {
                          onSelect(game.id)
                          onClose()
                        }}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/60",
                        )}
                      >
                        <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", game.softBg, game.color)}>
                          <Icon aria-hidden="true" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate font-bold text-sidebar-foreground">{game.name}</span>
                          <span className="truncate text-xs text-muted-foreground">{game.tagline}</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
