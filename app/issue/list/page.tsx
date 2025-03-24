import { Table } from '@radix-ui/themes'
import { CustomLink, IssueStatusBadge } from '../../components'
import prisma from '@/prisma/client'
import IssueActions from './IssueActions'
import { Status, Issue } from '@prisma/client'
import Link from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import Pagination from '@/app/components/Pagination'

const IssuesPage = async ({
  searchParams
}: {
  searchParams: {
    status?: string
    orderBy: keyof Issue
    page: string
  }
}) => {
  const columns: {
    label: string
    value: keyof Issue
    className?: string
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Statues', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
  ]
  const resolvedSearchParams = await searchParams
  const statusFilter = resolvedSearchParams?.status as Status

  const statuses = Object.values(Status)
  const status = statuses.includes(statusFilter) ? statusFilter : undefined
  const where = { status }
  const columsValues = columns.map(column => column.value)
  const orderBy = columsValues.includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })
  const issueCount = await prisma.issue.count({ where })

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(column => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <Link
                  href={{
                    query: { ...resolvedSearchParams, orderBy: column.value }
                  }}
                >
                  {column.label}
                </Link>
                {column.value === resolvedSearchParams.orderBy && (
                  <ArrowUpIcon className='inline' />
                )}
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  )
}
export const dynamic = 'force-dynamic'
export default IssuesPage
