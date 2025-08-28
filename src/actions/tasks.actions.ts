'use server'

import { createTaskSchema, editTaskSchema } from './../schema/task.schema'

import { getSession } from '@/data/user/user-dto'
import { Task } from '@/generated/prisma'
import prisma from '@/lib/db'
import { tryCatch } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const getTasks = async () => {
  return tryCatch(async () => {
    const user = await getSession()
    const tasks = await prisma.task.findMany({
      where: {
        authorId: user.id
      },
      orderBy: {
        title: 'asc'
      },
      include: {
        author: true
      }
    })
    return tasks
  }, 'fetching tasks')
}

export const createTask = async (task: Partial<Task>) => {
  return tryCatch(async () => {
    const user = await getSession()
    const parsedTask = createTaskSchema.parse(task)

    const slug = parsedTask.title.trim().toLowerCase().replace(/\s/g, '-') // simple ver

    const newTask = await prisma.task.create({
      data: {
        ...parsedTask,
        slug,
        authorId: user.id
      }
    })

    revalidatePath('/tasks')
    return newTask
  })
}

export const editTask = async (task: Partial<Task>) => {
  return tryCatch(async () => {
    await getSession()
    const { id, ...data } = editTaskSchema.parse(task)

    const editedTask = await prisma.task.update({
      where: { id },
      data
    })
    revalidatePath('/tasks')
    return editedTask
  })
}

export const deleteTask = async (id: string) => {
  return tryCatch(async () => {
    const user = await getSession()
    const task = await prisma.task.findUnique({
      where: { id }
    })
    if (task?.authorId !== user.id) {
      throw new Error('Not authorized to delete this task')
    }

    await prisma.task.delete({ where: { id } })
    revalidatePath('/tasks')
  })
}

export const toggleTaskCompleted = async (id: string, completed: boolean) => {
  return tryCatch(async () => {
    const user = await getSession()
    const task = await prisma.task.findUnique({ where: { id } })

    if (task?.authorId !== user.id) {
      throw new Error('Not authorized to update this task')
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { completed }
    })
    revalidatePath('/tasks')
    return updated
  })
}
