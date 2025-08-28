'use client'

import { Task, User } from '@/generated/prisma'
import { CreateTaskForm } from './CreateTaskForm'
import TaskCard from './TaskCard'
import { useOptimistic } from 'react'
import { TaskWithAuthor } from '@/types/task.types'

export type ActionType =
  | {
      type: 'add'
      newTask: Partial<Task>
    }
  | {
      type: 'edit'
      id: string
      updates: Partial<TaskWithAuthor>
    }
  | {
      type: 'delete'
      id: string
    }

const OptimisticTasks = ({ tasks }: { tasks: TaskWithAuthor[] }) => {
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (currentTasks, action: ActionType) => {
      switch (action.type) {
        case 'add':
          return [...currentTasks, action.newTask as TaskWithAuthor]

        case 'edit':
          return currentTasks.map((t) =>
            t.id === action.id ? { ...t, ...action.updates } : t
          )

        case 'delete':
          return currentTasks.filter((t) => t.id != action.id)

        default:
          return currentTasks
      }
    }
  )

  return (
    <main>
      <CreateTaskForm setOptimisticTasks={setOptimisticTasks} />
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {optimisticTasks.length === 0 ? (
          <div className='text-muted-foreground text-lg text-center'>
            No tasks found
          </div>
        ) : (
          optimisticTasks.map((task) => (
            <TaskCard
              task={task}
              setOptimisticTasks={setOptimisticTasks}
              key={task.id}
            />
          ))
        )}
      </div>
    </main>
  )
}
export default OptimisticTasks
