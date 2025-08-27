'use server'

import { getCurrentUser } from '@/data/user/user-dto'
import { Task } from '@/generated/prisma'
import prisma from '@/lib/db'

type Response<T> = {
  data: T
}

type Error<T> = {
  error: string
}

type Result<T> = Response<T> | Error<T>

export async function getTasks(): Promise<Result<Task[]>> {
  try {
    const user = await getCurrentUser()
    const tasks = await prisma.task.findMany({
      where: {
        authorId: user.id
      }
    })

    return { data: tasks }
  } catch (err) {
    return {
      error: 'Error fetching data'
    }
  }
}
