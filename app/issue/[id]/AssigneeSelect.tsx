'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '../../components'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(req => req.data),
    staleTime: 60 * 1000,
    retry: 3
  })

  if (isLoading) return <Skeleton />
  if (error) return null

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || 'no user'}
      onValueChange={userId => {
        console.log('Updating issue:', { id: issue.id, userId })
        if (userId === 'no user') {
          axios.patch(`/api/issue/${issue.id}`, { assignedToUserId: null })
        } else {
          axios.patch(`/api/issue/${issue.id}`, { assignedToUserId: userId })
        }
      }}
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
  )
}

export default AssigneeSelect
