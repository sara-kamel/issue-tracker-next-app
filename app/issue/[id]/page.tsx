import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

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
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.creatAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailPage
