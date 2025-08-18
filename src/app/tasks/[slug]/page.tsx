import prisma from '@/lib/db'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

const TaskPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const task = await prisma.task.findUnique({
    where: {
      id: Number(slug)
    }
  })
  return (
    <main>
      <Link href='/tasks'> Back </Link>
      {task ? (
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
      ) : (
        <div>No task found. </div>
      )}
    </main>
  )
}
export default TaskPage
