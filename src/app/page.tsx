import { getUsers } from '@/actions/user.actions'
import { Badge } from '@/components/ui/badge'

const Home = async () => {
  const { data: users } = await getUsers()
  if (!users) {
    return (
      <h2 className='text-center text-2xl font-bold text-red-500'>
        Failed to fetch users
      </h2>
    )
  }
  return (
    <table className='mt-6 max-w-[95vw] w-full mx-auto border-collapse'>
      <thead className='bg-muted font-bold'>
        <tr>
          <th className='px-6 py-2 text-left'>ID</th>
          <th className='px-6 py-2 text-left'>Name</th>
          <th className='px-6 py-2 text-left'>Email</th>
          <th className='px-6 py-2 text-right'>Role</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id} className='border-t'>
            <td className='px-6 py-2'>{user.id.slice(0, 6)}</td>
            <td className='px-6 py-2'>{user.name}</td>
            <td className='px-6 py-2'>{user.email}</td>
            <td className='px-4 py-2 text-right'>
              <Badge
                variant={user.role === 'ADMIN' ? 'destructive' : 'secondary'}
              >
                {user.role}
              </Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Home
