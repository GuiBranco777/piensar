"use client"

import { useMemo, useState } from "react"
import type { Game } from "@/lib/games"
import { GameShell } from "./game-shell"
import { DifficultyPicker, type Difficulty } from "./difficulty-picker"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

const TOTAL = 5

type Operation = "add" | "sub" | "mul"

type Question = {
  a: number
  b: number
  answer: number
  options: number[]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function rangeFor(op: Operation, difficulty: Difficulty): { min: number; max: number } {
  const table: Record<Operation, Record<Difficulty, { min: number; max: number }>> = {
    add: { facil: { min: 1, max: 10 }, medio: { min: 2, max: 20 }, dificil: { min: 10, max: 50 } },
    sub: { facil: { min: 1, max: 10 }, medio: { min: 2, max: 20 }, dificil: { min: 10, max: 60 } },
    mul: { facil: { min: 1, max: 5 }, medio: { min: 2, max: 9 }, dificil: { min: 2, max: 12 } },
  }
  return table[op][difficulty]
}

function buildQuestion(op: Operation, difficulty: Difficulty): Question {
  const { min, max } = rangeFor(op, difficulty)
  let a = randInt(min, max)
  let b = randInt(min, max)
  let answer: number

  if (op === "add") {
    answer = a + b
  } else if (op === "sub") {
    if (b > a) [a, b] = [b, a]
    answer = a - b
  } else {
    answer = a * b
  }

  const options = new Set<number>([answer])
  while (options.size < 4) {
    const delta = randInt(1, Math.max(3, Math.round(answer * 0.3) || 3))
    const candidate = Math.random() > 0.5 ? answer + delta : answer - delta
    if (candidate >= 0) options.add(candidate)
  }

  return {
    a,
    b,
    answer,
    options: [...options].sort(() => Math.random() - 0.5),
  }
}

const SYMBOL: Record<Operation, string> = { add: "+", sub: "−", mul: "×" }

type QuizGameProps = {
  game: Game
  operation: Operation
  onExit: () => void
  onEarnStars: (n: number) => void
}

export function QuizGame({ game, operation, onExit, onEarnStars }: QuizGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)

  const questions = useMemo(() => {
    if (!difficulty) return []
    return Array.from({ length: TOTAL }, () => buildQuestion(operation, difficulty))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, operation, seed])

  if (!difficulty) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <DifficultyPicker game={game} onExit={onExit} onPick={setDifficulty} />
      </div>
    )
  }

  const finished = index >= TOTAL
  const current = questions[index]

  function handleAnswer(option: number) {
    if (locked) return
    setSelected(option)
    setLocked(true)
    const correct = option === current.answer
    if (correct) {
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
          <div
            className={cn(
              "flex flex-col items-center gap-2 rounded-4xl border p-8 text-center shadow-sm",
              game.softBg,
              game.border,
            )}
          >
            <p className="text-sm font-semibold text-muted-foreground">Quanto é?</p>
            <p className="font-display text-5xl font-bold text-foreground md:text-6xl">
              {current.a} {SYMBOL[operation]} {current.b}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {current.options.map((option) => {
              const isSelected = selected === option
              const isCorrect = option === current.answer
              const showState = locked && (isSelected || isCorrect)
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={locked}
                  className={cn(
                    "relative flex h-20 items-center justify-center rounded-3xl border-2 bg-card font-display text-3xl font-bold text-foreground shadow-sm transition-all",
                    !locked && "hover:-translate-y-0.5 hover:border-primary",
                    showState && isCorrect && "border-game-seq bg-game-seq-soft",
                    showState && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    !showState && "border-border",
                  )}
                >
                  {option}
                  {showState && isCorrect && (
                    <span className="absolute right-3 top-3 text-game-seq">
                      <Check className="size-6" aria-hidden="true" />
                    </span>
                  )}
                  {showState && isSelected && !isCorrect && (
                    <span className="absolute right-3 top-3 text-destructive">
                      <X className="size-6" aria-hidden="true" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </GameShell>
  )
}
