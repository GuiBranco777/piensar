"use client"

import type { Game } from "@/lib/games"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Rabbit, Bike, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

export type Difficulty = "facil" | "medio" | "dificil"

const OPTIONS: { id: Difficulty; label: string; hint: string; icon: typeof Rabbit }[] = [
  { id: "facil", label: "Fácil", hint: "Para começar (7-8 anos)", icon: Rabbit },
  { id: "medio", label: "Médio", hint: "Já pego o jeito (9-10 anos)", icon: Bike },
  { id: "dificil", label: "Difícil", hint: "Sou craque! (11-12 anos)", icon: Rocket },
]

type DifficultyPickerProps = {
  game: Game
  onExit: () => void
  onPick: (difficulty: Difficulty) => void
}

export function DifficultyPicker({ game, onExit, onPick }: DifficultyPickerProps) {
  const Icon = game.icon

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
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
        <span className="w-16" />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Escolha o nível</h2>
        <p className="text-muted-foreground">Comece devagar e vá subindo de nível!</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {OPTIONS.map((option) => {
          const OptIcon = option.icon
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onPick(option.id)}
              className={cn(
                "flex flex-col items-center gap-3 rounded-3xl border-2 border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary",
              )}
            >
              <span className={cn("flex size-14 items-center justify-center rounded-2xl", game.softBg, game.color)}>
                <OptIcon className="size-7" aria-hidden="true" />
              </span>
              <span className="font-display text-xl font-bold text-foreground">{option.label}</span>
              <span className="text-sm text-muted-foreground">{option.hint}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
