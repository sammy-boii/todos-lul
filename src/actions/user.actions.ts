'use server'

import prisma from '@/lib/db'

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return { data: users }
  } catch (err) {
    return { error: 'Failed to fetch users' }
  }
}
