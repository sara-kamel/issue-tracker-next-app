'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Skeleton } from '../../components'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers()

  if (isLoading) return <Skeleton />
  if (error) return null
  const assigneIssue = (userId: string) => {
    axios
      .patch(`/api/issue/${issue.id}`, {
        assignedToUserId: userId === 'no user' ? null : userId
      })
      .catch(() => {
        toast.error('Changes could not be saved')
      })
  }
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'no user'}
        onValueChange={assigneIssue}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={'no user'}>Unassigned</Select.Item>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}
const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(req => req.data),
    staleTime: 60 * 1000,
    retry: 3
  })

export default AssigneeSelect
