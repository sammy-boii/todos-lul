'use client'

import { getTasksForRQ } from '@/actions/tasks.actions'
import { Result } from '@/types'
import { TaskWithAuthor } from '@/types/task.types'
import { useQuery } from '@tanstack/react-query'

const Test = ({ tasks }: { tasks: TaskWithAuthor[] }) => {
  const { data, error } = useQuery({
    queryFn: getTasksForRQ,
    queryKey: ['tasks'],
    staleTime: 1000 * 5,
    initialData: tasks
  })

  if (!Array.isArray(data)) {
    return <div>{data.message}</div>
  }

  return (
    <div>
      {data.map((t) => (
        <pre key={t.id}>{JSON.stringify(t)}</pre>
      ))}
    </div>
  )
}
export default Test
