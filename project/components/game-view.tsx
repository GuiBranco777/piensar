"use client"

import { getGame, type GameId } from "@/lib/games"
import { recordCompletion } from "@/app/actions/groups"
import { LogicGame } from "./games/logic-game"

type GameViewProps = {
  gameId: GameId
  onExit: () => void
  onEarnStars: (gameId: GameId, n: number) => void
}

export function GameView({ gameId, onExit, onEarnStars }: GameViewProps) {
  const game = getGame(gameId)

  return <LogicGame key={gameId} game={game} onExit={onExit} onEarnStars={async (points) => { const result = await recordCompletion(gameId, points); if (result.recorded) onEarnStars(gameId, points) }} />
}
