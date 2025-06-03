import { db } from "@/src/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),

  user: {
    modelName: "usersTable",
  },
  account: {
    modelName: "accountTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
});
