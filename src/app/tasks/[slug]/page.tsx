import { getTask } from '@/actions/tasks.actions'
import { Badge } from '@/components/ui/badge'

const TaskPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const { data: task, error } = await getTask(slug)
  if (error || !task) {
    return <div>{error?.message || 'No task found'}</div>
  }

  return (
    <div className='border rounded-lg p-4 shadow-md'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>{task.title}</h2>
        <p className='text-sm text-muted-foreground'>
          {task.description || 'No description.'}
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
        <div>
          <div className='text-muted-foreground'>Author</div>
          <div className='font-medium'>{task.author?.name || 'Unknown'}</div>
        </div>

        <div>
          <div className='text-muted-foreground'>Status</div>
          <div className='font-medium'>
            <Badge
              data-completed={task.completed}
              className='bg-green-500 mt-1 text-white shrink-0 data-[completed=false]:bg-yellow-500'
            >
              {task.completed ? 'Completed' : 'Pending'}
            </Badge>
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
    </div>
  )
}
export default TaskPage
