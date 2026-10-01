"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { groupMembers, groups, users, completions } from "@/lib/db/schema"
import { and, desc, eq, sql } from "drizzle-orm"
import { headers } from "next/headers"

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Não autorizado")
  return session.user.id
}

export async function createGroup(name: string) {
  const userId = await getUserId()
  const currentMembership = await db.select({ id: groupMembers.id }).from(groupMembers).where(eq(groupMembers.userId, userId)).limit(1)
  if (currentMembership.length > 0) throw new Error("Você já participa de um clã. Saia dele antes de criar outro.")
  const cleanName = name.trim().slice(0, 60)
  if (cleanName.length < 3) throw new Error("O nome precisa ter pelo menos 3 caracteres.")
  const code = `${cleanName.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`
  const [group] = await db.insert(groups).values({ name: cleanName, code, createdBy: userId, createdAt: new Date() }).returning()
  await db.insert(groupMembers).values({ groupId: group.id, userId, joinedAt: new Date() })
  return group
}

export async function joinGroup(code: string) {
  const userId = await getUserId()
  const [group] = await db.select().from(groups).where(eq(groups.code, code.trim().toUpperCase())).limit(1)
  if (!group) throw new Error("Código de grupo não encontrado.")
  const currentMembership = await db.select({ id: groupMembers.id }).from(groupMembers).where(eq(groupMembers.userId, userId)).limit(1)
  if (currentMembership.length > 0) throw new Error("Você já participa de um clã. Saia dele antes de entrar em outro.")
  await db.insert(groupMembers).values({ groupId: group.id, userId, joinedAt: new Date() }).onConflictDoNothing()
  return group
}

export async function recordCompletion(gameId: string, stars: number) {
  const userId = await getUserId()
  const existing = await db.select({ id: completions.id }).from(completions).where(and(eq(completions.userId, userId), eq(completions.gameId, gameId))).limit(1)
  if (existing.length > 0) return { recorded: false }
  await db.insert(completions).values({ userId, gameId, stars, correct: 1, createdAt: new Date() })
  const membership = await db.select({ groupId: groupMembers.groupId }).from(groupMembers).where(eq(groupMembers.userId, userId)).limit(1)
  return { recorded: true, groupId: membership[0]?.groupId ?? null }
}

export async function leaveGroup(groupId: number) {
  const userId = await getUserId()
  await db.delete(groupMembers).where(and(eq(groupMembers.groupId, groupId), eq(groupMembers.userId, userId)))
  return { left: true }
}

export async function getUserProgress() {
  const userId = await getUserId()
  return db.select({ gameId: completions.gameId, stars: completions.stars, createdAt: completions.createdAt })
    .from(completions)
    .where(eq(completions.userId, userId))
    .orderBy(desc(completions.createdAt))
}

export async function getCompetitionData() {
  const userId = await getUserId()
  const memberships = await db.select({ group: groups }).from(groupMembers).innerJoin(groups, eq(groupMembers.groupId, groups.id)).where(eq(groupMembers.userId, userId))
  const memberRows = await db.select({ groupId: groupMembers.groupId, userId: groupMembers.userId, name: users.name, score: sql<number>`coalesce(sum(${completions.stars}), 0)` }).from(groupMembers).innerJoin(users, eq(groupMembers.userId, users.id)).leftJoin(completions, eq(groupMembers.userId, completions.userId)).groupBy(groupMembers.groupId, groupMembers.userId, users.name).orderBy(desc(sql`coalesce(sum(${completions.stars}), 0)`))
  const groupRows = await db.select({ groupId: groupMembers.groupId, name: groups.name, code: groups.code, score: sql<number>`coalesce(sum(${completions.stars}), 0)` }).from(groupMembers).innerJoin(groups, eq(groupMembers.groupId, groups.id)).leftJoin(completions, eq(groupMembers.userId, completions.userId)).groupBy(groupMembers.groupId, groups.name, groups.code).orderBy(desc(sql`coalesce(sum(${completions.stars}), 0)`))
  return { memberships, memberRows, groupRows }
}
