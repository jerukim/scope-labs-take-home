export type FormState = {
  status: 'unset' | 'success' | 'error'
  message: string
  fieldErrors: Record<string, string[] | undefined>
  timestamp: number
}

export type Video = {
  created_at: string
  video_url: string
  user_id: string
  description: string
  title: string
  num_comments: number
  id: string
}

export type Videos = Video[]

export type Comment = {
  created_at: string
  content: string
  user_id: string
  video_id: string
  id: string
}

export type Comments = Comment[]
