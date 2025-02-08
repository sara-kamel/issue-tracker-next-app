'use client'
import React, { useState } from 'react'
import { TextField, Button, Callout, Spinner } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { issueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ErrorMessage } from '@/app/components/'
import dynamic from 'next/dynamic'
import { Issue } from '@prisma/client'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setisSubmitting] = useState(false)

  const onSubmit = handleSubmit(async data => {
    try {
      setisSubmitting(true)
      if (issue) await axios.patch(`/api/issue/${issue.id}`, data)
      else await axios.post('/api/issue', data)
      router.push('/issue')
    } catch (error) {
      setisSubmitting(false)
      setError('An unexpected error occurred')
    }
  })

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description ...' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : ' Submit'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
