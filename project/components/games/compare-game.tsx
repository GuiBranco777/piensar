"use client"

import { useMemo, useState } from "react"
import type { Game } from "@/lib/games"
import { GameShell } from "./game-shell"
import { DifficultyPicker, type Difficulty } from "./difficulty-picker"
import { cn } from "@/lib/utils"

const TOTAL = 5

type Sign = "<" | "=" | ">"

type Question = {
  a: number
  b: number
  answer: Sign
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function maxFor(difficulty: Difficulty) {
  return difficulty === "facil" ? 20 : difficulty === "medio" ? 100 : 999
}

function buildQuestion(difficulty: Difficulty): Question {
  const max = maxFor(difficulty)
  const a = randInt(1, max)
  // 1 em 5 chances de ser igual
  const b = Math.random() < 0.2 ? a : randInt(1, max)
  const answer: Sign = a < b ? "<" : a > b ? ">" : "="
  return { a, b, answer }
}

const SIGNS: { sign: Sign; label: string }[] = [
  { sign: "<", label: "menor que" },
  { sign: "=", label: "igual a" },
  { sign: ">", label: "maior que" },
]

type CompareGameProps = {
  game: Game
  onExit: () => void
  onEarnStars: (n: number) => void
}

export function CompareGame({ game, onExit, onEarnStars }: CompareGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<Sign | null>(null)
  const [locked, setLocked] = useState(false)

  const questions = useMemo(() => {
    if (!difficulty) return []
    return Array.from({ length: TOTAL }, () => buildQuestion(difficulty))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, seed])

  if (!difficulty) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <DifficultyPicker game={game} onExit={onExit} onPick={setDifficulty} />
      </div>
    )
  }

  const finished = index >= TOTAL
  const current = questions[index]

  function handleAnswer(sign: Sign) {
    if (locked) return
    setSelected(sign)
    setLocked(true)
    if (sign === current.answer) {
      setScore((s) => s + 1)
      onEarnStars(1)
    }
    window.setTimeout(() => {
      setSelected(null)
      setLocked(false)
      setIndex((i) => i + 1)
    }, 900)
  }

  function restart() {
    setSeed((s) => s + 1)
    setIndex(0)
    setScore(0)
    setSelected(null)
    setLocked(false)
    setDifficulty(null)
  }

  return (
    <GameShell
      game={game}
      questionIndex={index}
      total={TOTAL}
      score={score}
      finished={finished}
      onExit={onExit}
      onRestart={restart}
    >
      {current && (
        <div className="flex flex-col gap-6">
          <p className="text-center text-sm font-semibold text-muted-foreground">Qual sinal deixa a conta certa?</p>

          <div className="flex items-center justify-center gap-4">
            <div className={cn("flex size-24 items-center justify-center rounded-3xl border font-display text-4xl font-bold text-foreground md:size-28 md:text-5xl", game.softBg, game.border)}>
              {current.a}
            </div>
            <div className="flex size-12 items-center justify-center font-display text-3xl font-bold text-muted-foreground">
              {locked ? current.answer : "?"}
            </div>
            <div className={cn("flex size-24 items-center justify-center rounded-3xl border font-display text-4xl font-bold text-foreground md:size-28 md:text-5xl", game.softBg, game.border)}>
              {current.b}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {SIGNS.map(({ sign, label }) => {
              const isSelected = selected === sign
              const isCorrect = sign === current.answer
              const showState = locked && (isSelected || isCorrect)
              return (
                <button
                  key={sign}
                  type="button"
                  onClick={() => handleAnswer(sign)}
                  disabled={locked}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-3xl border-2 bg-card py-5 shadow-sm transition-all",
                    !locked && "hover:-translate-y-0.5 hover:border-primary",
                    showState && isCorrect && "border-game-seq bg-game-seq-soft",
                    showState && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    !showState && "border-border",
                  )}
                >
                  <span className="font-display text-4xl font-bold text-foreground">{sign}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </GameShell>
  )
}
