'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const statuses: { label: string; value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]
const IssueStatusFilter = () => {
  const router = useRouter()
  // const [currentStatus, setCurrentStatus] = useState('')
  return (
    <Select.Root
      // defaultValue={currentStatus}
      onValueChange={status => {
        const query = status === 'all' ? '' : `?status=${status}`
        router.push(`/issue/list${query}`)
      }}
    >
      <Select.Trigger placeholder='Filter By status...' />
      <Select.Content>
        <Select.Item value='all'>All</Select.Item>
        {statuses.map(status => (
          <Select.Item key={status.label} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
