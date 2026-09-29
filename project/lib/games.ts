import { Brain, Footprints, Grid2X2, LandPlot, ListTree, type LucideIcon } from "lucide-react"

export type GameId = "pattern" | "bridge" | "combinations" | "area" | "deduction"

export type Game = { id: GameId; name: string; tagline: string; description: string; icon: LucideIcon; color: string; solidBg: string; softBg: string; border: string }

export const GAMES: Game[] = [
  { id: "pattern", name: "Padrão secreto", tagline: "Descubra a regra!", description: "Encontre o próximo termo de uma sequência surpreendente.", icon: ListTree, color: "text-game-add", solidBg: "bg-game-add", softBg: "bg-game-add-soft", border: "border-game-add/30" },
  { id: "bridge", name: "Travessia da ponte", tagline: "Pense nos caminhos!", description: "Planeje a travessia mais rápida usando lógica e estratégia.", icon: Footprints, color: "text-game-sub", solidBg: "bg-game-sub", softBg: "bg-game-sub-soft", border: "border-game-sub/30" },
  { id: "combinations", name: "Conta combinações", tagline: "Quantas escolhas?", description: "Use a contagem para descobrir todas as possibilidades.", icon: Grid2X2, color: "text-game-mul", solidBg: "bg-game-mul", softBg: "bg-game-mul-soft", border: "border-game-mul/30" },
  { id: "area", name: "Área escondida", tagline: "Veja além do desenho!", description: "Resolva um desafio visual usando formas e medidas.", icon: LandPlot, color: "text-game-cmp", solidBg: "bg-game-cmp", softBg: "bg-game-cmp-soft", border: "border-game-cmp/30" },
  { id: "deduction", name: "Quem fez o quê?", tagline: "Junte as pistas!", description: "Cruze as informações e descubra a única resposta possível.", icon: Brain, color: "text-game-seq", solidBg: "bg-game-seq", softBg: "bg-game-seq-soft", border: "border-game-seq/30" },
]

export function getGame(id: GameId): Game { return GAMES.find((game) => game.id === id) ?? GAMES[0] }
