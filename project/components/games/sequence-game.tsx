"use client"

import { useMemo, useState } from "react"
import type { Game } from "@/lib/games"
import { GameShell } from "./game-shell"
import { DifficultyPicker, type Difficulty } from "./difficulty-picker"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"

const TOTAL = 5
const LENGTH = 5

type Question = {
  sequence: number[]
  missingIndex: number
  answer: number
  options: number[]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function stepFor(difficulty: Difficulty) {
  if (difficulty === "facil") return randInt(1, 3)
  if (difficulty === "medio") return randInt(2, 6)
  return randInt(3, 12)
}

function buildQuestion(difficulty: Difficulty): Question {
  const step = stepFor(difficulty)
  const start = randInt(1, difficulty === "facil" ? 10 : difficulty === "medio" ? 30 : 60)
  const sequence = Array.from({ length: LENGTH }, (_, i) => start + i * step)
  const missingIndex = randInt(1, LENGTH - 1)
  const answer = sequence[missingIndex]

  const options = new Set<number>([answer])
  while (options.size < 4) {
    const delta = randInt(1, Math.max(2, step))
    const candidate = Math.random() > 0.5 ? answer + delta : answer - delta
    if (candidate >= 0 && candidate !== answer) options.add(candidate)
  }

  return {
    sequence,
    missingIndex,
    answer,
    options: [...options].sort(() => Math.random() - 0.5),
  }
}

type SequenceGameProps = {
  game: Game
  onExit: () => void
  onEarnStars: (n: number) => void
}

export function SequenceGame({ game, onExit, onEarnStars }: SequenceGameProps) {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [seed, setSeed] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
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

  function handleAnswer(option: number) {
    if (locked) return
    setSelected(option)
    setLocked(true)
    if (option === current.answer) {
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
          <p className="text-center text-sm font-semibold text-muted-foreground">
            Qual número está faltando na sequência?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {current.sequence.map((value, i) => {
              const isMissing = i === current.missingIndex
              return (
                <div
                  key={i}
                  className={cn(
                    "flex size-16 items-center justify-center rounded-2xl border font-display text-2xl font-bold md:size-20 md:text-3xl",
                    isMissing
                      ? cn("border-dashed text-foreground", game.softBg, game.border)
                      : "border-border bg-card text-foreground",
                  )}
                >
                  {isMissing ? (locked ? current.answer : "?") : value}
                </div>
              )
            })}
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
