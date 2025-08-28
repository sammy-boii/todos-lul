'use client'
import { deleteTask } from '@/actions/tasks.actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { ActionType } from './OptimisticTasks'

interface DeleteTaskProps {
  id: string
  setOptimisticTasks: (action: ActionType) => void
}

const DeleteTask = ({ id, setOptimisticTasks }: DeleteTaskProps) => {
  const [isPending, startTransition] = useTransition()

  async function onSubmit(id: string) {
    startTransition(async () => {
      setOptimisticTasks({
        type: 'delete',
        id
      })
      const { error } = await deleteTask(id)

      if (error) {
        toast.error(error.message)
      } else {
      }
    })

    toast.success('Task deleted successfully')
  }

  const handleSubmit = onSubmit.bind(null, id)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your task
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='w-18' disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='w-18'
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <Loader2 className='animate-spin' /> : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteTask
