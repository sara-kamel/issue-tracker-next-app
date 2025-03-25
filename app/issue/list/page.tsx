import Pagination from '@/app/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import IssueActions from './IssueActions'
import IssueTable, { columnsNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  const resolvedSearchParams = await searchParams
  const statusFilter = resolvedSearchParams?.status as Status

  const statuses = Object.values(Status)
  const status = statuses.includes(statusFilter) ? statusFilter : undefined
  const where = { status }

  const orderBy = columnsNames.includes(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: 'asc' }
    : undefined

  const page = parseInt(resolvedSearchParams.page) || 1
  const pageSize = 10

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  })
  const issueCount = await prisma.issue.count({ where })

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={resolvedSearchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  )
}
export const dynamic = 'force-dynamic'
export default IssuesPage
