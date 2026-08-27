"use client"

import type { ReactNode } from "react"
import type { Game } from "@/lib/games"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Trophy, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type GameShellProps = {
  game: Game
  questionIndex: number
  total: number
  score: number
  finished: boolean
  onExit: () => void
  onRestart: () => void
  children: ReactNode
}

export function GameShell({
  game,
  questionIndex,
  total,
  score,
  finished,
  onExit,
  onRestart,
  children,
}: GameShellProps) {
  const Icon = game.icon

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
      {/* Cabeçalho do jogo */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onExit} className="rounded-xl" size="sm">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar
        </Button>

        <div className="flex items-center gap-2">
          <span className={cn("flex size-9 items-center justify-center rounded-xl", game.softBg, game.color)}>
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold text-foreground">{game.name}</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground">
          <Star className="size-4 fill-current" aria-hidden="true" />
          {score}
        </div>
      </div>

      {/* Progresso */}
      {!finished && (
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2.5 flex-1 rounded-full transition-colors",
                i <= questionIndex ? game.solidBg : "bg-muted",
              )}
            />
          ))}
        </div>
      )}

      {finished ? (
        <div className="flex flex-col items-center gap-5 rounded-4xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground animate-pop-in">
            <Trophy className="size-10" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-2xl font-bold text-foreground">Muito bem!</h2>
            <p className="text-muted-foreground">
              Você acertou <span className="font-bold text-foreground">{score}</span> de {total} e ganhou{" "}
              <span className="font-bold text-foreground">{score}</span> estrelas!
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={onRestart} className="rounded-xl font-bold">
              <RotateCcw className="size-4" aria-hidden="true" />
              Jogar de novo
            </Button>
            <Button variant="outline" onClick={onExit} className="rounded-xl bg-transparent font-bold">
              Escolher outro jogo
            </Button>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
