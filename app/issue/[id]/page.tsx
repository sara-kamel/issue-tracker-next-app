import { IssueStatusBadge } from '@/app/components'
import prisma from '@/prisma/client'
import { Card, Flex, Grid, Heading, Text, Box, Button } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
  params: { id: string }
}
const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })

  if (!issue) {
    notFound()
  }

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='4'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap='2' my='2'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.creatAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  )
}

export default IssueDetailPage
