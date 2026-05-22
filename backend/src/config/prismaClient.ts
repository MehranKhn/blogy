import { Context } from "hono";
import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma:
  | ReturnType<typeof createPrismaClient>
  | undefined;

const createPrismaClient = (databaseUrl: string) => {
  return new PrismaClient({
    accelerateUrl: databaseUrl,
  }).$extends(withAccelerate());
};

export const getPrisma = (c: Context) => {
  if (!prisma) {
    const dbUrl = c.env.DATABASE_URL;
    if (!dbUrl) throw new Error("DATABASE_URL not set");
    prisma = createPrismaClient(dbUrl);
  }

  return prisma;
};