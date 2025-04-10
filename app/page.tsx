export const dynamic = 'force-dynamic';
import prisma from '@/prisma/client'
import IssueSummery from './IssueSummery'
import LatestIssues from './LatestIssues'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home () {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' }
  })
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' }
  })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' }
  })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummery open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
