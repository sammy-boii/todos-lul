import { getTasks } from '@/actions/tasks.actions'
import OptimisticTasks from './_components/OptimisticTasks'

const TasksPage = async () => {
  const { data: tasks, error } = await getTasks()
  if (error) {
    return (
      <div className='text-red-500 text-xl text-center'>{error.message}</div>
    )
  }

  return <OptimisticTasks tasks={tasks} />
}
export default TasksPage
