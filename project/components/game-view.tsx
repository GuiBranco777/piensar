"use client"

import { getGame, type GameId } from "@/lib/games"
import { LogicGame } from "./games/logic-game"

type GameViewProps = {
  gameId: GameId
  onExit: () => void
  onEarnStars: (n: number) => void
}

export function GameView({ gameId, onExit, onEarnStars }: GameViewProps) {
  const game = getGame(gameId)

  return <LogicGame key={gameId} game={game} onExit={onExit} onEarnStars={onEarnStars} />
}
