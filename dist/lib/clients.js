"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new client_1.PrismaClient();
exports.default = prisma;
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
//# sourceMappingURL=clients.js.map