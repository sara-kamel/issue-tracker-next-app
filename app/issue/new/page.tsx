import React from 'react'
import { TextField, TextArea, Button } from '@radix-ui/themes'

const NewIssue = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Search the docs…'></TextField.Root>
      <TextArea placeholder='Reply to comment…' />
      <Button>Submit</Button>
    </div>
  )
}

export default NewIssue
