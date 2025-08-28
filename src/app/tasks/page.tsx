import { getTasks } from '@/actions/tasks.actions'
import TaskCard from './_components/TaskCard'
import { CreateTaskForm } from './_components/CreateTaskForm'

const TasksPage = async () => {
  const { data: tasks, error } = await getTasks()
  if (error) {
    return (
      <div className='text-red-500 text-xl text-center'>{error.message}</div>
    )
  }

  return (
    <main>
      <CreateTaskForm />
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {tasks.length === 0 ? (
          <div className='text-muted-foreground text-lg text-center'>
            No tasks found
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} {...task} />)
        )}
      </div>
    </main>
  )
}
export default TasksPage
