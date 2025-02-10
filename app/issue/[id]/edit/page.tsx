import { notFound } from 'next/navigation'
import prisma from '@/prisma/client'
import DynamicIssueForm from '../../_components/DynamicIssueForm'

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue) notFound()
  return <DynamicIssueForm issue={issue} />
}

export default EditIssuePage
