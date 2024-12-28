'use client'
import React, { useState } from 'react'
import { TextField, Button, Callout, Text, Spinner } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { Controller, useForm } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { createIssueSchema } from '@/app/validationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssue = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setisSubmitting] = useState(false)

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className='space-y-3'
        onSubmit={handleSubmit(async data => {
          try {
            setisSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issue')
          } catch (error) {
            setisSubmitting(false)
            setError('An unexpected error occurred')
          }
        })}
      >
        <TextField.Root
          placeholder='Title'
          {...register('title')}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description ...' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit <Spinner loading={isSubmitting} />
        </Button>
      </form>
    </div>
  )
}

export default NewIssue
