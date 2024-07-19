import Image from 'next/image'
import type { Video } from '@/lib/types'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function VideoArticle({
  video,
  priority,
}: {
  video: Video
  priority: boolean
}) {
  const searchParams = new URLSearchParams(
    video.video_url.split('?').pop()
  )
  const ytVideoId = searchParams.get('v')

  return (
    <article key={video.id} className="flex flex-col gap-1">
      <Image
        className="aspect-video"
        src={`https://i.ytimg.com/vi_webp/${ytVideoId}/sddefault.webp`}
        alt={video.title}
        width={640}
        height={480}
        style={{ objectFit: 'cover' }}
        priority={priority}
      />

      <div className="ml-3">
        <h3 className="font-medium">{video.title}</h3>

        <div className="flex gap-x-1 text-sm text-gray-500">
          <span>{video.user_id}</span>
          <span>•</span>
          <span>{video.num_comments} comments</span>
          <span>•</span>
          <span>
            {dateFormatter.format(new Date(video.created_at))}
          </span>
        </div>
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
