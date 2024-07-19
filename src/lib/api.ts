import type { Videos } from './types'

const API_BASE_URL =
  'https://take-home-assessment-423502.uc.r.appspot.com/api'

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
