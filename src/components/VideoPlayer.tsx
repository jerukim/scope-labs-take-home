import { getVideo } from '@/lib/api'
import { dateFormatter, parseYoutubeId } from '@/lib/utils'
import { Byline } from './Byline'

export async function VideoPlayer({ videoId }: { videoId: string }) {
  const video = await getVideo(videoId)

  return (
    <section className="flex flex-col gap-y-4">
      <video
        className="w-full h-auto aspect-video"
        src={video.video_url}
        controls
      />

      <div className="ml-3">
        <h2 className="font-medium text-lg">{video.title}</h2>

        <Byline
          items={[
            '@' + video.user_id,
            dateFormatter.format(new Date(video.created_at)),
          ]}
        />
      </div>
    </section>
  )
}

export function VideoPlayerSkeleton() {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="aspect-video w-full bg-black animate-pulse" />

      <div className="ml-3">
        <div className="w-3/4 h-6 bg-gray-200 animate-pulse mb-1" />
        <div className="w-1/4 h-4 bg-gray-200 animate-pulse" />
      </div>
    </section>
  )
}
