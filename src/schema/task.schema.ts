import z from 'zod'

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().optional().nullable()
})

export const editTaskSchema = createTaskSchema.extend({
  id: z.string().trim().min(1)
})
