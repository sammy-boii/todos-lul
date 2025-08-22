import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useSession } from '@/lib/auth-client'
import { getData } from '@/lib/test'
import Link from 'next/link'

const TasksPage = async () => {
  const { data } = useSession()
  const tasks = await getData()
  return (
    <main className='grid grid-cols-3 gap-4'>
      {tasks?.map((task) => (
        <Link href={`/tasks/${task.id}`} key={task.id}>
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent className='max-w-md'>
              <p>{task.description}</p>
            </CardContent>
            <CardFooter>
              {task.completed ? (
                <div>
                  <Badge variant='default'>Completed</Badge>
                </div>
              ) : (
                <div>
                  <Badge variant='destructive'>Not Completed</Badge>
                </div>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </main>
  )
}
export default TasksPage
