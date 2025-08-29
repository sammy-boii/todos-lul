import { getTasks, getTasksForRQ } from '@/actions/tasks.actions'
import Test from '@/components/Test'

const TestPage = async () => {
  const data = await getTasksForRQ()
  if (!Array.isArray(data)) {
    return <div>{data.message}</div>
  }
  return (
    <div>
      <Test tasks={data} />
    </div>
  )
}
export default TestPage
