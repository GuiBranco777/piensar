import { Brain, Footprints, Grid2X2, LandPlot, ListTree, Shapes, type LucideIcon } from "lucide-react"

export type GameLevel = "Iniciante" | "Intermediário" | "Desafio"
export type GameId =
  | "pattern-1" | "pattern-2" | "pattern-3" | "bridge-1" | "bridge-2" | "bridge-3"
  | "combinations-1" | "combinations-2" | "combinations-3" | "area-1" | "area-2" | "area-3" | "deduction-1"

export type Game = { id: GameId; name: string; tagline: string; description: string; icon: LucideIcon; color: string; solidBg: string; softBg: string; border: string; level: GameLevel }

const styles = {
  add: { color: "text-game-add", solidBg: "bg-game-add", softBg: "bg-game-add-soft", border: "border-game-add/30" },
  sub: { color: "text-game-sub", solidBg: "bg-game-sub", softBg: "bg-game-sub-soft", border: "border-game-sub/30" },
  mul: { color: "text-game-mul", solidBg: "bg-game-mul", softBg: "bg-game-mul-soft", border: "border-game-mul/30" },
  cmp: { color: "text-game-cmp", solidBg: "bg-game-cmp", softBg: "bg-game-cmp-soft", border: "border-game-cmp/30" },
  seq: { color: "text-game-seq", solidBg: "bg-game-seq", softBg: "bg-game-seq-soft", border: "border-game-seq/30" },
}

export const GAMES: Game[] = [
  { id: "pattern-1", name: "Sequência curiosa", tagline: "Descubra a regra!", description: "Encontre o próximo termo observando os saltos.", icon: ListTree, level: "Iniciante", ...styles.add },
  { id: "combinations-1", name: "Escolhas do lanche", tagline: "Quantas opções?", description: "Conte maneiras diferentes de montar um lanche.", icon: Grid2X2, level: "Iniciante", ...styles.mul },
  { id: "area-1", name: "Quadrados escondidos", tagline: "Veja além do desenho!", description: "Use medidas e formas para descobrir uma área.", icon: Shapes, level: "Iniciante", ...styles.cmp },
  { id: "bridge-1", name: "Travessia simples", tagline: "Pense nos caminhos!", description: "Planeje uma travessia usando lógica e estratégia.", icon: Footprints, level: "Iniciante", ...styles.sub },
  { id: "pattern-2", name: "Padrão secreto", tagline: "Encontre a transformação!", description: "Investigue uma sequência com duas regras alternadas.", icon: ListTree, level: "Intermediário", ...styles.add },
  { id: "combinations-2", name: "Códigos possíveis", tagline: "Organize as escolhas!", description: "Descubra quantos códigos podem ser formados.", icon: Grid2X2, level: "Intermediário", ...styles.mul },
  { id: "area-2", name: "Área dividida", tagline: "Recomponha a figura!", description: "Calcule a área usando partes de uma figura maior.", icon: LandPlot, level: "Intermediário", ...styles.cmp },
  { id: "bridge-2", name: "Ponte à noite", tagline: "Otimize o tempo!", description: "Encontre a travessia mais rápida para o grupo.", icon: Footprints, level: "Intermediário", ...styles.sub },
  { id: "pattern-3", name: "Padrão avançado", tagline: "Generalize a ideia!", description: "Use raciocínio algébrico para continuar a sequência.", icon: ListTree, level: "Desafio", ...styles.add },
  { id: "combinations-3", name: "Comitê da escola", tagline: "Conte sem repetir!", description: "Resolva uma contagem com restrições.", icon: Grid2X2, level: "Desafio", ...styles.mul },
  { id: "area-3", name: "Mosaico misterioso", tagline: "Conecte as áreas!", description: "Combine relações de área para encontrar o resultado.", icon: LandPlot, level: "Desafio", ...styles.cmp },
  { id: "deduction-1", name: "Quem fez o quê?", tagline: "Junte as pistas!", description: "Cruze as informações e descubra a única resposta.", icon: Brain, level: "Desafio", ...styles.seq },
]

export function getGame(id: GameId): Game { return GAMES.find((game) => game.id === id) ?? GAMES[0] }
