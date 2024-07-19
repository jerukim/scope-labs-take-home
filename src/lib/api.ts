import type { Video, Videos } from './types'

const API_BASE_URL =
  'https://take-home-assessment-423502.uc.r.appspot.com/api'

export const TAG = {
  video: 'video',
}

export async function getVideos(userId: string) {
  const searchParams = new URLSearchParams()
  searchParams.set('user_id', userId)

  const res = await fetch(`${API_BASE_URL}/videos?${searchParams}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
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
      next: { tags: [TAG.video] },
    }
  )

  if (!res.ok)
    throw new Error(
      `Something went wrong while fetching video: ${res.statusText}`
    )

  const data: { video: Video } = await res.json()

  return data.video
}
