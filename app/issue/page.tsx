import React from 'react'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <Button>
        <Link href='/issue/new'>Add New Issue</Link>
      </Button>
    </div>
  )
}

export default page
