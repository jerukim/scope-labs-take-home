export function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function parseYoutubeId(youtubeUrl: string) {
  const searchParams = new URLSearchParams(
    youtubeUrl.split('?').pop()
  )
  return searchParams.get('v') ?? searchParams.get('si')
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
