'use server'

import prisma from '@/lib/db'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { data: users }
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message
      }
    }
    return {
      error: 'Failed to fetch users'
    }
  }
}
