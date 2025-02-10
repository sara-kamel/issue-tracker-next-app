'use client'
import dynamic from 'next/dynamic'
import IssueFormSkeleten from './IssueFormSkeleten'

const IssueForm = dynamic(() => import('./IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleten />
})

export default IssueForm
