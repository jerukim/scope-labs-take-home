import { API_BASE_URL, TAG } from './constants'
import type { Comments, Video, Videos } from './types'

export async function getVideos(userId: string) {
  const searchParams = new URLSearchParams()
  searchParams.set('user_id', userId)

  const res = await fetch(`${API_BASE_URL}/videos?${searchParams}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    next: { tags: [TAG.videos] },
  })

  if (!res.ok)
    throw new Error(
      `Something went wrong while fetching videos: ${res.statusText}`
    )

  const data: { videos: Videos } = await res.json()

  return data.videos
}

export async function getVideo(videoId: string) {
  const searchParams = new URLSearchParams()
  searchParams.set('video_id', videoId)

  const res = await fetch(
    `${API_BASE_URL}/videos/single?${searchParams}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }
  )

  if (!res.ok)
    throw new Error(
      `Something went wrong while fetching video: ${res.statusText}`
    )

  const data: { video: Video } = await res.json()

  return data.video
}

export async function postVideo(body: {
  user_id: string
  description: string
  video_url: string
  title: string
}) {
  const res = await fetch(`${API_BASE_URL}/videos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data: { success: string } = await res.json()

  if (!res.ok)
    throw new Error(
      `Something went wrong while posting video: ${res.statusText}`
    )

  return data.success
}

export async function getComments(videoId: string) {
  const searchParams = new URLSearchParams()
  searchParams.set('video_id', videoId)

  const res = await fetch(
    `${API_BASE_URL}/videos/comments?${searchParams}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      next: { tags: [TAG.comments] },
    }
  )

  if (!res.ok)
    throw new Error(
      `Something went wrong while fetching comments: ${res.statusText}`
    )

  const data: { comments: Comments } = await res.json()

  return data.comments
}

export async function postComment(body: {
  video_id: string
  content: string
  user_id: string
}) {
  const res = await fetch(`${API_BASE_URL}/videos/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data: { comments: Comments } = await res.json()

  if (!res.ok)
    throw new Error(
      `Something went wrong while posting comment: ${res.statusText}`
    )

  return data.comments
}
