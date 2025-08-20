'use server'

import db from '@/lib/db'

export async function getData() {
  const data = await db.task.findMany()
  return data
}
