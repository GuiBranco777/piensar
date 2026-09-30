import { integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core"

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
})

export const groups = pgTable("group", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  createdBy: text("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull(),
})

export const groupMembers = pgTable("groupMember", {
  id: serial("id").primaryKey(),
  groupId: integer("groupId").notNull(),
  userId: text("userId").notNull(),
  joinedAt: timestamp("joinedAt").notNull(),
}, (table) => ({ membership: unique().on(table.groupId, table.userId) }))

export const completions = pgTable("completion", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  gameId: text("gameId").notNull(),
  stars: integer("stars").notNull(),
  correct: integer("correct").notNull(),
  createdAt: timestamp("createdAt").notNull(),
})
