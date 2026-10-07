"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Sparkles, Star, Rocket, Trophy } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { getPublicGlobalRanking } from "@/app/actions/groups"

type LoginScreenProps = {
  onAuthenticated: () => void
}

function accountEmail(name: string) {
  const localPart = name
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "")

  return `${localPart || "aluno"}@piensar.app`
}

export function LoginScreen({ onAuthenticated }: LoginScreenProps) {
  const [mode, setMode] = useState<"login" | "signup">("signup")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmation, setConfirmation] = useState("")
  const [error, setError] = useState("")
  const [ranking, setRanking] = useState<Array<{ userId: string; name: string; score: number; completed: number }>>([])

  useEffect(() => {
    getPublicGlobalRanking().then((rows) => setRanking(rows.map((row) => ({ ...row, score: Number(row.score), completed: Number(row.completed) })))).catch(() => setRanking([]))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    setError("")

    if (trimmed.length < 2) {
      setError("Digite um nome com pelo menos 2 caracteres.")
      return
    }
    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.")
      return
    }
    if (mode === "signup" && password !== confirmation) {
      setError("As senhas não conferem.")
      return
    }

    const email = accountEmail(trimmed)
    const result = mode === "signup"
      ? await authClient.signUp.email({ email, password, name: trimmed })
      : await authClient.signIn.email({ email, password })

    if (result.error) {
      setError(mode === "signup"
        ? "Não foi possível criar esta conta. Tente outro nome."
        : "Nome ou senha incorretos.")
      return
    }

    onAuthenticated()
  }

  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-4xl border border-border bg-card shadow-xl md:grid-cols-2">
        {/* Lado ilustrativo */}
        <section className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
          <div className="flex items-center gap-2">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary-foreground/15">
              <Calculator className="size-6" aria-hidden="true" />
            </div>
            <span className="font-display text-2xl font-bold">Piensar</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-balance font-display text-3xl font-bold leading-tight">
              Aprender matemática pode ser uma grande aventura!
            </h2>
            <p className="text-pretty leading-relaxed text-primary-foreground/80">
              Somar, subtrair, multiplicar e muito mais, tudo com jogos coloridos e divertidos.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Star className="size-5 shrink-0" aria-hidden="true" />
              Ganhe estrelas a cada acerto
            </li>
            <li className="flex items-center gap-3">
              <Rocket className="size-5 shrink-0" aria-hidden="true" />
              28 desafios para explorar
            </li>
          </ul>
        </section>

        {/* Lado do formulário */}
        <section className="flex flex-col justify-center gap-6 p-8 md:p-10">
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Calculator className="size-5" aria-hidden="true" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Piensar</span>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
              Vamos começar!
            </span>
            <h1 className="font-display text-3xl font-bold text-foreground">
              {mode === "signup" ? "Crie sua conta" : "Entre na sua conta"}
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              {mode === "signup"
                ? "Use apenas seu nome e uma senha para começar a aprender."
                : "Informe seu nome e senha para continuar seus desafios."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Seu nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Ana, Pedro, Bia..."
                autoComplete="username"
                autoFocus
                maxLength={24}
                className="w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Pelo menos 8 caracteres"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className="w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            {mode === "signup" && (
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmation" className="text-sm font-semibold text-foreground">
                  Confirme sua senha
                </label>
                <input
                  id="confirmation"
                  type="password"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="Digite a senha novamente"
                  autoComplete="new-password"
                  className="w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>
            )}

            {error && <p className="text-sm font-medium text-destructive" role="alert">{error}</p>}

            <Button
              type="submit"
              disabled={name.trim().length < 2 || password.length < 8 || (mode === "signup" && confirmation.length < 8)}
              className="h-12 w-full rounded-2xl text-lg font-bold"
            >
              {mode === "signup" ? "Criar conta e brincar" : "Entrar para brincar"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode((current) => (current === "signup" ? "login" : "signup"))
              setError("")
              setPassword("")
              setConfirmation("")
            }}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {mode === "signup" ? "Já tenho uma conta" : "Quero criar uma conta"}
          </button>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Usamos somente seu nome e senha. Nenhum e-mail ou dado pessoal é necessário.
          </p>
        </section>
      </div>
      <section className="w-full max-w-4xl rounded-4xl border border-border bg-card p-6 shadow-sm md:p-8" aria-labelledby="public-ranking-title">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pontuação real</p><h2 id="public-ranking-title" className="font-display text-2xl font-bold text-foreground">Ranking global</h2><p className="mt-1 text-sm text-muted-foreground">Todos os jogadores cadastrados aparecem aqui.</p></div><Trophy className="text-primary" aria-hidden="true" /></div>
        {ranking.length === 0 ? <p className="text-sm text-muted-foreground">Ainda não há pontuações registradas.</p> : <div className="grid gap-2 md:grid-cols-2">{ranking.map((player, index) => <div key={player.userId} className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"><span className="w-8 text-center font-bold">{index + 1}º</span><div className="min-w-0 flex-1"><p className="truncate font-semibold">{player.name}</p><p className="text-xs text-muted-foreground">{player.completed} {player.completed === 1 ? "fase concluída" : "fases concluídas"}</p></div><span className="font-display font-bold">{player.score} pts</span></div>)}</div>}
      </section>
    </main>
  )
}
