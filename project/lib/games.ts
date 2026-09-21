import { Plus, Minus, X, Scale, ListOrdered, type LucideIcon } from "lucide-react"

export type GameId = "add" | "sub" | "mul" | "cmp" | "seq"

export type Game = {
  id: GameId
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  /** classe de texto/cor sólida */
  color: string
  /** classe de fundo sólido */
  solidBg: string
  /** classe de fundo suave */
  softBg: string
  /** classe de borda */
  border: string
}

export const GAMES: Game[] = [
  {
    id: "add",
    name: "Somando",
    tagline: "Junte os números!",
    description: "Descubra o resultado das somas e vá ganhando estrelas.",
    icon: Plus,
    color: "text-game-add",
    solidBg: "bg-game-add",
    softBg: "bg-game-add-soft",
    border: "border-game-add/30",
  },
  {
    id: "sub",
    name: "Subtraindo",
    tagline: "Tire e descubra!",
    description: "Resolva as subtrações e mostre que você é craque.",
    icon: Minus,
    color: "text-game-sub",
    solidBg: "bg-game-sub",
    softBg: "bg-game-sub-soft",
    border: "border-game-sub/30",
  },
  {
    id: "mul",
    name: "Tabuada",
    tagline: "Multiplique tudo!",
    description: "Treine a tabuada de um jeito divertido e rápido.",
    icon: X,
    color: "text-game-mul",
    solidBg: "bg-game-mul",
    softBg: "bg-game-mul-soft",
    border: "border-game-mul/30",
  },
  {
    id: "cmp",
    name: "Maior ou Menor",
    tagline: "Quem é o maior?",
    description: "Compare os números e escolha o sinal certinho.",
    icon: Scale,
    color: "text-game-cmp",
    solidBg: "bg-game-cmp",
    softBg: "bg-game-cmp-soft",
    border: "border-game-cmp/30",
  },
  {
    id: "seq",
    name: "Sequência",
    tagline: "Complete a série!",
    description: "Encontre o número que está faltando na sequência.",
    icon: ListOrdered,
    color: "text-game-seq",
    solidBg: "bg-game-seq",
    softBg: "bg-game-seq-soft",
    border: "border-game-seq/30",
  },
]

export function getGame(id: GameId): Game {
  return GAMES.find((g) => g.id === id) ?? GAMES[0]
}
