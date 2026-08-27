"use client"

import { GAMES, type GameId } from "@/lib/games"
import { cn } from "@/lib/utils"
import { Sparkles, Star, ChevronRight } from "lucide-react"

type GameDashboardProps = {
  userName: string
  stars: number
  onSelect: (id: GameId) => void
}

export function GameDashboard({ userName, stars, onSelect }: GameDashboardProps) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      {/* Boas-vindas */}
      <section className="flex flex-col gap-4 rounded-4xl bg-primary p-6 text-primary-foreground shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">
            <Sparkles className="size-4" aria-hidden="true" />
            Bem-vindo(a)!
          </span>
          <h1 className="text-balance font-display text-3xl font-bold leading-tight md:text-4xl">
            Oi, {userName}! Vamos brincar de matemática?
          </h1>
          <p className="text-pretty leading-relaxed text-primary-foreground/80">
            Escolha um jogo na lista ao lado ou aqui embaixo e comece a ganhar estrelas.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-3xl bg-primary-foreground/15 px-5 py-4">
          <Star className="size-8 fill-current" aria-hidden="true" />
          <div>
            <p className="font-display text-3xl font-bold leading-none">{stars}</p>
            <p className="text-sm text-primary-foreground/80">estrelas</p>
          </div>
        </div>
      </section>

      {/* Grade de jogos */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">Escolha um jogo</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {GAMES.map((game) => {
            const Icon = game.icon
            return (
              <button
                key={game.id}
                type="button"
                onClick={() => onSelect(game.id)}
                className="group flex items-center gap-4 rounded-4xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span
                  className={cn(
                    "flex size-16 shrink-0 items-center justify-center rounded-3xl transition-transform group-hover:scale-105",
                    game.softBg,
                    game.color,
                  )}
                >
                  <Icon className="size-8" aria-hidden="true" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-display text-lg font-bold text-foreground">{game.name}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{game.description}</span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
