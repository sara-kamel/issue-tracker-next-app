import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import DynamicIssueForm from '../../_components/DynamicIssueForm'

type Params = Promise<{ id: string }>
const EditIssuePage = async ({ params }: { params: Params }) => {
  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) notFound()
  return <DynamicIssueForm issue={issue} />
}

export default EditIssuePage
