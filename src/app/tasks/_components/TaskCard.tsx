'use client'
import { Task, User } from '@/generated/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { EditTaskForm } from './EditTaskForm'
import DeleteTask from './DeleteTask'
import { toggleTaskCompleted } from '@/actions/tasks.actions'
import { useTransition, useState } from 'react'
import { Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface TaskCardProps extends Task {
  author: User
}

const TaskCard = (task: TaskCardProps) => {
  const [isPending, startTransition] = useTransition()
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked
    startTransition(() => {
      ;(async () => {
        const { error } = await toggleTaskCompleted(task.id, next)
        if (error) {
          toast.error(error.message)
        } else {
          toast.success(next ? 'Marked as completed' : 'Marked as pending')
        }
      })()
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
          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
            <DialogTrigger asChild>
              <button
                className='rounded-md p-2 hover:bg-accent text-muted-foreground'
                aria-label='View details'
              >
                <Eye size={18} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='flex items-center gap-2'>
                  {task.title}
                </DialogTitle>
                <DialogDescription>
                  {task.description || 'No description.'}
                </DialogDescription>
              </DialogHeader>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                <div>
                  <div className='text-muted-foreground'>Author</div>
                  <div className='font-medium'>
                    {task.author?.name || 'Unknown'}
                  </div>
                </div>
                <div>
                  <div className='text-muted-foreground'>Status</div>
                  <div className='font-medium'>
                    {task.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
                <div>
                  <div className='text-muted-foreground'>Created</div>
                  <div className='font-medium'>
                    {new Date(task.createdAt).toDateString()}
                  </div>
                </div>
                <div>
                  <div className='text-muted-foreground'>Updated</div>
                  <div className='font-medium'>
                    {new Date(task.updatedAt).toDateString()}
                  </div>
                </div>
                <div className='sm:col-span-2'>
                  <div className='text-muted-foreground'>Slug</div>
                  <div className='font-mono text-xs break-all'>{task.slug}</div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <EditTaskForm task={task} />
          <DeleteTask id={task.id} />
        </section>
      </CardContent>
    </Card>
  )
}
export default TaskCard
