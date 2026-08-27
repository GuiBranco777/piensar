"use client"

import { Button } from "@/components/ui/button"
import { Calculator, LogOut, Menu, Star } from "lucide-react"

type SiteHeaderProps = {
  userName: string | null
  stars: number
  onLogout: () => void
  onLoginClick: () => void
  onToggleSidebar: () => void
}

export function SiteHeader({ userName, stars, onLogout, onLoginClick, onToggleSidebar }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-2">
        {userName && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Abrir menu de jogos"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        )}

        {/* Espaço para a logo */}
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Calculator className="size-5" aria-hidden="true" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">Piensar</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {userName ? (
          <>
            <div className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground">
              <Star className="size-4 fill-current" aria-hidden="true" />
              <span>{stars}</span>
              <span className="sr-only">estrelas conquistadas</span>
            </div>
            <span className="hidden text-sm font-semibold text-foreground sm:inline">Oi, {userName}!</span>
            <Button variant="outline" onClick={onLogout} className="rounded-xl bg-transparent" size="sm">
              <LogOut className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </>
        ) : (
          <Button onClick={onLoginClick} className="rounded-xl font-bold">
            Entrar
          </Button>
        )}
      </div>
    </header>
  )
}
