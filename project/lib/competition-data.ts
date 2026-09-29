export type GroupMember = {
  name: string
  initials: string
  score: number
  solved: number
}

export type Group = {
  id: string
  name: string
  code: string
  accent: string
  members: GroupMember[]
}

export const GROUPS: Group[] = [
  {
    id: "aurora",
    name: "Aurora dos Números",
    code: "AUR-27",
    accent: "bg-game-add-soft text-game-add",
    members: [
      { name: "Lara", initials: "LA", score: 420, solved: 4 },
      { name: "Ravi", initials: "RA", score: 360, solved: 3 },
      { name: "Bia", initials: "BI", score: 290, solved: 3 },
      { name: "Caio", initials: "CA", score: 240, solved: 2 },
    ],
  },
  {
    id: "parabolas",
    name: "Clube das Parábolas",
    code: "PAR-14",
    accent: "bg-game-sub-soft text-game-sub",
    members: [
      { name: "Nina", initials: "NI", score: 510, solved: 5 },
      { name: "Theo", initials: "TH", score: 400, solved: 4 },
      { name: "Ivo", initials: "IV", score: 330, solved: 3 },
    ],
  },
  {
    id: "fibonacci",
    name: "Fibonacci Mirim",
    code: "FIB-08",
    accent: "bg-game-seq-soft text-game-seq",
    members: [
      { name: "Duda", initials: "DU", score: 460, solved: 4 },
      { name: "Leo", initials: "LE", score: 315, solved: 3 },
      { name: "Maya", initials: "MA", score: 280, solved: 3 },
    ],
  },
]

export const CURRENT_GROUP_ID = "aurora"

export function getGroupScore(group: Group) {
  return group.members.reduce((total, member) => total + member.score, 0)
}

export function getGroupRanking(groups: Group[] = GROUPS) {
  return [...groups].sort((a, b) => getGroupScore(b) - getGroupScore(a))
}

export function getMemberRanking(group: Group, userName: string, userScore: number) {
  const members = group.members.filter((member) => member.name.toLowerCase() !== userName.toLowerCase())
  return [...members, { name: userName, initials: userName.slice(0, 2).toUpperCase(), score: userScore, solved: 0 }]
    .sort((a, b) => b.score - a.score)
}
