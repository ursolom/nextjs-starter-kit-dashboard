import config from "@/config";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };
const logOptions: Array<"query" | "info" | "warn" | "error"> =
    config.env.dev
        ? ["warn", "error"]
        : ["error"];

export const db =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: logOptions,
    });

if (config.env.prod) {
    globalForPrisma.prisma = db;
}
