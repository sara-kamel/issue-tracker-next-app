import authOptions from '@/app/auth/authOptions'
import { PatchIssueSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

type tParams = Promise<{ id: string }>

export async function PATCH (request: NextRequest, props: { params: tParams }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const validation = PatchIssueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  const { assignedToUserId, title, description } = await body
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId }
    })
    if (!user)
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 })
  }
  const { id } = await props.params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    }
  })
  return NextResponse.json(updatedIssue)
}

export async function DELETE (request: NextRequest, props: { params: tParams }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, { status: 401 })
  const { id } = await props.params
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) }
  })
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 404 })

  await prisma.issue.delete({
    where: { id: issue.id }
  })
  return NextResponse.json({})
}
