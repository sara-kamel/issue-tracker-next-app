import { issueSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH (
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  })
  if (!issue) {
    return NextResponse.json({ error: 'invaild issue' }, { status: 404 })
  }
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: body.title, description: body.description }
  })
  return NextResponse.json(updatedIssue)
}

// import { issueSchema } from '@/app/validationSchema';
// import prisma from '@/prisma/client';
// import { NextRequest, NextResponse } from 'next/server';

// interface Context {
//   params: { id: string };
// }

// export async function PATCH(request: NextRequest, context: Context): Promise<NextResponse> {
//   const { params } = context;
//   const issueId = Number(params.id);

//   if (isNaN(issueId)) {
//     return NextResponse.json({ error: 'Invalid issue ID' }, { status: 400 });
//   }

//   const body = await request.json();
//   const validation = issueSchema.safeParse(body);
//   if (!validation.success) {
//     return NextResponse.json(validation.error.format(), { status: 400 });
//   }

//   const issue = await prisma.issue.findUnique({
//     where: { id: issueId }
//   });

//   if (!issue) {
//     return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
//   }

//   const updatedIssue = await prisma.issue.update({
//     where: { id: issue.id },
//     data: { title: body.title, description: body.description }
//   });

//   return NextResponse.json(updatedIssue);
// }
