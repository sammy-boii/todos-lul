'use server'

import prisma from '@/lib/db'
import { tryCatch } from '@/lib/utils'

export const getUsers = async () => {
  return tryCatch(async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc'
      }
    })

    return users
  })
}
