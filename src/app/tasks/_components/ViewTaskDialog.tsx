'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { TaskWithAuthor } from '@/types/task.types'
import { Eye } from 'lucide-react'
import { useState } from 'react'
import { ActionType } from './OptimisticTasks'

interface ViewTaskDialogProps {
  task: TaskWithAuthor
}

const ViewTaskDialog = ({ task }: ViewTaskDialogProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
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
            <div className='font-medium'>{task.author?.name || 'Unknown'}</div>
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
  )
}
export default ViewTaskDialog
