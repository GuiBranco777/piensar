'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(''); setLoading(true)
    const result = await authClient.signIn.email({ email, password })
    setLoading(false)
    if (result.error) { setError('Não foi possível entrar. Confira seus dados.'); return }
    router.push('/'); router.refresh()
  }

  return <form onSubmit={submit} className="flex flex-col gap-5">
    <div><p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Piensar</p><h1 className="mt-2 font-display text-3xl font-bold">Entrar na sua conta</h1><p className="mt-2 text-muted-foreground">Continue seus desafios e acompanhe seu grupo.</p></div>
    <label className="flex flex-col gap-2 text-sm font-semibold">E-mail<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-2xl border-2 border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label>
    <label className="flex flex-col gap-2 text-sm font-semibold">Senha<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-2xl border-2 border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button disabled={loading} className="h-12 rounded-2xl text-base font-bold">{loading ? 'Entrando...' : 'Entrar'}</Button>
    <p className="text-center text-sm text-muted-foreground">Ainda não tem conta? <a href="/sign-up" className="font-bold text-primary hover:underline">Criar conta</a></p>
  </form>
}

export default SignInForm

export function SignUpForm() {
  const router = useRouter(); const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  async function submit(event: React.FormEvent) { event.preventDefault(); setError(''); setLoading(true); const result = await authClient.signUp.email({ name, email, password }); setLoading(false); if (result.error) { setError('Não foi possível criar a conta. Verifique os dados.'); return }; router.push('/'); router.refresh() }
  return <form onSubmit={submit} className="flex flex-col gap-5"><div><p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Piensar</p><h1 className="mt-2 font-display text-3xl font-bold">Criar sua conta</h1><p className="mt-2 text-muted-foreground">Entre em um grupo e dispute o ranking.</p></div><label className="flex flex-col gap-2 text-sm font-semibold">Nome<input required maxLength={60} value={name} onChange={e => setName(e.target.value)} className="rounded-2xl border-2 border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="flex flex-col gap-2 text-sm font-semibold">E-mail<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="rounded-2xl border-2 border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label><label className="flex flex-col gap-2 text-sm font-semibold">Senha<input required minLength={8} type="password" value={password} onChange={e => setPassword(e.target.value)} className="rounded-2xl border-2 border-input bg-background px-4 py-3 font-normal outline-none focus:border-primary" /></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button disabled={loading} className="h-12 rounded-2xl text-base font-bold">{loading ? 'Criando...' : 'Criar conta'}</Button><p className="text-center text-sm text-muted-foreground">Já tem conta? <a href="/sign-in" className="font-bold text-primary hover:underline">Entrar</a></p></form>
}
