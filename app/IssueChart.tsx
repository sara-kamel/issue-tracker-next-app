'use client'

import { Card } from '@radix-ui/themes'
import { Value } from '@radix-ui/themes/dist/esm/components/data-list.js'
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'
interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed }
  ]
  return (
    <Card>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='label' />
          <YAxis />
          <Bar
            dataKey='value'
            barSize={55}
            style={{ fill: 'var(--accent-11)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default IssueChart
