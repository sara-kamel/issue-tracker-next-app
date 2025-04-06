'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value: Status }[] = [
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' }
]
const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  return (
    <Select.Root
      value={searchParams.get('status') || 'all'}
      onValueChange={status => {
        const params = new URLSearchParams()
        if (status !== 'all' || '') params.append('status', status)
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!)

        const query = params.size ? '?' + params.toString() : ''
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
