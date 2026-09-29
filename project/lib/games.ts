import { Brain, Footprints, Grid2X2, LandPlot, ListTree, Shapes, Trophy, type LucideIcon } from "lucide-react"

export type GameLevel = "Iniciante" | "Intermediário" | "Desafio"
export type GameId =
  | "pattern-1" | "pattern-2" | "pattern-3" | "bridge-1" | "bridge-2" | "bridge-3"
  | "combinations-1" | "combinations-2" | "combinations-3" | "area-1" | "area-2" | "area-3" | "deduction-1"
  | "pattern-4" | "pattern-5" | "combinations-4" | "combinations-5" | "area-4" | "area-5" | "deduction-2" | "deduction-3" | "bridge-3" | "bridge-4" | "bridge-5" | "sequence-1" | "sequence-2" | "sequence-3" | "sequence-4" | "sequence-5"

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
  { id: "pattern-4", name: "Saltos alternados", tagline: "Observe os intervalos!", description: "Descubra a regra que alterna entre dois saltos.", icon: ListTree, level: "Iniciante", ...styles.add },
  { id: "pattern-5", name: "Dobro e mais um", tagline: "Continue pensando!", description: "Encontre o termo seguinte em uma sequência crescente.", icon: ListTree, level: "Iniciante", ...styles.add },
  { id: "combinations-4", name: "Placas coloridas", tagline: "Conte as escolhas!", description: "Monte placas sem repetir cores na mesma posição.", icon: Grid2X2, level: "Iniciante", ...styles.mul },
  { id: "combinations-5", name: "Times possíveis", tagline: "Forme equipes!", description: "Conte equipes com uma condição especial.", icon: Grid2X2, level: "Intermediário", ...styles.mul },
  { id: "area-4", name: "Faixa no quadrado", tagline: "Use a decomposição!", description: "Calcule a área que sobra após retirar uma faixa.", icon: LandPlot, level: "Intermediário", ...styles.cmp },
  { id: "area-5", name: "Retângulos iguais", tagline: "Encontre a medida!", description: "Relacione perímetro e área em uma figura simples.", icon: LandPlot, level: "Desafio", ...styles.cmp },
  { id: "deduction-2", name: "As três caixas", tagline: "Leia as pistas!", description: "Descubra qual caixa contém cada objeto.", icon: Brain, level: "Intermediário", ...styles.seq },
  { id: "deduction-3", name: "Ordem na fila", tagline: "Organize as pistas!", description: "Determine a posição de cada estudante.", icon: Brain, level: "Desafio", ...styles.seq },
  { id: "bridge-3", name: "Caminhos no tabuleiro", tagline: "Conte sem repetir!", description: "Conte caminhos possíveis em uma malha pequena.", icon: Footprints, level: "Intermediário", ...styles.sub },
  { id: "bridge-4", name: "Moedas na balança", tagline: "Compare com estratégia!", description: "Encontre uma moeda diferente com poucas pesagens.", icon: Footprints, level: "Desafio", ...styles.sub },
  { id: "bridge-5", name: "Robô no labirinto", tagline: "Planeje os movimentos!", description: "Determine a menor quantidade de passos.", icon: Footprints, level: "Desafio", ...styles.sub },
  { id: "sequence-1", name: "Triângulos de palitos", tagline: "Conte as figuras!", description: "Identifique quantas peças são necessárias.", icon: Shapes, level: "Iniciante", ...styles.cmp },
  { id: "sequence-2", name: "Calendário curioso", tagline: "Use a aritmética!", description: "Encontre uma data a partir de relações numéricas.", icon: Shapes, level: "Intermediário", ...styles.cmp },
  { id: "sequence-3", name: "Números vizinhos", tagline: "Procure o padrão!", description: "Analise a soma de números consecutivos.", icon: ListTree, level: "Intermediário", ...styles.add },
  { id: "sequence-4", name: "Código do cadeado", tagline: "Elimine possibilidades!", description: "Use tentativas e pistas para achar o código.", icon: Brain, level: "Desafio", ...styles.seq },
  { id: "sequence-5", name: "Torneio de lógica", tagline: "Pense até o fim!", description: "Descubra o resultado de uma competição curta.", icon: Trophy, level: "Desafio", ...styles.seq },
]

export function getGame(id: GameId): Game { return GAMES.find((game) => game.id === id) ?? GAMES[0] }
