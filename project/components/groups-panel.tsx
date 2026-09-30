"use client"

import { useState, useTransition } from "react"
import { createGroup, getCompetitionData, joinGroup } from "@/app/actions/groups"
import { Button } from "@/components/ui/button"
import { Users, Trophy } from "lucide-react"

type Props = { onChanged: () => void }

export function GroupsPanel({ onChanged }: Props) {
  const [mode, setMode] = useState<"create" | "join">("create")
  const [value, setValue] = useState("")
  const [message, setMessage] = useState("")
  const [ranking, setRanking] = useState<Array<{ name: string; code: string; score: number }>>([])
  const [pending, startTransition] = useTransition()

  function submit() {
    setMessage("")
    startTransition(async () => {
      try {
        if (mode === "create") await createGroup(value)
        else await joinGroup(value)
        setValue("")
        const competition = await getCompetitionData()
        setRanking(competition.groupRows.map((group) => ({ name: group.name, code: group.code, score: Number(group.score) })))
        setMessage(mode === "create" ? "Grupo criado! Compartilhe o código com seus colegas." : "Você entrou no grupo!")
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Não foi possível concluir a operação.")
      }
    })
  }

  return (
    <section className="rounded-4xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Users aria-hidden="true" /></div>
        <div><p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Competição</p><h2 className="font-display text-2xl font-bold">Grupos e rankings</h2><p className="mt-1 text-sm text-muted-foreground">Crie uma turma ou entre usando um código.</p></div>
      </div>
      <div className="mt-5 flex gap-2"><Button type="button" variant={mode === "create" ? "default" : "outline"} onClick={() => setMode("create")} className="rounded-xl">Criar grupo</Button><Button type="button" variant={mode === "join" ? "default" : "outline"} onClick={() => setMode("join")} className="rounded-xl">Entrar com código</Button></div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><input value={value} onChange={(event) => setValue(event.target.value)} placeholder={mode === "create" ? "Nome do grupo" : "Ex.: AUR-27"} className="min-h-11 flex-1 rounded-xl border-2 border-input bg-background px-4 outline-none focus:border-primary" /><Button type="button" disabled={pending || value.trim().length < 3} onClick={submit} className="rounded-xl">{pending ? "Salvando..." : mode === "create" ? "Criar" : "Entrar"}</Button></div>
      {message && <p className="mt-3 text-sm font-medium text-muted-foreground" role="status">{message}</p>}
      {ranking.length > 0 && <div className="mt-6 border-t border-border pt-5"><div className="mb-3 flex items-center gap-2 font-display font-bold"><Trophy className="text-accent-foreground" aria-hidden="true" />Ranking geral dos seus grupos</div><div className="flex flex-col gap-2">{ranking.map((group, index) => <div key={group.code} className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3"><span className="w-6 text-center font-bold">{index + 1}º</span><span className="flex-1 font-semibold">{group.name}<span className="ml-2 text-xs text-muted-foreground">{group.code}</span></span><span className="font-display font-bold">{group.score} pts</span></div>)}</div></div>}
      <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Trophy aria-hidden="true" />Pontos dos desafios formam o ranking individual e o ranking dos grupos.</div>
    </section>
  )
}
