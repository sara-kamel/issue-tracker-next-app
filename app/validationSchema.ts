import { optional, z } from 'zod'

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

export const PatchIssueSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(3, 'Title is too short')
    .max(255, 'too long')
    .optional(),
  description: z
    .string()
    .min(3, 'Description is too short')
    .max(65535)
    .nonempty('Title is required')
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required.')
    .max(255)
    .optional()
    .nullable()
})
