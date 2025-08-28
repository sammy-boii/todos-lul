import { Prisma } from '@/generated/prisma'

export type TaskWithAuthor = Prisma.TaskGetPayload<{
  include: { author: true }
}>
