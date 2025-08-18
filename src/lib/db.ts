import { PrismaClient } from '@/generated/prisma'

// ensuring a singleton instance of PrismaClient during hot reloading (dev)

const prismaSingleton = () =>
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'minimal'
  })

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaSingleton>
}

// const globalForPrisma = global as unknown as {
//   prisma?: PrismaClient
// }

const prisma = globalThis.prismaGlobal ?? prismaSingleton()

export default prisma

// no need for prod as serverless short connections are handled automatically

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
