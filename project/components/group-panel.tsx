'use client'

import { useEffect, useState } from 'react'
import { createGroup, joinGroup, getUserGroups } from '@/app/actions/groups'
import { Button } from '@/components/ui/button'

export function GroupPanel() {
  const [groups, setGroups] = useState<Array<{id:number; name:string; code:string}>>([])
  const [name, setName] = useState(''); const [code, setCode] = useState(''); const [message, setMessage] = useState('')
  async function load() { try { setGroups(await getUserGroups()) } catch {} }
  useEffect(() => { load() }, [])
  async function create() { if (!name.trim()) return; try { await createGroup(name.trim()); setName(''); setMessage('Grupo criado! Compartilhe o código com seus colegas.'); load() } catch { setMessage('Não foi possível criar o grupo.') } }
  async function join() { if (!code.trim()) return; try { await joinGroup(code.trim().toUpperCase()); setCode(''); setMessage('Você entrou no grupo!'); load() } catch (error) { setMessage(error instanceof Error ? error.message : 'Código inválido.') } }
  return <section className="rounded-4xl border border-border bg-card p-6 shadow-sm"><div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Meus grupos</p><h2 className="mt-1 font-display text-2xl font-bold">Crie ou entre em uma turma</h2></div><p className="text-sm text-muted-foreground">O ranking é atualizado com os pontos reais.</p></div><div className="mt-5 grid gap-3 md:grid-cols-2"><div className="flex gap-2"><input aria-label="Nome do novo grupo" value={name} onChange={e=>setName(e.target.value)} placeholder="Nome do grupo" className="min-w-0 flex-1 rounded-2xl border-2 border-input bg-background px-4 py-2 outline-none focus:border-primary" /><Button onClick={create}>Criar</Button></div><div className="flex gap-2"><input aria-label="Código do grupo" value={code} onChange={e=>setCode(e.target.value)} placeholder="Código de convite" className="min-w-0 flex-1 rounded-2xl border-2 border-input bg-background px-4 py-2 uppercase outline-none focus:border-primary" /><Button variant="outline" onClick={join}>Entrar</Button></div></div>{message && <p className="mt-3 text-sm font-semibold text-primary">{message}</p>}<div className="mt-5 flex flex-wrap gap-3">{groups.map(g=><div key={g.id} className="rounded-2xl bg-muted px-4 py-3"><p className="font-bold">{g.name}</p><p className="text-sm text-muted-foreground">Código: <strong>{g.code}</strong></p></div>)}{groups.length===0 && <p className="text-sm text-muted-foreground">Você ainda não participa de nenhum grupo.</p>}</div></section>
}
