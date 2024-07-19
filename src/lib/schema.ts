import * as z from 'zod'

export const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, 'Comment must be at least 1 character')
    .max(500, 'Comment must be less than 500 characters'),
})

export const VideoSchema = z.object({
  user_id: z.string(),
  title: z.string(),
  video_url: z.string(),
  description: z.string(),
})
