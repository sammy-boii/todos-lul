'use client'

import { createTask } from '@/actions/tasks.actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { createTaskSchema } from '@/schema/task.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'

type TCreateForm = z.infer<typeof createTaskSchema>

export function CreateTaskForm() {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<TCreateForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {}
  })

  async function onSubmit(task: TCreateForm) {
    startTransition(() => {
      ;(async () => {
        const { error } = await createTask(task)

        if (error) {
          toast.error(error.message)
          return
        }
        toast.success('Task created successfully')
        form.reset({ title: '', description: '' })
        setOpen(false)
      })()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='mb-4'>
          Create Task
          <Plus size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Fill the form below to create the task.
            </DialogDescription>
          </DialogHeader>

          {/* Title Field */}
          <div className='flex flex-col gap-1'>
            <input
              type='text'
              placeholder='Title'
              {...form.register('title')}
              className='border p-2 rounded'
            />
            {form.formState.errors.title && (
              <span className='text-red-500 text-sm'>
                {form.formState.errors.title.message}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className='flex flex-col gap-1'>
            <textarea
              placeholder='Description'
              {...form.register('description')}
              className='border p-2 rounded'
            />
            {form.formState.errors.description && (
              <span className='text-red-500 text-sm'>
                {form.formState.errors.description.message}
              </span>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
