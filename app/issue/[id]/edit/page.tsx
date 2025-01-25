import { notFound } from 'next/navigation'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'

interface Props {
  params: { id: string }
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) notFound()
  return <IssueForm issue={issue} />
}

export default EditIssuePage
