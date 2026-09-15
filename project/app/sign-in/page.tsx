import { redirect, headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { SignInForm } from '@/components/auth/sign-in-form'

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (session?.user) {
    redirect('/')
  }
  
  return (
    <main className="flex min-h-dvh items-center justify-center p-4">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-4xl border border-border bg-card shadow-xl md:grid-cols-2">
        {/* Lado ilustrativo */}
        <section className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground md:flex">
          <div className="flex items-center gap-2">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary-foreground/15">
              <span className="font-display text-xl font-bold">π</span>
            </div>
            <span className="font-display text-2xl font-bold">Piensar</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-balance font-display text-3xl font-bold leading-tight">
              Bem-vindo de volta!
            </h2>
            <p className="text-pretty leading-relaxed text-primary-foreground/80">
              Entre com suas credenciais para continuar resolvendo desafios e competindo com seu grupo.
            </p>
          </div>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-xs font-bold">✓</span>
              Seus dados são seguros
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-xs font-bold">✓</span>
              Acesso em qualquer dispositivo
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-xs font-bold">✓</span>
              Histórico de pontuação preservado
            </li>
          </ul>
        </section>

        {/* Lado do formulário */}
        <section className="flex flex-col justify-center gap-6 p-8 md:p-10">
          <SignInForm />
        </section>
      </div>
    </main>
  )
}
