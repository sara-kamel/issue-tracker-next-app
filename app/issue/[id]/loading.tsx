import { Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailsPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Flex gap='2' m='2'>
        <Skeleton width='5rem' />
        <Skeleton width='8rem' />
      </Flex>
      <Card className='prose' mt='4'>
        <Skeleton count={3} height='20erm' />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailsPage
