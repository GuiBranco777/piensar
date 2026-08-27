"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calculator, Sparkles, Star, Rocket } from "lucide-react"

type LoginScreenProps = {
  onLogin: (name: string) => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length === 0) return
    onLogin(trimmed)
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
              5 jogos para explorar
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
            <h1 className="font-display text-3xl font-bold text-foreground">Olá! Qual é o seu nome?</h1>
            <p className="leading-relaxed text-muted-foreground">
              Digite seu primeiro nome para entrar e brincar de aprender.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Seu nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Ana, Pedro, Bia..."
                autoComplete="off"
                autoFocus
                maxLength={24}
                className="w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={name.trim().length === 0}
              className="h-12 w-full rounded-2xl text-lg font-bold"
            >
              Entrar para brincar
            </Button>
          </form>

          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Não pedimos senha nem dados pessoais. É só o seu nome para deixar tudo mais divertido!
          </p>
        </section>
      </div>
    </main>
  )
}
