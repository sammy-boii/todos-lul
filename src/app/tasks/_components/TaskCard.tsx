'use client'
import { Task, User } from '@/generated/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EditTaskForm } from './EditTaskForm'
import DeleteTask from './DeleteTask'
import { toggleTaskCompleted } from '@/actions/tasks.actions'
import { useTransition } from 'react'

import { toast } from 'sonner'
import { ActionType } from './OptimisticTasks'
import ViewTaskDialog from './ViewTaskDialog'
import { TaskWithAuthor } from '@/types/task.types'

interface TaskCardProps {
  task: TaskWithAuthor
  setOptimisticTasks: (action: ActionType) => void
}

const TaskCard = ({ setOptimisticTasks, task }: TaskCardProps) => {
  const [isPending, startTransition] = useTransition()

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked
    startTransition(async () => {
      setOptimisticTasks({
        type: 'edit',
        id: task.id,
        updates: {
          completed: next
        }
      })
      const { error } = await toggleTaskCompleted(task.id, next)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success(next ? 'Marked as completed' : 'Marked as pending')
      }
    })
  }

  return (
    <Card className='hover:shadow-md duration-300 border-muted max-w-xl w-full mx-auto'>
      <CardContent className='relative flex flex-col gap-4 p-5'>
        <section className='flex justify-between items-start gap-4'>
          <div className='flex items-start gap-3 min-w-0'>
            <input
              type='checkbox'
              defaultChecked={task.completed}
              onChange={handleToggle}
              disabled={isPending}
              className='mt-1 h-4 w-4 accent-primary'
              aria-label='Toggle completed'
            />
            <div className='min-w-0'>
              <div className='font-semibold truncate'>{task.title}</div>
              <p className='text-muted-foreground text-sm line-clamp-2'>
                {task.description}
              </p>
            </div>
          </div>
          <Badge
            data-completed={task.completed}
            className='bg-green-500 text-white shrink-0 data-[completed=false]:bg-yellow-500'
          >
            {task.completed ? 'Completed' : 'Pending'}
          </Badge>
        </section>

        <section className='flex items-center gap-2 ml-auto'>
          <ViewTaskDialog task={task} />
          <EditTaskForm setOptimisticTasks={setOptimisticTasks} task={task} />
          <DeleteTask setOptimisticTasks={setOptimisticTasks} id={task.id} />
        </section>
      </CardContent>
    </Card>
  )
}
export default TaskCard
