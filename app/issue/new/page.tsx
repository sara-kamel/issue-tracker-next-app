'use client'
import dynamic from 'next/dynamic'
import IssueFormSkeleten from './loading'

const IssueForm = dynamic(() => import('@/app/issue/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleten />
})
const NewIssue = () => {
  return <IssueForm />
}

export default NewIssue
