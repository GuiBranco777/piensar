'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { group, groupMember, completion } from '@/lib/db/schema'
import { eq, inArray } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function createGroup(name: string) {
  const userId = await getUserId()
  
  const code = Math.random().toString(36).substring(2, 8).toUpperCase()
  
  const result = await db
    .insert(group)
    .values({
      name,
      code,
      createdBy: userId,
    })
    .returning({ id: group.id })
  
  const groupId = result[0].id
  
  await db.insert(groupMember).values({
    groupId,
    userId,
  })
  
  revalidatePath('/')
  return { id: groupId, code }
}

export async function joinGroup(code: string) {
  const userId = await getUserId()
  
  const groupData = await db
    .select()
    .from(group)
    .where(eq(group.code, code))
    .limit(1)
  
  if (!groupData.length) {
    throw new Error('Grupo não encontrado')
  }
  
  const groupId = groupData[0].id
  
  // Verificar se já é membro
  const existing = await db
    .select()
    .from(groupMember)
    .where(eq(groupMember.userId, userId))
  
  const alreadyMember = existing.some(m => m.groupId === groupId)
  if (alreadyMember) {
    throw new Error('Você já é membro deste grupo')
  }
  
  await db.insert(groupMember).values({
    groupId,
    userId,
  })
  
  revalidatePath('/')
  return groupId
}

export async function getUserGroups() {
  const userId = await getUserId()
  
  const userGroups = await db
    .select()
    .from(groupMember)
    .where(eq(groupMember.userId, userId))
  
  const groupIds = userGroups.map(m => m.groupId)
  
  if (groupIds.length === 0) return []
  
  const groups = await db
    .select()
    .from(group)
    .where(inArray(group.id, groupIds))
  
  return groups
}

export async function getGroupMembers(groupId: number) {
  const members = await db
    .select()
    .from(groupMember)
    .where(eq(groupMember.groupId, groupId))
  
  return members
}

export async function recordCompletion(gameId: string, stars: number) {
  const userId = await getUserId()
  
  await db.insert(completion).values({
    userId,
    gameId,
    difficulty: 'medium',
    stars,
    correct: 1,
  })
  
  revalidatePath('/')
}

export async function getUserScore(userId: string) {
  const completions = await db
    .select()
    .from(completion)
    .where(eq(completion.userId, userId))
  
  const total = completions.reduce((sum, c) => sum + c.stars, 0)
  return total
}

export async function getGroupRanking(groupId: number) {
  const members = await db
    .select()
    .from(groupMember)
    .where(eq(groupMember.groupId, groupId))
  
  const ranking = await Promise.all(
    members.map(async (member) => {
      const score = await getUserScore(member.userId)
      return { userId: member.userId, score, joinedAt: member.joinedAt }
    })
  )
  
  return ranking.sort((a, b) => b.score - a.score)
}

export async function getAllGroupsRanking() {
  const allGroups = await db.select().from(group)
  
  const groupsWithScores = await Promise.all(
    allGroups.map(async (g) => {
      const ranking = await getGroupRanking(g.id)
      const totalScore = ranking.reduce((sum, r) => sum + r.score, 0)
      return { id: g.id, name: g.name, score: totalScore, members: ranking.length }
    })
  )
  
  return groupsWithScores.sort((a, b) => b.score - a.score)
}

export async function getUserSession() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user
}
