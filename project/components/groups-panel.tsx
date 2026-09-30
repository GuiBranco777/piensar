"use client"

import { useEffect, useState, useTransition } from "react"
import { createGroup, getCompetitionData, joinGroup } from "@/app/actions/groups"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Crown, Copy, Flag, Medal, Shield, Swords, Trophy, Users, UserPlus } from "lucide-react"

type Member = { groupId: number; userId: string; name: string; score: number }
type Group = { groupId: number; name: string; code: string; score: number }
type Props = { onChanged: () => void }

export function GroupsPanel({ onChanged }: Props) {
  const [mode, setMode] = useState<"create" | "join">("create")
  const [value, setValue] = useState("")
  const [message, setMessage] = useState("")
  const [groups, setGroups] = useState<Group[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [pending, startTransition] = useTransition()

  async function refresh() {
    try {
      const data = await getCompetitionData()
      setGroups(data.groupRows.map((group) => ({ ...group, score: Number(group.score) })))
      setMembers(data.memberRows.map((member) => ({ ...member, score: Number(member.score) })))
    } catch {
      setMessage("Entre na sua conta para acessar os clãs.")
    }
  }

  useEffect(() => { void refresh() }, [])

  function submit() {
    setMessage("")
    startTransition(async () => {
      try {
        if (mode === "create") await createGroup(value)
        else await joinGroup(value)
        setValue("")
        await refresh()
        setMessage(mode === "create" ? "Clã criado! Compartilhe o código com sua turma." : "Você entrou no clã!")
        onChanged()
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Não foi possível concluir a operação.")
      }
    })
  }

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code)
    setMessage(`Código ${code} copiado.`)
  }

  const activeGroup = groups[0]
  const activeMembers = activeGroup ? members.filter((member) => member.groupId === activeGroup.groupId) : []

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
      <div className="relative overflow-hidden bg-primary px-6 py-7 text-primary-foreground sm:px-8">
        <div className="absolute -right-8 -top-10 size-40 rounded-full border-[18px] border-primary-foreground/10" aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15"><Shield aria-hidden="true" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">Arena de clãs</p>
              <h2 className="mt-1 font-display text-2xl font-black">Sua comunidade de desafios</h2>
              <p className="mt-1 max-w-lg text-sm text-primary-foreground/80">Una sua turma, some estrelas e dispute o topo juntos.</p>
            </div>
          </div>
          <Swords className="hidden size-8 text-primary-foreground/50 sm:block" aria-hidden="true" />
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 rounded-2xl bg-muted/60 p-1">
            <button type="button" onClick={() => setMode("create")} className={cn("flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", mode === "create" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>Criar um clã</button>
            <button type="button" onClick={() => setMode("join")} className={cn("flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors", mode === "join" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>Entrar por código</button>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="group-value">{mode === "create" ? "Nome do clã" : "Código do clã"}</label>
            <input id="group-value" value={value} onChange={(event) => setValue(event.target.value)} placeholder={mode === "create" ? "Ex.: Mestres da Matemática" : "Ex.: MAT-42"} className="min-h-12 flex-1 rounded-2xl border-2 border-input bg-background px-4 outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" />
            <Button type="button" disabled={pending || value.trim().length < 3} onClick={submit} className="min-h-12 rounded-2xl px-6">{pending ? "Salvando..." : mode === "create" ? "Criar clã" : "Entrar"}</Button>
          </div>
          {message && <p className="text-sm font-medium text-muted-foreground" role="status">{message}</p>}

          <div className="rounded-3xl border border-border bg-muted/30 p-5">
            <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Meus clãs</p><h3 className="font-display text-xl font-bold">Ranking dos clãs</h3></div><Trophy className="text-accent-foreground" aria-hidden="true" /></div>
            {groups.length === 0 ? <div className="flex flex-col items-center gap-2 py-7 text-center text-muted-foreground"><Flag aria-hidden="true" /><p className="text-sm">Você ainda não participa de nenhum clã.</p></div> : <div className="flex flex-col gap-2">{groups.map((group, index) => <div key={group.code} className={cn("flex items-center gap-3 rounded-2xl border p-3", index === 0 ? "border-primary/30 bg-primary/5" : "border-border bg-background")}><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted font-bold">{index === 0 ? <Crown aria-hidden="true" /> : `${index + 1}º`}</span><div className="min-w-0 flex-1"><p className="truncate font-bold">{group.name}</p><p className="text-xs text-muted-foreground">{group.code} · {members.filter((member) => member.groupId === group.groupId).length} membros</p></div><span className="font-display font-bold">{group.score} pts</span><button type="button" onClick={() => void copyCode(group.code)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Copiar código ${group.code}`}><Copy aria-hidden="true" /></button></div>)}</div>}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Clã em destaque</p><h3 className="font-display text-xl font-bold">{activeGroup?.name ?? "Monte sua equipe"}</h3></div><Users className="text-primary" aria-hidden="true" /></div>
          {activeGroup ? <><div className="mb-4 flex items-center justify-between rounded-2xl bg-primary/5 px-4 py-3"><span className="text-sm text-muted-foreground">Código de entrada</span><button type="button" onClick={() => void copyCode(activeGroup.code)} className="font-display font-black tracking-wider text-primary">{activeGroup.code}</button></div><div className="flex flex-col gap-2">{activeMembers.slice(0, 6).map((member, index) => <div key={member.userId} className="flex items-center gap-3 rounded-2xl px-2 py-2"><span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold">{index + 1}</span><span className="flex-1 truncate font-semibold">{member.name}</span><span className="flex items-center gap-1 text-sm font-bold"><Medal aria-hidden="true" />{member.score}</span></div>)}</div><p className="mt-4 text-xs text-muted-foreground">Ranking por estrelas conquistadas nos desafios.</p></> : <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground"><UserPlus aria-hidden="true" /><p className="max-w-xs text-sm">Crie um clã ou use o código de um colega para começar a competir.</p></div>}
        </div>
      </div>
    </section>
  )
}
