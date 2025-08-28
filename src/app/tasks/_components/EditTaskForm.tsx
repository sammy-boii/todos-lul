'use client'

import { editTask } from '@/actions/tasks.actions'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { PencilLine, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { editTaskSchema } from '@/schema/task.schema'

type TEditForm = z.infer<typeof editTaskSchema>

export function EditTaskForm({ task }: { task: TEditForm }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const form = useForm<TEditForm>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: task
  })

  async function onSubmit(values: TEditForm) {
    startTransition(() => {
      ;(async () => {
        const { error } = await editTask(values)

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Task updated successfully')
          setOpen(false)
        }
      })()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-max'>
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Fill the form below to edit the task.
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
              <Button variant='outline' disabled={isPending}>
                Cancel
              </Button>
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
