import { getData } from '@/lib/test'

export default async function TasksLayout({
  children
}: {
  children: React.ReactNode
}) {
  const tasks = await getData()

  return <main>{children}</main>
}
