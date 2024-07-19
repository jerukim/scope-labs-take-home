import { getVideos } from '@/lib/api'

import { VideoArticle } from './VideoArticle'

export async function VideoFeed() {
  const videos = await getVideos('john_smith')

  return (
    <>
      {videos.map((video, i) => (
        <VideoArticle video={video} priority={i < 10} />
      ))}
    </>
  )
}
