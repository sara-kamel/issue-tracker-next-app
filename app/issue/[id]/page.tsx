import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'
import type { Metadata } from 'next'

type Params = Promise<{ id: string }>

const fetchUser = cache((userId: number) =>
  prisma.issue.findUnique({ where: { id: userId } })
)

const IssueDetailPage = async ({ params }: { params: Params }) => {
  const session = await getServerSession(authOptions)
  const { id } = await params
  const issue = await fetchUser(parseInt(id))

  if (!issue) {
    notFound()
  }

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='4'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex gap='4' direction='column'>
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  )
}

type MetaDataProps = {
  params: Promise<{ id: string }>
}
export async function generateMetadata ({
  params
}: MetaDataProps): Promise<Metadata> {
  const { id } = await params
  const issue = await fetchUser(parseInt(id))
  return {
    title: 'Issue Tracker - ' + issue?.title,
    description: 'Details of issue' + issue?.id
  }
}
export default IssueDetailPage
