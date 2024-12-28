'use client'
import React, { useState } from 'react'
import { TextField, Button, Callout } from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import { Controller, useForm } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface IssueForm {
  title: String
  description: string
}

const NewIssue = () => {
  const { register, handleSubmit, control } = useForm<IssueForm>()
  const router = useRouter()
  const [error, setError] = useState('')

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
            await axios.post('/api/issues', data)
            router.push('/issue')
          } catch (error) {
            setError('An unexpected error occurred')
          }
        })}
      >
        <TextField.Root
          placeholder='Title'
          {...register('title')}
        ></TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description ...' {...field} />
          )}
        />

        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default NewIssue
