import { getVideos } from '@/lib/api'

import { VideoArticle } from './VideoArticle'
import Link from 'next/link'
import { USER_ID } from '@/lib/constants'

export async function VideoFeed() {
  const videos = await getVideos(USER_ID)

  return (
    <>
      {videos.map((video, i) => (
        <Link key={video.id} href={`/video/${video.id}`}>
          <VideoArticle video={video} priority={i < 10} />
        </Link>
      ))}
    </>
  )
}
