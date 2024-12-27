'use client'
import React from 'react'
import { TextField, Button } from '@radix-ui/themes'
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

  return (
    <form
      className='max-w-xl space-y-3'
      onSubmit={handleSubmit(async data => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issue')
        } catch (error) {}
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
  )
}

export default NewIssue
