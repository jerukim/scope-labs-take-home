import { getVideos } from '@/lib/api'

import { VideoArticle } from './VideoArticle'
import Link from 'next/link'

export async function VideoFeed() {
  const videos = await getVideos('john_smith')

  return (
    <>
      {videos.map((video, i) => (
        <Link href={`/video/${video.id}`}>
          <VideoArticle video={video} priority={i < 10} />
        </Link>
      ))}
    </>
  )
}
