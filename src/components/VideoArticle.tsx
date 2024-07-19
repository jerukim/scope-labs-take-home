import Image from 'next/image'
import { Byline } from './Byline'
import { dateFormatter, parseYoutubeId } from '@/lib/utils'
import type { Video } from '@/lib/types'

export function VideoArticle({
  video,
  priority,
}: {
  video: Video
  priority: boolean
}) {
  return (
    <article key={video.id} className="flex flex-col gap-1">
      <Image
        className="aspect-video"
        src={`https://i.ytimg.com/vi_webp/${parseYoutubeId(
          video.video_url
        )}/sddefault.webp`}
        alt={video.title}
        width={640}
        height={480}
        style={{ objectFit: 'cover' }}
        priority={priority}
      />

      <div className="ml-3">
        <h3 className="font-medium">{video.title}</h3>

        <Byline
          items={[
            `@${video.user_id}`,
            `${video.num_comments} comments`,
            dateFormatter.format(new Date(video.created_at)),
          ]}
        />
      </div>
    </article>
  )
}

export function VideoArticleSkeleton() {
  return (
    <article className="flex flex-col gap-1">
      <div className="aspect-video w-full h-auto bg-gray-200 animate-pulse" />

      <div className="ml-3">
        <h3 className="w-3/4 h-6 bg-gray-200 animate-pulse mb-1" />

        <div className="w-1/2 h-5 bg-gray-200 animate-pulse"></div>
      </div>
    </article>
  )
}
