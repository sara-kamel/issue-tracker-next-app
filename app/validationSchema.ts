import { z } from 'zod'

export const issueSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title is too short')
    .max(255, 'too long'),
  description: z
    .string()
    .min(3, 'Description is too short')
    .nonempty('Title is required')
})
