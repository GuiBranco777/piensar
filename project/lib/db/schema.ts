import { pgTable, text, timestamp, boolean, serial, integer } from "drizzle-orm/pg-core"

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// --- App tables ------------------------------------------------------------

// Cada tarefa concluída (uma rodada completa de um jogo).
export const completion = pgTable("completion", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  gameId: text("gameId").notNull(),
  difficulty: text("difficulty").notNull(),
  stars: integer("stars").notNull().default(0),
  correct: integer("correct").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

// Grupos (turmas) que as crianças podem criar e entrar.
export const group = pgTable("group", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  createdBy: text("createdBy").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

// Associação usuário <-> grupo.
export const groupMember = pgTable("groupMember", {
  id: serial("id").primaryKey(),
  groupId: integer("groupId").notNull(),
  userId: text("userId").notNull(),
  joinedAt: timestamp("joinedAt").notNull().defaultNow(),
})
