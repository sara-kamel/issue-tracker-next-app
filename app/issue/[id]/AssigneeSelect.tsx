'use client'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '../../components'
import toast, { Toaster } from 'react-hot-toast'

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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'no user'}
        // onValueChange={async userId => {
        //   try {
        //     if (userId === 'no user') {
        //       await axios.patch(`/xapi/issue/${issue.id}`, {
        //         assignedToUserId: null
        //       })
        //     } else {
        //       await axios.patch(`/xapi/issue/${issue.id}`, {
        //         assignedToUserId: userId
        //       })
        //     }
        //   } catch (error) {
        //     toast.error('Changes Could not be saved')
        //   }
        // }}
        onValueChange={async userId => {
          try {
            await axios.patch(`/api/issue/${issue.id}`, {
              assignedToUserId: userId === 'no user' ? null : userId
            })
          } catch (error) {
            toast.error('Changes could not be saved')
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
      <Toaster />
    </>
  )
}

export default AssigneeSelect
