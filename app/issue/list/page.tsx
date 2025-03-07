import { Table } from '@radix-ui/themes'
import { CustomLink, IssueStatusBadge } from '../../components'
import prisma from '@/prisma/client'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'

const IssuesPage = async ({
  searchParams
}: {
  searchParams: { status?: string }
}) => {
  const resolvedSearchParams = await searchParams
  const statusFilter = resolvedSearchParams?.status as Status

  const statuses = Object.values(Status)
  const status = statuses.includes(statusFilter) ? statusFilter : undefined
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: { createdAt: 'asc' }
  })

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <CustomLink href={`/issue/${issue.id}`}>
                  {issue.title}
                </CustomLink>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default IssuesPage
