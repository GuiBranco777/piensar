"use client"

import { getGame, type GameId } from "@/lib/games"
import { QuizGame } from "./games/quiz-game"
import { CompareGame } from "./games/compare-game"
import { SequenceGame } from "./games/sequence-game"

type GameViewProps = {
  gameId: GameId
  onExit: () => void
  onEarnStars: (n: number) => void
}

export function GameView({ gameId, onExit, onEarnStars }: GameViewProps) {
  const game = getGame(gameId)

  switch (gameId) {
    case "add":
    case "sub":
    case "mul":
      return <QuizGame key={gameId} game={game} operation={gameId} onExit={onExit} onEarnStars={onEarnStars} />
    case "cmp":
      return <CompareGame key={gameId} game={game} onExit={onExit} onEarnStars={onEarnStars} />
    case "seq":
      return <SequenceGame key={gameId} game={game} onExit={onExit} onEarnStars={onEarnStars} />
  }
}
